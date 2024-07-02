const { sendMail } = require("./mailer");

module.exports = {
  sendMailAdminNotification: async (rent, user, apartment, reserved=false) => {
    try {
      const subject = "Nueva renta pendiente";
      const text= `Se ha generado una nueva renta ${!reserved ? '(pendiente)' : '(reservada)'}. :
      Detalles de la renta:
      - Usuario: ${user.name} (${user.email})
      - Apartamento: ${apartment.urbanizacion}
      - Fecha de inicio: ${new Date(rent.startDate).toLocaleDateString()}
      - Fecha de finalización: ${new Date(rent.endDate).toLocaleDateString()}
      - Precio: ${apartment.price}`;
  
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0;">
          <h2>Detalles de la nueva renta pendiente</h2>
          <p><strong>Usuario:</strong> ${user.name} (${user.email})</p>
          <p><strong>Apartamento:</strong> ${apartment.urbanizacion}</p>
          <p><strong>Precio:</strong> ${apartment.price}</p>
          <p><strong>Fecha de inicio:</strong> ${new Date(rent.startDate).toLocaleDateString()}</p>
          <p><strong>Fecha de finalización:</strong> ${new Date(rent.endDate).toLocaleDateString()}</p>
        </div>`;
  
      // Configura la dirección de correo del administrador
      const adminEmail = "javiergarciaplata69@gmail.com";
  
      await sendMail(adminEmail, subject, text, html);
    } catch (error) {
      console.error("Error al enviar el correo al administrador:", error);
    }
  },
};
