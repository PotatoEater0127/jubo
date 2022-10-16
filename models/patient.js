const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const PatientSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Patient = model("Patient", PatientSchema);

module.exports = { Patient };
