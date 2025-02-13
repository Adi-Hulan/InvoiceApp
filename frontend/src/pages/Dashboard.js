import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { InvoicePage } from "./InvoicePage";
import { QuotePage } from "./QuotePage";

export const Dashboard = () => {
  return (
    <Router>
      <div className="d-flex dashboard">
        <div className="d-flex flex-column bg-primary vh-100 p-4 position-fixed">
          <h3>Dashboard</h3>

          <ul className="sidebar-list pl-0">
            <li className="mt-4 mb-4 bg-light bg-opacity-25 p-2 rounded">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="mt-4 mb-4 bg-light bg-opacity-10 p-2 rounded">
              <Link to="/invoice">Invoice</Link>
            </li>
            <li className="mt-4 mb-4 bg-light bg-opacity-10 p-2 rounded">
              <Link to="quote">Quotation</Link>
            </li>
          </ul>
        </div>
        <div className="m-5 pl-5 content-section">
          <Routes>
            <Route path="/invoice" element={<InvoicePage />} />
            <Route path="/quote" element={<QuotePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
