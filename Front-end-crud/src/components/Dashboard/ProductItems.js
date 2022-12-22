import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "./Header";
import AddProductItem from "./AddProductItem";

const ProductItems = ({
  productItems,
  selectedCustomer,
  setIsProductItemsLayout,
}) => {
  const id = selectedCustomer.id;
  const [isAddingProductItem, setIsAddingProductItem] = useState(false);

  //   const [email, setEmail] = useState(selectedCustomer.email);
  //   const [name, setName] = useState(selectedCustomer.name);

  //   const handleShowProducts = (e) => {
  //     e.preventDefault();

  //     if (!id) {
  //       return Swal.fire({
  //         icon: "error",
  //         title: "Error!",
  //         text: "Field id isn't populated.",
  //         showConfirmButton: true,
  //       });

  //       setIsBillsLayout(false);
  //     }

  //     const customer = {
  //       id,
  //     };

  //     Swal.fire({
  //       icon: "success",
  //       title: "Updated!",
  //       text: `${customer.customerName} at ${customer.id}'s data has been updated.`,
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //   };

  const handleDelete = (i) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        axios
          .get(
            `http://localhost:8888/BILLING-SERVICE/bills/1/productItems/${i}`
          )
          .then((res) => {
            console.log("here", res.data._links.self.href);
            axios
              .delete(
                `http://localhost:8888/BILLING-SERVICE/bills/1/productItems/${i}`
              )
              .then((res) => console.log(res, "deleted"))
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `ProductItem of ${selectedCustomer.name}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <>
      {!isAddingProductItem && (
        <div className="contain-table">
          <h1>Customer {selectedCustomer.name}: Products Bought</h1>
          <header>
            <div style={{ marginTop: "30px", marginBottom: "18px" }}>
              <button onClick={() => setIsAddingProductItem(true)}>
                Add ProductItem
              </button>
            </div>
          </header>
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Go Back"
            onClick={() => setIsProductItemsLayout(false)}
          />
          <table className="striped-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th colSpan={2} className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {productItems.length > 0 ? (
                productItems.map((productItem, i) => (
                  <tr key={i + 1}>
                    <td>{i + 1}</td>
                    <td>{selectedCustomer.name}</td>
                    <td>{selectedCustomer.email}</td>
                    <td>{productItem.price}</td>
                    <td>{productItem.quantity}</td>
                    <td>{productItem.price * productItem.quantity}</td>
                    <td className="text-middle">
                      <button
                        onClick={() => {}}
                        className="button muted-button"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="text-left">
                      <button
                        onClick={() => {
                          handleDelete(i + 1);
                        }}
                        className="button muted-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>No Products</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {isAddingProductItem && (
        <AddProductItem
          productItems={productItems}
          setIsAddingProductItem={setIsAddingProductItem}
        />
      )}
    </>
  );
};

export default ProductItems;
