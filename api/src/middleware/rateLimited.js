const rateLimiter = require('express-rate-limit')

const hourLimit100 = rateLimiter(
    {
        windowMs: 60 * 60 * 1000, // 1 hora
        max: 150, 
        message: 'Haz excedido el límite de solicitudes permitidas. Por favor, intenta más tarde.'
        
    }
)


module.exports = {
    hourLimit100
}