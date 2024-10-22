const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { connection } = require("./db");
const router = require("./src/routes/index.routes.js");
const { resSender } = require('./src/helpers/resSender.helper.js');
const { captureRes } = require("./src/helpers/midlewareRes.helper.js");
const { startCron } = require("./src/helpers/cronSchudelizer.helper.js");
const { hourLimit100 } = require('./src/middleware/rateLimited.js');
const cluster = require("cluster");
const os = require("os");
const { sendReminderEmails } = require("./src/sendEmails/sendEmails.js");

const port = process.env.PORT || 3000;

// Ensure proper initialization before starting server
const startServer = async () => {
  try {
    const app = express();

    await connection.sync({ alter: true });
    console.info("the postgreSQL Db is connected");

    startCron();

    const sendResponse = (req, res, next) => {
      res.resSender = resSender;
      next();
    };

    sendReminderEmails()
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(cors());
    app.set('trust proxy', true);
    app.use(captureRes);
    // Enable rate limiting middleware if needed
    // app.use(hourLimit100);

    app.use('/current-date', (req, res, next) => {
      const createdDate = new Date();
      res.json({ date: createdDate.getDate(), hour: createdDate.getHours(), minutes: createdDate.getMinutes() });
      next();
    });

    app.use("/", router);

    // Middleware de manejo de errores (ensure it's always the last app.use())
    app.use((err, req, res, next) => {
      const status = err.status || 500;
      const message = err.message || err;
      res.status(status).json({ status, message });
    });

    return app; // Return the app instance for listening in cluster mode
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); // Exit with an error code if initialization fails
  }
};


  startServer()
    .then(app => app.listen(port, console.info(`Server is listening on port ${port}`)))
    .catch(error => console.error("Error starting server:", error));
