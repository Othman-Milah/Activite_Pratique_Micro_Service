import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Add = ({ customers, setCustomers, setIsAdding }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  //const [id, setId] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    const id = customers[customers.length - 1].id + 1;
    console.log(id);

    if (!name || !email || !id) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const newCustomer = {
      id,
      email,
      name,
    };

    customers.push(newCustomer);
    localStorage.setItem("customer_data", JSON.stringify(customers));
    setCustomers(customers);
    setIsAdding(false);

    axios
      .post(`http://localhost:8888/CUSTOMER-SERVICE/customers`, newCustomer)
      .then((res) => {
        console.log("result");
      })
      .catch((err) => {
        console.log("err");
      });

    Swal.fire({
      icon: "success",
      title: "Added!",
      text: `${name} at ${id}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Customer</h1>
        <label htmlFor="id">Id</label>
        <input
          id="id"
          type="text"
          name="id"
          value={customers[customers.length - 1].id + 1}
          readOnly
          //onChange={(e) => setId(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div style={{ marginTop: "30px" }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
