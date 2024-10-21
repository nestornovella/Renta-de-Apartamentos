const { Router } = require("express");
const {
  getAllRents,
  createRent,
  updateRent,
  deleteRent,
  getRentById,
  getMonthlyEarnings,
  deleteEarningsByMonth
} = require("../controllers/rent.controller");
const { createBoldLink } = require("../controllers/bold.controller");

const router = Router(); 

router.get("/", getAllRents);
router.get("/earnings", getMonthlyEarnings);
router.get("/:id", getRentById);
router.post("/", createRent);
router.post("/boldLink", createBoldLink);
router.put("/:id", updateRent);
router.delete("/:id", deleteRent);
router.delete("/earnings/month", deleteEarningsByMonth);

module.exports = router;
