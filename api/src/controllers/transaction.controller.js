const { Transaction, Apartment, User, Rent } = require('../../db');
const { resSender, HttpStatusCodes, rejectSender } = require('../helpers/resSender.helper');

module.exports = {
  getAllTransactions: async (req, res, next) => {
    const {page} = req.query
    const limit = !page ? 10 : 10 * parseInt(page)
    try {
      const transactions = await Transaction.findAll({
        order:[['date','DESC']],
        limit: limit,
        include:[{model:Rent,include:[{model:Apartment}]}, {model:User}]
      });
      const link = transactions.length == limit ? `http://localhost:3000/transaction?page=${(parseInt(page) + 1)}`: null
      res.status(HttpStatusCodes.aceptado).json({status:HttpStatusCodes.aceptado,length:transactions.length , next:link, data: transactions})
      return 
    } catch (error) {
      next(error);
    }
  },

  getTransactionById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const transaction = await Transaction.findOne({where: {id: id},
        include: [
          {model:User}, 
          {model:Rent,
            include:[
              {model:Apartment}
            ]
          }],
      })
      if(!transaction) {
        rejectSender("transaction no encontrada", HttpStatusCodes.noEncontrado);
      }
      resSender(null, HttpStatusCodes.aceptado, transaction)
    } catch (error) {
      next(error);
    }
  },

  createTransaction: async (req, res, next) => {
    const { apartmentId, email } = req.body;
    try {
      const apartment = await Apartment.findByPk(apartmentId);
      if(!apartment) {
        rejectSender("no se encontró el apartamento", HttpStatusCodes.noEncontrado);
      }
     
      const transaction = await Transaction.create({amount: {price: apartment.price, exchange: "COP"}});
      const user = await User.findByPk(email);
      if(!user) {
        rejectSender("usuario no encontrado", HttpStatusCodes.noEncontrado);
      }
      await apartment.addTransaction(transaction);
      await user.addTransaction(transaction);
      resSender(null, HttpStatusCodes.creado, transaction);
    } catch (error) {
      next(error);
    }
  },

  updateTransaction: async (req, res, next) => {
    try {
      const transaction = await Transaction.findByPk(req.params.id);
      if(!transaction) {
        rejectSender("transaction no encontrada", HttpStatusCodes.noEncontrado);
      }
      await transaction.update(req.body.date);
      resSender(null, HttpStatusCodes.actualizado, transaction);
    } catch (error) {
      next(error);
    }
  },

  deleteTransaction: async(req, res, next) => {
    try {
      const transaction = await Transaction.findByPk(req.params.id);
      if(!transaction) {
        rejectSender("transaction no encontrada", HttpStatusCodes.badRequest);
      }
      await transaction.destroy();
      resSender("transaction deleted", HttpStatusCodes.eliminado);
    } catch (error) {
      next(error);
    }
  }
}