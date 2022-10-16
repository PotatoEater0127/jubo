const { Patient } = require("../models/patient");

const getPatients = () => Patient.find();

module.exports = { getPatients };
