const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Invoice = require("../models/invoice");
const Customer = require("../models/Customer");

router.route("/add").post((req, res) => {
  const invoiceNumber = req.body.invoiceNumber;
  const customerId = req.body.customerId;
  const items = req.body.items;
  const totalAmount = req.body.totalAmount;
  const date = req.body.date;

  const newInvoice = new Invoice({
    invoiceNumber,
    customerId,
    items,
    totalAmount,
    date,
  });

  // Save the invoice to the database
  newInvoice
    .save()
    .then(() => {
      res.json("New Invoice Added!!");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to add invoice" });
    });
});

router.route("/getAll").get((req, res) => {
  const mycustomerId = req.query.customerId; // Get customerId from URL params

  // Check if the customerId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(mycustomerId)) {
    return res.status(400).json({ message: "Invalid customer ID" });
  }

  // Find invoices where customerId matches the given ObjectId
  Invoice.find({ customerId: mycustomerId })
    .then((invoices) => {
      if (invoices.length === 0) {
        return res.json({ foundInvoices: false });
      }
      res.json(invoices); // Send invoices as the response
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch invoices" });
    });
});

router.route("/addItem").put((req, res) => {
  const { product, quantity, price, total } = req.body;
  const invoiceId = req.query.invoiceId; // Extract invoiceId from URL parameter
  // Find the invoice by its ID
  Invoice.findOne({ invoiceNumber: invoiceId })
    .then((invoice) => {
      if (!invoice) {
        return res.status(404).json({ error: "Invoice not found" });
      }

      // Push the new item to the items array
      invoice.items.push({
        product: product,
        quantity: quantity,
        price: price,
        total: total,
      });

      invoice.totalAmount += total;

      // Save the updated invoice
      invoice
        .save()
        .then(() => {
          res.json("Item added to the invoice!");
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "Failed to update invoice" });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to find invoice" });
    });
});

router.route("/getInvoice").get((req, res) => {
  const invoiceId = req.query.invoiceId; // Extract invoiceId from URL parameter

  // Find the invoice by its ID
  Invoice.findOne({ invoiceNumber: invoiceId })
    .populate("customerId")
    .then((invoice) => {
      if (!invoice) {
        return res.json({ foundInvoices: false });
      }
      res.json(invoice); // Send invoices as the response
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch invoice" });
    });
});

module.exports = router;
