const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { connection } = require("./db");
const router = require("./src/routes/index");
const cron = require("node-cron");
const {checkExpiredRents} = require("./src/controllers/rentExpiration");

const PORT = process.env.PORT;

console.log("Ejecutando verificación de alquileres vencidos...");
checkExpiredRents();

cron.schedule("0 0 * * *", () => {
  console.log("Verificando alquileres vencidos...");
  checkExpiredRents();
});

const server = express();
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use("/", router);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  res.status(status).json({ status: "error", message });
  next();
});

connection
  .sync({ force: false })
  .then(() => console.info(`the server is listen in port ${PORT}`))
  .catch((error) => console.error("Database connection error:", error));
  
server.listen(PORT);
