const { Rent, Apartment, User } = require("../../db");
const { resSender, HttpStatusCodes, rejectSender } = require('../helpers/resSender.helper');
const { Op } = require('sequelize');
const { sendMailRentApproval } = require("../sendEmails/sendMailRentApproval ");
const { sendMailAdminNotification } = require("../sendEmails/sendMailAdminNotification");

module.exports = {
  getAllRents: async (req, res, next) => {
    const { status } = req.query
    try {
      let rents = null
      if (!status) {
        rents = await Rent.findAll({
          include: [
            { model: User },
            { model: Apartment }
          ]
        })
      } else {
        rents = await Rent.findAll({
          where: { status: status }, include: [
            { model: User },
            { model: Apartment }
          ]
        })
      }

      resSender(null, HttpStatusCodes.aceptado, rents);
    } catch (error) {
      next(error);
    }
  },

  getRentById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const rent = await Rent.findByPk(id);
      if (!rent) {
        rejectSender("Rent not found", HttpStatusCodes.noEncontrado);
      }
      resSender(null, HttpStatusCodes.aceptado, rent);
    } catch (error) {
      next(error);
    }
  },

  createRent: async (req, res, next) => {
    const { apartmentId, userId, startDate, endDate, status, services } = req.body
    // id apart, user id , start D, end D ? precio {consulta} 
    try {
      //validations parametros
      if (!userId || !apartmentId || !startDate || !endDate) {
        rejectSender(`faltan parametros recuerda que los parametros requeridos son -> apartmentId:${apartmentId}, userId:${userId}, startDate:${startDate}, endDate:${endDate}`, HttpStatusCodes.badRequest)
      }
      //requerir entidades
      const user = await User.findByPk(userId)
      const apartment = await Apartment.findByPk(apartmentId)

      if (!user || !apartment) {
        rejectSender(`no se encontraron las entidades user: ${user} apartment: ${apartment}`, HttpStatusCodes.badRequest)
      }

      //validando disponibilidad del apartamento
      if (!apartment.availability) {
        rejectSender('el apartamento que se intenta rentar no se encuentra disponible.', HttpStatusCodes.noAutorizado)
      }
      //validar que la fecha inicial sea mayor a la final
      if (endDate && startDate && endDate < startDate) {
        rejectSender("la fecha final no puede ser menor a la de inicio", HttpStatusCodes.conflictivo);
      }

      //creacion de renta
      const rent = await Rent.create({
        ...req.body,
        priceAtRent: apartment.price, // Guardar el precio del apartamento al momento de crear la renta
        status: status ? status : 'pending',
        
      });

      await user.addRent(rent);
      await apartment.addRent(rent);

      //validar Renta 
      if (!rent) {
        rejectSender('no se pudo crear la renta.', HttpStatusCodes.conflictivo)
      }

      // Enviar correo al administrador
      await sendMailAdminNotification(rent, user, apartment);
      resSender(null, HttpStatusCodes.creado, rent)
    } catch (error) {
      next(error)
    }
  },

  updateRent: async (req, res, next) => {
    const { id } = req.params;
    const { startDate, endDate, status } = req.body;

    try {

      const rent = await Rent.findByPk(id);
      if (!rent) {
        return rejectSender("Rent not found", HttpStatusCodes.noEncontrado);
      }

      if (endDate && startDate && endDate < startDate) {
        return rejectSender("La fecha final no puede ser menor a la de inicio", HttpStatusCodes.conflictivo);
      }

      const user = await User.findByPk(rent.userId);
      const apartment = await Apartment.findByPk(rent.apartmentId);

      if (!user || !apartment) {
        return rejectSender("User or Apartment not found", HttpStatusCodes.noEncontrado);
      }

      if (status === 'active' && rent.status !== 'active') {


        apartment.availability = false;
        await apartment.save();
        await sendMailRentApproval(rent); // Enviar correo al usuario confirmando que su solicitud de alquiler fue aprobada
      } else if (status === 'cancelled' && rent.status === 'active') {
        apartment.availability = true;
        await apartment.save();
      }
      const updatedRent = await rent.update({ startDate, endDate, status: status });

      resSender(null, HttpStatusCodes.actualizado, updatedRent);
    } catch (error) {
      next(error);
    }
  },

  deleteRent: async (req, res, next) => {
    const { destroy } = req.query
    const { id } = req.params;
    try {
      const rent = await Rent.findByPk(id);
      if (destroy == 'true') {
        await Rent.destroy({truncate:true});
      } else {
        await rent.destroy();
      }
      resSender("rent deleted", HttpStatusCodes.eliminado, null);
    } catch (error) {
      next(error);
    }
  },

  getMonthlyEarnings: async (req, res, next) => {
    const { year } = req.query;

    if (!year) {
      return rejectSender("Year are required", HttpStatusCodes.badRequest);
    }

    try {
      const startYear = new Date()
      startYear.setFullYear(year)
      startYear.setMonth(0)
      startYear.setDate(1)

      const endYear = new Date()
      endYear.setMonth(11)
      endYear.setDate(31)
      endYear.setFullYear(year)

      const rents = await Rent.findAll({
        where: {
          startDate: {
            [Op.between]: [startYear, endYear],
          },
          status: {
            [Op.in]: ["active", "expired", "cancelled", "pendingPayPal"]
          }
        },
        include: {
          model: Apartment,
        },
      });

      let monthsAmounts = {
        'January': { amount: 0, service: 0 },   // Enero
        'February': { amount: 0, service: 0 },  // Febrero
        'March': { amount: 0, service: 0 },     // Marzo
        'April': { amount: 0, service: 0 },     // Abril
        'May': { amount: 0, service: 0 },       // Mayo
        'June': { amount: 0, service: 0 },      // Junio
        'July': { amount: 0, service: 0 },      // Julio
        'August': { amount: 0, service: 0 },    // Agosto
        'September': { amount: 0, service: 0 }, // Septiembre
        'October': { amount: 0, service: 0 },   // Octubre
        'November': { amount: 0, service: 0 },  // Noviembre
        'December': { amount: 0, service: 0 }   // Diciembre
      }  
        ;
      const months = Object.keys(monthsAmounts)

      rents.forEach(re => monthsAmounts[months[re.startDate.getMonth()]].amount = monthsAmounts[months[re.startDate.getMonth()]].amount += (re.priceAtRent))
      rents.forEach(re => monthsAmounts[months[re.startDate.getMonth()]].service = monthsAmounts[months[re.startDate.getMonth()]].service += (re.services.transport))
      let response = months.map(month => { return { [month]: monthsAmounts[month] } })
      resSender(null, HttpStatusCodes.aceptado, { months: Object.keys(monthsAmounts), amounts: Object.values(monthsAmounts) });
    } catch (error) {
      next(error);
    }
  },

  deleteEarningsByMonth: async (req, res, next) => {
    const { year, month } = req.query;

    try {
      if (!year || !month) {
        return rejectSender("Year and month are required", HttpStatusCodes.badRequest);
      }

      // Validar que el mes esté entre 1 y 12
      if (month < 1 || month > 12) {
        return rejectSender("Month must be between 1 and 12", HttpStatusCodes.badRequest);
      }

      const startMonth = new Date(year, month - 1, 1);
      const endMonth = new Date(year, month, 0);

      const result = await Rent.destroy({
        where: {
          startDate: {
            [Op.between]: [startMonth, endMonth],
          },
          status: {
            [Op.in]: ["active", "expired", "cancelled", "pendingPayPal"],
          },
        },
      });

      if (result === 0) {
        return rejectSender("No earnings found for the specified month", HttpStatusCodes.noEncontrado);
      }

      resSender(`Earnings for year ${year} and month ${month} deleted successfully`, HttpStatusCodes.eliminado, null);
    } catch (error) {
      next(error);
    }
  },
};
