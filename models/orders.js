const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order };
