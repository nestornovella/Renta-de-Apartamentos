const { Axios } = require('axios');
const { Transaction, Rent, Apartment } = require('../../db');
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
      if (!rent) rejectSender("no se encontró la renta", HttpStatusCodes.noEncontrado);

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

      rent.boldLink = boldData.data.payload.payment_link
      rent.status = 'pendingBold'
      rent.save()

      resSender(null, HttpStatusCodes.aceptado, boldData.data.payload.url);
    } catch (error) {
      next(error);
    }
  },
  checkPayment: async (req, res, next) => {


    res.status(200).send('checked')
    try {
      const rents = await Rent.findAll({
        where: { //[rent, rent, rent]
          status: 'pendingBold',
        }
      })
      rentLinks = rents.map(rent => axios.get(`https://integrations.api.bold.co/online/link/v1/${rent.boldLink}`, { //[promise, promise, promise]
        headers: {
          Authorization: "x-api-key kbPVgEUxf4Z1hkXv_h816p0XNMFTY4uq_qmd1aVqW08"
        }
      }))
      const responses = await Promise.all(rentLinks) // [{status:'PAYED'}, {status:'ACTIVE'}, {status:'REJECT'}]
      const verify = responses.map(rs => rs.data.status == 'SALE_APPROVED') //[false, true, false]
                                                                    //   0       1      2

      for(let i =0; i< verify.length; i++){

        if(verify[i]){
          const rent = rents[i]
          const apartId = rent.apartmentId
          const apart = await Apartment.findByPk(apartId)
          rent.status = 'active'
          console.log(apart)
          apart.availability = false
          apart.save()
          rent.save()
        }

      }

    } catch (error) {
      next(error)
    }


  }
}