const { Rent, Apartment, User } = require("../../db");
const { resSender, HttpStatusCodes, rejectSender } = require('../helpers/resSender.helper');
const { Op } = require('sequelize');
const { sendMailRentApproval } = require("../sendEmails/sendMailRentApproval ");
const {sendMailAdminNotification} = require("../sendEmails/sendMailAdminNotification");

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
    const { year, month } = req.query;

    if (!year || !month) {
      return rejectSender("Year and month are required", HttpStatusCodes.badRequest);
    }

    try {
      const startDate = new Date(year, month - 1, 0);
      const endDate = new Date(year, month, 0);

      const rents = await Rent.findAll({
        where: {
          startDate: {
            [Op.between]: [startDate, endDate],
          },
          status: {
            [Op.in]: ["active", "expired"]
          }
        },
        include: {
          model: Apartment,
        },
      });

      let totalApartmentPrice = 0;
      let totalServices = 0;    

      for (const rent of rents) {
        const apartment = rent.Apartment;
        totalApartmentPrice += rent.priceAtRent;
        totalServices += apartment.services;
      }
      
      let totalEarnings = totalApartmentPrice * 0.1;
      totalEarnings += totalServices; // agregar el precio del servicio al total de las ganancias
      resSender(null, HttpStatusCodes.aceptado, { totalEarnings });
    } catch (error) {
      next(error);
    }
  },
};
