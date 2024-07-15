
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

const port = process.env.PORT || 3000;



const startServer = () => {
  const app = express();
 

  startCron();

  const sendResponse = (req, res, next) => {
    res.resSender = resSender;
    next();
  };

  app.use(morgan("dev"));
  app.use(express.json());
  app.use(cors());
  app.set('trust proxy', true);
  app.use(captureRes);
  // app.use(hourLimit100);

  

  app.use('/current-date', (req, res, next) => {
    const createdDate = new Date();
    res.json({ date: createdDate.getDate(), hour: createdDate.getHours(), minutes: createdDate.getMinutes() });
    next();
  });

  app.use("/", router);

  // Middleware de manejo de errores
  app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    res.status(status).json({ status, message });
    next();
  });

  connection
    .sync({ alter: false })
    .then(() => console.info("the postgreSQL Db is connected"))
    .then(() => app.listen(port, console.info(`Server is listening on port ${port}`)))
    .catch((error) => {
      console.error("Error starting the server:", error);
    });

  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
  });
};

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); 
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Worker ${worker.process.pid} died. Forking a new worker.`);
    cluster.fork();
  });
} else {
  startServer();
}