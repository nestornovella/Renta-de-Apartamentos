const {Router} = require('express')
const { createOrder, captureOrder } = require('../controllers/paypal.controllers')
const router = Router()


router.get('/create-order/:rentId', createOrder)
router.get('/capture-order/:rentId', captureOrder)
router.get('/cancel-order',(req, res)=> res.send('orden cancelada'))


module.exports = router