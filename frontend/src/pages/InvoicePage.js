import React, { useState } from "react";
import { Invoice } from "../componants/Invoice/Invoice";
import { InvoiceCustomerDetails } from "../componants/Invoice/InvoiceCustomerDetails";
import { InvoiceAddItem } from "../componants/Invoice/InvoiceAddItem";
import { InvoiceContex } from "../contex/InvoiceContex";

export const InvoicePage = () => {
  const [InvoiceNumber, setInvoiceNumber] = useState("");
  const [refresh, setRefresh] = useState(0);
  return (
    <div className="right-side">
      <InvoiceContex.Provider
        value={{ InvoiceNumber, setInvoiceNumber, refresh, setRefresh }}
      >
        <InvoiceCustomerDetails />
        <div className="mt-3 d-flex">
          <Invoice />
          <InvoiceAddItem />
        </div>
      </InvoiceContex.Provider>
    </div>
  );
};
