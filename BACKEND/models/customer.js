const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  phone: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
});

const Customer =
  mongoose.models.Customer || mongoose.model("Customer", customerSchema);

module.exports = Customer;
