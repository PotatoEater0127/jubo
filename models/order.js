const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const { Patient } = require("./patient");

const OrderSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Patient,
    required: true,
  },
});

// sequential id
OrderSchema.plugin(autoIncrement, { inc_field: "id" });

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order };
