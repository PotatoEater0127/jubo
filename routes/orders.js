var express = require("express");
var router = express.Router();
const { createOrder, updateOrder } = require("../controllers/orderController");

/* POST create an order. */
router.post("/", async function (req, res) {
  const { patientId, message } = req.body;
  const newOrder = await createOrder({ patientId, message });
  res.json(newOrder?.id);
});

/* PATCH update an order. */
router.patch("/:orderId", async function (req, res) {
  const { message } = req.body;
  const { orderId } = req.params;
  const updatedOrder = await updateOrder({ message, orderId });
  res.json(updatedOrder?.id);
});

module.exports = router;
