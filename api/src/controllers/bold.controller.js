const { Transaction, Rent } = require('../../db');
const {
  resSender,
  rejectSender,
  HttpStatusCodes,
} = require("../helpers/resSender.helper");
const axios = require('axios');

/* 
{
  "amount_type": "CLOSE",
  "amount": {
    "currency": "COP",
    "total_amount": 10000,
    "tip_amount": 0
  },
} 
*/

module.exports = {

  createBoldLink: async (req, res, next) => {
    const { rentId } = req.body;

    try {
      const rent = await Rent.findByPk(rentId);
      if(!rent) rejectSender("no se encontró la renta", HttpStatusCodes.noEncontrado);

      const data = {
        amount_type: "CLOSE",
        amount: {
          currency: "COP",
          total_amount: rent.priceAtRent,
          tip_amount: 0
        }
      }

      const boldData = await axios.post("https://integrations.api.bold.co/online/link/v1", data, {
        headers: {
          Authorization: "x-api-key kbPVgEUxf4Z1hkXv_h816p0XNMFTY4uq_qmd1aVqW08"
        }
      });
      
      resSender(null, HttpStatusCodes.aceptado, boldData.data.payload.url);
    } catch (error) {
      next(error);
    }
  }
}