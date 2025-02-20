import { React, useContext, useEffect, useState, useRef } from "react";
import logo from "../img/LOGO.png";
import { InvoiceContex } from "../../contex/InvoiceContex";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const Invoice = () => {
  const { InvoiceNumber, refresh } = useContext(InvoiceContex);
  const invoiceRef = useRef();

  const [invoice, setInvoice] = useState({});
  const [customerDetails, setCustomerDetails] = useState();
  const [items, setItems] = useState();
  const [total, setTotal] = useState(0);

  const formatDate = (date) => {
    return new Date(date)
      .toLocaleDateString("en-US", {
        month: "long", // Full month name (e.g., September)
        day: "2-digit", // Two-digit day (e.g., 13)
        year: "numeric", // Full year (e.g., 2024)
      })
      .replace(",", ".");
  };

  // Example Usage:
  const today = new Date();

  useEffect(() => {
    const fetchInvoice = async () => {
      console.log("Fetching new dataaaa for" + InvoiceNumber);
      try {
        console.log("Fetching Invoice...");
        const response = await axios.get(
          `http://localhost:8070/invoice/getInvoice?invoiceId=${InvoiceNumber}`
        );
        setInvoice(response.data);
      } catch (error) {
        console.error("Error fetching Invoice:", error);
      }
    };

    fetchInvoice();

    if (invoice) {
      if (invoice.foundInvoices === false) {
        return console.log("nooooo");
      }

      setCustomerDetails(invoice.customerId);
    }
  }, [refresh, InvoiceNumber]);

  useEffect(() => {
    if (invoice) {
      if (invoice.foundInvoices === false) {
        return console.log("nooooo");
      }

      setItems(invoice.items);
      setCustomerDetails(invoice.customerId);
      console.log("The total is " + invoice.total);
      setTotal(invoice.totalAmount);
    }
  }, [invoice]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  const handdleDownload = () => {
    const input = invoiceRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "px", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf"); // Download the PDF
    });
  };

  return (
    <div ref={invoiceRef} className="invoice-container m-4">
      <div className="header">
        <div className="logo">
          <img src={logo} alt="logo"></img>
        </div>
        <div className="details">
          <div className="type1">
            <span className="name">Invoice#</span>
            <span className="value">
              {InvoiceNumber ? `T${InvoiceNumber}` : ""}
            </span>
          </div>
          <div className="type2">
            <span className="name">DATE</span>
            <span className="value">{formatDate(today)}</span>
          </div>
        </div>
      </div>
      <div className="invoiceInfo d-flex mt-5 gap-5">
        <div className="from d-flex flex-column">
          <h4>From</h4>
          <span className="conpany-name">Taycantech</span>
          <span>Contact Information,</span>
          <span>info@taycantech.com</span>
          <span>+94 77 122 5553</span>
        </div>
        <div className="to d-flex flex-column">
          <h4>To</h4>
          <span className="conpany-name">
            {customerDetails ? customerDetails.name : "Customer Name"}
          </span>
          <span>Contact Information,</span>
          <span>
            {customerDetails ? customerDetails.email : "Customer email"}
          </span>
          <span>
            {customerDetails ? customerDetails.phone : "Customer phone"}
          </span>
        </div>
      </div>
      <div className="item-table mt-5">
        <table>
          <thead>
            <tr>
              <th>Sevice</th>
              <th>Cost</th>
              <th>QTY</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item) => (
                <tr key={item._id}>
                  <td>{item.product}</td>
                  <td>LKR {item.price}</td>
                  <td>{item.quantity}</td>
                  <td>LKR {item.total}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="d-flex gap-3 width justify-content-end pe-5 pt-4 totalSection">
        <span className="title">Total</span>
        <span className="value">LKR {total}</span>
      </div>
      <div className="mt-5 d-flex flex-column tac">
        <span className="title">TERMS & CONDITIONS</span>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handdleDownload}
        >
          Download
        </button>
      </div>
    </div>
  );
};
