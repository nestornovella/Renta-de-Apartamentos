const { User, Rent, Apartment } = require("../../db");
const { sendMail } = require("./mailer");
const { Op } = require('sequelize');

function generateStars() {
  const star = '<span>&#9733</span>'
  let stars = []
  for (let i = 0; i <= 5; i++) {
    let textStar = ''
    for (let x = 0; x < i; x++) {
      textStar += star
    }
    stars.push(textStar)
  }
  return stars
}

const linkRating = (rent) => {


  return `
<div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: start;">
  <div style="display: flex; align-items: center;">
    <h1>1</h1>
    <a href="https://www.medellinfurnishedapartment.com/#/raiting/${rent.apartmentId}/1" 
       style="text-decoration: none; color: #FFD700; font-size: 24px; margin-left: 10px;">&#9733;</a>
  </div>
  <div style="display: flex; align-items: center;">
    <h1>2</h1>
    <a href="https://www.medellinfurnishedapartment.com/#/raiting/${rent.apartmentId}/2" 
       style="text-decoration: none; color: #FFD700; font-size: 24px; margin-left: 10px;">&#9733; &#9733;</a>
  </div>
  <div style="display: flex; align-items: center;">
    <h1>3</h1>
    <a href="https://www.medellinfurnishedapartment.com/#/raiting/${rent.apartmentId}/3" 
       style="text-decoration: none; color: #FFD700; font-size: 24px; margin-left: 10px;">&#9733; &#9733; &#9733;</a>
  </div>
  <div style="display: flex; align-items: center;">
    <h1>4</h1>
    <a href="https://www.medellinfurnishedapartment.com/#/raiting/${rent.apartmentId}/4" 
       style="text-decoration: none; color: #FFD700; font-size: 24px; margin-left: 10px;">&#9733; &#9733; &#9733; &#9733;</a>
  </div>
  <div style="display: flex; align-items: center;">
    <h1>5</h1>
    <a href="https://www.medellinfurnishedapartment.com/#/raiting/${rent.apartmentId}/5" 
       style="text-decoration: none; color: #FFD700; font-size: 24px; margin-left: 10px;">&#9733; &#9733; &#9733; &#9733; &#9733;</a>
  </div>
</div>
`
}

module.exports = {
  sendReminderEmails: async () => {
    try {
      const currentDate = new Date();
      const oneDayBefore = new Date();
      oneDayBefore.setDate(currentDate.getDate() + 1);

      const upcomingRents = await Rent.findAll({
        where: {
          endDate: {
            [Op.lte]: oneDayBefore, // asegura que el email se envie faltando un dia o menos
          },
          status: "active",
        },
        include: [{ model: User }, { model: Apartment }],
      });
      const mailPromises = upcomingRents.map((rent) => {
        const user = rent.User;
        const subject = "Recordatorio: Calificación de tu apartamento rentado";
        const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0;">
          <div style="text-align: center; padding-bottom: 20px;">
            <img src="https://res.cloudinary.com/dlwjdmlpx/image/upload/q_100/v1693939333/PROYECTO%20PROPIEDADES/logo_rent_yurhr6.png" alt="Logo" style="max-width: 200px;">
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <h2 style="color: #333;">Hola <strong>${user.name}</strong>,</h2>
            <p>Queremos recordarte que tu renta finalizará en menos de 24 horas.</p>
            <p>Por favor, toma un momento para calificar el apartamento que rentaste. Tu opinión es muy importante para nosotros y para futuros inquilinos.</p>
              ${linkRating(rent)}
          </div>
          <div style="padding-top: 20px; text-align: center; color: #888;">
            <p>Gracias por elegir Medellin Furnished Apartments.</p>
            <p><small>&copy; 2024 Medellin Furnished Apartments. Todos los derechos reservados.</small></p>
          </div>
        </div>`;

        return sendMail(user.email, subject, html);
      });

      Promise.all(mailPromises).then(() => {
        console.log(
          "Correos electrónicos de recordatorio enviados a los usuarios con rentas próximas a finalizar."
        );
      })

    } catch (error) {
      console.error(
        "Error al enviar los correos electrónicos de recordatorio:",
        error
      );
    }
  },
};
