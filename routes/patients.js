const express = require("express");
const { getPatients } = require("../controllers/patientController");
const { findOrdersByPatient } = require("../controllers/orderController");
const router = express.Router();

/* GET patients listing. */
router.get("/", async function (req, res, next) {
  const patients = await getPatients();
  res.json(patients);
});

/* GET a patient's orders listing. */
router.get("/:patientId/orders", async function (req, res, next) {
  const orders = await findOrdersByPatient(req.params.patientId);
  res.json(orders);
});

module.exports = router;
