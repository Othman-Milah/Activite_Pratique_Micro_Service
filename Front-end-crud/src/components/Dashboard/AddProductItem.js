import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AddProductItems = ({ productItems, setIsAddingProductItem }) => {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  //const [id, setId] = useState("");
  useEffect(() => {
    console.log("productItems", productItems);
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    const id = productItems[productItems.length - 1].id + 1;
    console.log(id);

    if (!quantity || !price) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const newCustomer = {
      quantity,
      price,
    };

    productItems.push(newCustomer);
    localStorage.setItem("customer_data", JSON.stringify(productItems));
    setIsAddingProductItem(false);

    axios
      .post(`http://localhost:8888/CUSTOMER-SERVICE/productItems`, newCustomer)
      .then((res) => {
        console.log("result");
      })
      .catch((err) => {
        console.log("err");
      });

    Swal.fire({
      icon: "success",
      title: "Added!",
      text: `${quantity} and ${price}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add ProductItem</h1>
        <label htmlFor="id">Product ID</label>
        <input
          id="id"
          type="text"
          name="id"
          //   value={productItems.productID}
          readOnly
          //onChange={(e) => setId(e.target.value)}
        />
        <label htmlFor="quantity">Quantity</label>
        <input
          id="quantity"
          type="number"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </form>
      <div style={{ marginTop: "30px" }}>
        <input type="submit" value="Add" />
        <input
          style={{ marginLeft: "12px" }}
          className="muted-button"
          type="button"
          value="Cancel"
          onClick={() => setIsAddingProductItem(false)}
        />
      </div>
    </div>
  );
};

export default AddProductItems;
