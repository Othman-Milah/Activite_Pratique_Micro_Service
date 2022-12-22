import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ProductItems from "./ProductItems";
import AddBill from "./AddProductItem.js";

const BillsLayout = ({ selectedCustomer, setIsBillsLayout }) => {
  const [bills, setBills] = useState([]);
  const [productItems, setProductItems] = useState("");
  const [isProductItemsLayout, setIsProductItemsLayout] = useState(false);

  const id = selectedCustomer.id;

  //   const [email, setEmail] = useState(selectedCustomer.email);
  //   const [name, setName] = useState(selectedCustomer.name);

  const handleShowProductItems = (link) => {
    const getRestProductItems = link.href.replace(
      "http://DESKTOP-NQDDFOE:8083",
      "http://localhost:8888/BILLING-SERVICE"
    );

    console.log("here", getRestProductItems);

    axios
      .get(getRestProductItems)
      .then((res) => setProductItems(res.data._embedded.productItems))
      .catch((err) => console.log(err));

    setIsProductItemsLayout(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8888/BILLING-SERVICE/bills")
      .then((res) => {
        console.log(res.data._embedded.bills);
        setBills(res.data._embedded.bills);
      })
      .catch((err) => console.log(err));
  }, []);

  // const handleShowProducts = (e) => {
  //   e.preventDefault();

  //   if (!id) {
  //     return Swal.fire({
  //       icon: "error",
  //       title: "Error!",
  //       text: "Field id isn't populated.",
  //       showConfirmButton: true,
  //     });

  //     setIsBillsLayout(false);
  //   }

  //   const customer = {
  //     id,
  //   };

  //   Swal.fire({
  //     icon: "success",
  //     title: "Updated!",
  //     text: `${customer.customerName} at ${customer.id}'s data has been updated.`,
  //     showConfirmButton: false,
  //     timer: 1500,
  //   });
  // };

  return !isProductItemsLayout ? (
    <div className="contain-table">
      <h1>Customer {selectedCustomer.name}: Billing</h1>
      <input
        style={{ marginLeft: "12px" }}
        className="muted-button"
        type="button"
        value="Go Back"
        onClick={() => setIsBillsLayout(false)}
      />
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Email</th>
            <th>Name</th>
            <th>Billing Date</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {bills.length > 0 ? (
            bills.map((bill, i) =>
              bill.customerID === selectedCustomer.id ? (
                <tr key={bill.billingDate}>
                  <td>{i + 1}</td>
                  <td>{selectedCustomer.email}</td>
                  <td>{selectedCustomer.name}</td>
                  <td>{bill.billingDate}</td>
                  <td className="text-center">
                    <button
                      onClick={() => {
                        handleShowProductItems(bill._links.productItems);
                      }}
                      className="button muted-button"
                    >
                      See Products
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={bill.billingDate}>
                  <td colSpan={7}>No Bills</td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={7}>No Bills</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  ) : (
    <ProductItems
      productItems={productItems}
      selectedCustomer={selectedCustomer}
      setIsProductItemsLayout={setIsProductItemsLayout}
    />
  );
};

export default BillsLayout;
