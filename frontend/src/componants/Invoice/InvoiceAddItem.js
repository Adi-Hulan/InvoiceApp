import React, { useState, useContext } from "react";
import axios from "axios";
import { InvoiceContex } from "../../contex/InvoiceContex";

export const InvoiceAddItem = () => {
  const [itemName, setItemName] = useState("");
  const [itemTotal, setitemTotal] = useState("");
  const [itemQTY, setItemQTY] = useState();
  const [itemPrice, setitemPrice] = useState();

  const { refresh, setRefresh, InvoiceNumber } = useContext(InvoiceContex);

  const newItem = {
    product: itemName,
    quantity: parseInt(itemQTY),
    price: parseFloat(itemPrice),
    total: parseFloat(itemTotal), // Should be quantity * price
  };

  const addItemToInvoice = async (e) => {
    e.preventDefault();
    try {
      console.log("Adding " + newItem + " item to invoice...");

      const response = await axios.put(
        `http://localhost:8070/invoice/addItem?invoiceId=${InvoiceNumber}`, // URL with query parameter
        newItem, // Request body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data); // Log response from the server
      setRefresh(refresh + 1);
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item to invoice!");
    }
  };

  return (
    <div>
      <form className="my-5 invoice-items-form">
        <div className="mb-3">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />
            <label>Item</label>
          </div>
        </div>
        <div className="mb-3">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => {
                setitemPrice(e.target.value);
              }}
            />
            <label>Price</label>
          </div>
        </div>
        <div className="mb-3">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => {
                setItemQTY(e.target.value);
              }}
            />
            <label>QTY</label>
          </div>
        </div>
        <div className="mb-3">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => {
                setitemTotal(e.target.value);
              }}
            />
            <label>total</label>
          </div>
        </div>

        <div className="text-end">
          <button type="submit" className="btn btn-subtle me-2">
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => addItemToInvoice(e)}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
