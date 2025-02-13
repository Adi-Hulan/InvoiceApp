const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  items: [
    {
      product: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
