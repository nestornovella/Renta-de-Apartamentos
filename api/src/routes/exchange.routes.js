const {Router} = require('express')
const { getExchange, createExchange } = require('../controllers/exchange.controller')
const router = Router()


router.get('/', getExchange)
router.post('/', createExchange)

module.exports = router