import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Edit = ({ customers, selectedCustomer, setCustomers, setIsEditing }) => {
  const id = selectedCustomer.id;

  const [email, setEmail] = useState(selectedCustomer.email);
  const [name, setName] = useState(selectedCustomer.name);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!email || !name || !id) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const customer = {
      id,
      name,
      email,
    };

    for (let i = 0; i < customers.length; i++) {
      if (customers[i].id === id) {
        customers.splice(i, 1, customer);
        break;
      }
    }

    axios
      .put(`http://localhost:8888/CUSTOMER-SERVICE/customers/${id}`, customer)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    localStorage.setItem("customer_data", JSON.stringify(customers));
    setCustomers(customers);
    setIsEditing(false);

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: `${customer.customerName} at ${customer.id}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Customer</h1>

        <label htmlFor="id">Id</label>
        <input
          id="id"
          type="text"
          name="id"
          value={id}
          readOnly
          // onChange={(e) => (e.target.value)}
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
          type="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* <label htmlFor="salary">Salary ($)</label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        /> */}
        <div style={{ marginTop: "30px" }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
