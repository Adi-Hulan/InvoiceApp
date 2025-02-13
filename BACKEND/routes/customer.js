const express = require("express");
const router = express.Router();
let Customer = require("../models/customer");

router.route("/add").post((req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const address = req.body.address;

  const newCustomer = new Customer({
    id,
    name,
    email,
    phone,
    address,
  });

  newCustomer
    .save()
    .then(() => {
      res.json("New Customer Added!!");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to add customer" });
    });
});

router.route("/getAll").get((req, res) => {
  Customer.find()
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch students" });
    });
});

module.exports = router;
