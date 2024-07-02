const { Rent, Apartment, User } = require("../../db");
const { resSender, HttpStatusCodes, rejectSender } = require('../helpers/resSender.helper');
const { Op } = require('sequelize');
const { sendMailRentApproval } = require("../sendEmails/sendMailRentApproval ");
const {sendMailAdminNotification} = require("../sendEmails/sendMailAdminNotification");
const { response } = require("express");

module.exports = {
  getAllRents: async (req, res, next) => {
    try {
      const rents = await Rent.findAll({include:[
        {model:User},
        {model:Apartment}
      ]});

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
    const { apartmentId, userId, startDate, endDate, status } = req.body // id apart, user id , start D, end D ? precio {consulta} 
    try {
      //validations parametros
      if(!userId || !apartmentId || !startDate || !endDate){
        rejectSender(`faltan parametros recuerda que los parametros requeridos son -> apartmentId:${apartmentId}, userId:${userId}, startDate:${startDate}, endDate:${endDate}`, HttpStatusCodes.badRequest)
      }
      //requerir entidades
      const user = await User.findByPk(userId)
      const apartment = await Apartment.findByPk(apartmentId)

      if(!user || !apartment){
        rejectSender(`no se encontraron las entidades user: ${user} apartment: ${apartment}` , HttpStatusCodes.badRequest)
      }

      //validando disponibilidad del apartamento
      if(!apartment.availability){
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
        status: status ? status : 'pending' 
      }); 

      await user.addRent(rent);
      await apartment.addRent(rent);

      //validar Renta 
      if(!rent){
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
        if (!apartment.availability) {
          return rejectSender('El apartamento no está disponible', HttpStatusCodes.noAutorizado);
        }

        apartment.availability = false;
        await apartment.save();
        await sendMailRentApproval(rent); // Enviar correo al usuario confirmando que su solicitud de alquiler fue aprobada
      } else if (status === 'cancelled' && rent.status === 'active') {
        apartment.availability = true;
        await apartment.save();
      }

      const updatedRent = await rent.update({ startDate, endDate, status });

      resSender(null, HttpStatusCodes.actualizado, updatedRent);
    } catch (error) {
      next(error);
    }
  },

  deleteRent: async (req, res, next) => {
    const { id } = req.params;
    try {
      const rent = await Rent.findByPk(id);
      await rent.destroy();
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
            [Op.in]: ["active", "expired"]
          }
        },
        include: {
          model: Apartment,
        },
      });

      let monthsAmounts = {'January':0,   // Enero
        'February':0,  // Febrero
        'March':0,     // Marzo
        'April':0,     // Abril
        'May':0,       // Mayo
        'June':0,      // Junio
        'July':0,      // Julio
        'August':0,    // Agosto
        'September':0, // Septiembre
        'October':0,   // Octubre
        'November':0,  // Noviembre
        'December':0 }  // Diciembre
    ;
    const months = Object.keys(monthsAmounts)

    rents.forEach(re => monthsAmounts[months[re.startDate.getMonth()]] = monthsAmounts[months[re.startDate.getMonth()]] += re.priceAtRent)
    
    let response = months.map( month => { return {[month]: monthsAmounts[month]}})
    resSender(null, HttpStatusCodes.aceptado, {months:Object.keys(monthsAmounts), amounts: Object.values(monthsAmounts)});
    } catch (error) {
      next(error);
    }
  },
};
