const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongoose connection success!");
});

// const studentRouter = require("./routes/students.js");
const customerRouter = require("./routes/customer.js");
const invoiceRouter = require("./routes/invoice.js");

// app.use("/student" , studentRouter);
app.use("/customer", customerRouter);
app.use("/invoice", invoiceRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
