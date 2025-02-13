import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { InvoiceContex } from "../../contex/InvoiceContex";

export const InvoiceCustomerDetails = () => {
  const [customers, setCustomers] = useState([]);
  const [Invoices, setInvoices] = useState([]);
  const [selectedCustomer, setselectedCustomer] = useState(null);
  const [customerID, setCustomerID] = useState("");

  const { InvoiceNumber, setInvoiceNumber, refresh, setRefresh } =
    useContext(InvoiceContex);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        console.log("Fetching customers...");
        const response = await axios.get(
          "http://localhost:8070/customer/getAll"
        );
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    if (customerID) {
      const findedCustomer = customers.find(
        (customer) => customer._id === customerID
      );
      setselectedCustomer(findedCustomer || null);
    }
  }, [customerID]);

  const fetchInvoices = async (customerId) => {
    try {
      console.log("Fetching invoices for customer ID:", customerId);
      const response = await axios.get(
        `http://localhost:8070/invoice/getAll?customerId=${customerId}`
      );
      setInvoices(response.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const addInvoice = async (e) => {
    const newInvoice = {
      invoiceNumber: InvoiceNumber,
      customerId: customerID,
    };
    e.preventDefault();
    try {
      console.log("Adding New Invoice..." + newInvoice);

      const response = await axios.post(
        `http://localhost:8070/invoice/add`, // URL with query parameter
        newInvoice, // Request body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data); // Log response from the server
      setRefresh(refresh + 1);
    } catch (error) {
      console.error("Error adding Invoice:", error);
      alert("Error adding Invoice");
    }
  };

  const generateNumber = (e) => {
    e.preventDefault();
    fetchInvoices(customerID);
  };

  useEffect(() => {
    if (Invoices.length > 0) {
      const invoiceNumbers = Invoices.map((invoice) =>
        parseInt(invoice.invoiceNumber.replace("T", ""))
      );
      const highestInvoiceNumber = Math.max(...invoiceNumbers);
      const incrementedNumber = `${highestInvoiceNumber + 1}`;
      setInvoiceNumber(incrementedNumber);
    } else if (selectedCustomer) {
      const customerNumber = parseInt(selectedCustomer.id.replace("T", ""));
      setInvoiceNumber(`${customerNumber + 1}`);
    }
  }, [Invoices]);

  return (
    <div>
      <div className="form customer-details px-3">
        <div className="d-flex gap-3">
          <div className="col-3">
            <label className="visually-hidden">Preference</label>
            <select
              className="form-select"
              id="inlineFormSelectPref"
              onChange={(e) => setCustomerID(e.target.value)}
            >
              <option>Choose...</option>
              {customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-3">
            <label className="visually-hidden">Invoice Number</label>
            <div className="input-group">
              <div className="input-group-text">T</div>
              <input
                type="text"
                className="form-control"
                id="inlineFormInputGroupUsername"
                placeholder="Invoice Number"
                value={InvoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-primary"
                onClick={generateNumber}
              >
                Generate
              </button>
            </div>
          </div>
        </div>

        <label className="form-label ml-3 mt-3 ms-3">Contact Information</label>
        <div className="contact-info d-flex gap-3">
          <div className="input-group">
            <span className="input-group-text" id="basic-addon3">
              Address
            </span>
            <input
              type="text"
              className="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
              value={selectedCustomer ? selectedCustomer.address : ""}
              readOnly
            />
          </div>
          <div className="input-group">
            <span className="input-group-text" id="basic-addon3">
              Email
            </span>
            <input
              type="text"
              className="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
              value={selectedCustomer ? selectedCustomer.email : ""}
              readOnly
            />
          </div>
          <div className="input-group">
            <span className="input-group-text" id="basic-addon3">
              Phone Number
            </span>
            <input
              type="text"
              className="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
              value={selectedCustomer ? selectedCustomer.phone : ""}
              readOnly
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => addInvoice(e)}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
