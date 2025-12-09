// src/components/SalesTable.jsx
import React from "react";

export default function SalesTable({ rows = [] }) {
  if (rows && rows.length) {
    console.log("SalesTable rows sample:", rows.slice(0, 3));
  } else {
    console.log("SalesTable: no rows received");
  }

  // FINAL corrected column mapping (backend real keys)
  const columns = [
    { key: "TransactionID", label: "Transaction ID" },
    { key: "Date", label: "Date" },
    { key: "CustomerName", label: "Customer Name" },
    { key: "PhoneNumber", label: "Phone" },
    { key: "Gender", label: "Gender" },
    { key: "Age", label: "Age" },
    { key: "ProductCategory", label: "Category" },
    { key: "Quantity", label: "Quantity" },
    { key: "FinalAmount", label: "Final Amount" },
  ];

  // fallback mapping (in case backend keys differ)
  const getField = (row, key) => {
    if (!row) return "";

    if (row[key] !== undefined) return row[key];

    const altMap = {
      TransactionID: ["Transaction ID", "transaction_id", "transactionId"],
      Date: ["date"],
      CustomerName: ["Customer Name", "customer_name", "customerName"],
      PhoneNumber: ["Phone Number", "phone", "phone_number", "Phone"],
      Gender: ["gender"],
      Age: ["age"],
      ProductCategory: ["Product Category", "product_category", "category"],
      Quantity: ["quantity"],
      FinalAmount: ["Final Amount", "final_amount", "finalAmount"],
    };

    const alts = altMap[key] || [];
    for (const a of alts) {
      if (row[a] !== undefined) return row[a];
    }

    return "";
  };

  return (
    <div className="sales-table-wrapper" style={{ color: "#111" }}>
      {rows.length === 0 ? (
        <div style={{ padding: 20 }}>No results found</div>
      ) : (
        <table
          className="sales-table"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr style={{ background: "#f5f7f9" }}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{
                    textAlign: "left",
                    padding: "12px 16px",
                    borderBottom: "1px solid #e6e9ee",
                    color: "#333",
                    fontWeight: 600,
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} style={{ background: "#fff" }}>
                {columns.map((col) => {
                  const value = getField(row, col.key);

                  return (
                    <td
                      key={col.key}
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid #f0f2f5",
                        color: "#111",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      title={String(value ?? "")}
                    >
                      {value ?? ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
