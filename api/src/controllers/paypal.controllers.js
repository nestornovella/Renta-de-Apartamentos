const { Rent, Sale, Transaction, Exchange, User, Apartment } = require('../../db')

const axios = require('axios');
const { resSender, rejectSender, HttpStatusCodes } = require("../helpers/resSender.helper");
const {sendMailRentApproval} = require('../sendEmails/sendMailRentApproval ');

module.exports = {
    createOrder: async (req, res, next) => {
        const { rentId, saleId } = req.params;
        try {

            let paymentInfo = null;
            if (!rentId) {
                paymentInfo = await Sale.findByPk(saleId)
            }
            paymentInfo = await Rent.findByPk(rentId)
            const exchange = await Exchange.findByPk(1)
            if (!paymentInfo) rejectSender('no se encontro la renta o venta asignada', HttpStatusCodes.noEncontrado)
            if (!exchange) rejectSender('hubo un problema con la cotizacion', HttpStatusCodes.noEncontrado)

            const amount = (((paymentInfo.priceAtRent / exchange.value) * 10) / 100).toFixed(2)
            console.log(amount)
            const order = {
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        amount: {
                            currency_code: 'USD',
                            value: amount.toString(),
                        }

                    }
                ],
                application_context: {
                    brand_name: 'Mi Tienda',
                    landing_page: 'NO_PREFERENCE',
                    user_action: 'PAY_NOW',
                    return_url: `${process.env.API_DEV_URL}paypal/capture-order/${rentId}`,
                    cancel_url: `${process.env.API_DEV_URL}paypal/cancel-order`
                }
            };

            const params = new URLSearchParams();
            params.append('grant_type', 'client_credentials');
            const { data: { access_token } } = await axios.post(`${process.env.PAYPAL_SANDBOX_URL}v1/oauth2/token`, params, {
                auth: {
                    username: process.env.PAYPAL_CLIENT_ID,
                    password: process.env.PAYPAL_SECRET_KEY
                }
            });

            const response = await axios.post(`${process.env.PAYPAL_SANDBOX_URL}v2/checkout/orders`, order, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });

            console.log(response.data);
            res.send(response.data.links.find(link => link.rel === 'approve').href);
        } catch (error) {
            next(error);
        }
    },
    captureOrder: async (req, res, next) => {
        const { rentId } = req.params;
        const { PayerID, token } = req.query

        try {
            if (!rentId) rejectSender('se requiere el id de la renta', HttpStatusCodes.noEncontrado)
            const rent = await Rent.findByPk(rentId, { include: [{ model: User }, { model: Apartment }] })
        if(!rent.Apartment.availability) rejectSender('el apartamento no esta habilitado, comunicate con el administrador', HttpStatusCodes.conflictivo)
            if (!rent) rejectSender('no se encontro la renta', HttpStatusCodes.noEncontrado)
            const user = await User.findByPk(rent.User.email)
            const exchange = await Exchange.findByPk(1)

            const transaction = await Transaction.create(
                {
                    paypalToken: token,
                    payerID: PayerID,
                    amount: {
                        COP: { currency: 'COP', amount: ((rent.priceAtRent * 10) / 100).toFixed(2) },
                        USD: { currency: 'USD', amount: (((rent.priceAtRent / exchange.value) * 10) / 100).toFixed(2) }
                    }
                }) // id,paypalToken,payerID,date,amount,status

            await rent.addTransaction(transaction)
            await user.addTransaction(transaction)

            const apartment = await Apartment.findByPk(rent.Apartment.id)
            if (apartment.availability) {
                apartment.availability = false
                apartment.save()
                await sendMailRentApproval(rent)
                res.redirect('https://medellinfurnishedapartment.com');
            } else {
                rejectSender('no se pudo realizar la transaccion (verifica si esta ocupado)', HttpStatusCodes.badRequest)
            }


        } catch (error) {
            next(error);
        }
    },
    cancelOrder: async (req, res, next) => {
        try {
            // Implementar lógica para cancelar la orden si es necesario
        } catch (error) {
            next(error);
        }
    }
};
