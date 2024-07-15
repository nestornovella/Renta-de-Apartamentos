const cron = require("node-cron");

const axios = require("axios");
const { checkExpiredRents } = require("../sendEmails/rentExpiration");
const { sendReminderEmails } = require("../sendEmails/sendEmails");
const { sendMailPending } = require("../sendEmails/sendMailPending");
const { getExchange } = require("../utilities/getChange");

module.exports = {
  startCron: () => {
    cron.schedule("0 12 * * *", () => {
      console.log("Verifying expired rentals...");
      checkExpiredRents();
    });

    cron.schedule("0 18 * * *", () => {
      console.log("Verifying expired rentals...");
      checkExpiredRents();
    });

    cron.schedule("0 07 * * *", () => {
      console.log(
        "Ejecutando tarea cron para enviar correos electrónicos a los usuarios para calificar apartamento..."
      );
      sendReminderEmails();
    });

    cron.schedule("01 18 * * *", () => {
      console.log(
        "Ejecutando tarea cron para enviar correos electrónicos a los usuarios para calificar apartamento..."
      );
      sendReminderEmails();
    });

    cron.schedule("00 08 * * *", () => {
      console.log(
        "Ejecutando tarea cron para enviar correos electrónicos de pendientes a el admin..."
      );
      sendMailPending();
    });

    cron.schedule("0 12 * * *", getExchange);
    cron.schedule("0 19 * * *", getExchange);
    cron.schedule("0 2 * * *", getExchange);
  },
};
