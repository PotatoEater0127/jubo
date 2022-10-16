const { Order } = require("../models/order");
const { Patient } = require("../models/patient");

const createOrder = async ({ message, patientId }) => {
  const patientMongo_id = await Patient.findOne({ id: patientId }, "_id");
  const order = new Order({ message, patient: patientMongo_id });
  return await order.save();
};

const updateOrder = ({ message, orderId }) =>
  Order.findOneAndUpdate({ id: orderId }, { message });

const findOrdersByPatient = async (patientId) => {
  const patientMongo_id = await Patient.findOne({ id: patientId }, "_id");
  const orders = await Order.find({ patient: patientMongo_id });
  return orders;
};

module.exports = { createOrder, updateOrder, findOrdersByPatient };
