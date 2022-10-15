const mongoose = require("mongoose");
const Order = require("./orders");

const { Schema, model } = mongoose;

const PatientSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  orders: [{ type: Schema.Types.ObjectId, ref: Order }],
});

const Patient = model("Patient", PatientSchema);

module.exports = { Patient };
