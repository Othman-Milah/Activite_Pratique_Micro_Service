import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Header from "./Header";
import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";
import BillsLayout from "./BillsLayout";

// import { employeesData } from "../../data";

const Dashboard = ({ setIsAuthenticated }) => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isBillsLayout, setIsBillsLayout] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8888/CUSTOMER-SERVICE/customers")
      .then((res) => {
        // console.log("result", res.data._embedded.customers);
        setCustomers(res.data._embedded.customers);
      })
      .catch((err) => console.log("error"));

    // const data = JSON.parse(localStorage.getItem("customers_data"));
    // if (data !== null && Object.keys(data).length !== 0) setCustomers(data);
  }, []);

  const handleEdit = (id) => {
    const [customer] = customers.filter((customer) => customer.id === id);

    setSelectedCustomer(customer);
    setIsEditing(true);
  };

  const handleBillsByCustomer = (id) => {
    const [customer] = customers.filter((customer) => customer.id === id);

    setSelectedCustomer(customer);
    setIsBillsLayout(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        const [customer] = customers.filter((customer) => customer.id === id);

        axios
          .delete(`http://localhost:8888/CUSTOMER-SERVICE/customers/${id}`)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `${customer.name} at ${customer.id}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const customerCopy = customers.filter((customer) => customer.id !== id);
        localStorage.setItem("employees_data", JSON.stringify(customerCopy));
        setCustomers(customerCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && !isBillsLayout && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
            name={"Customer"}
          />
          <div style={{ display: "flex" }}>
            <input
              style={{ width: "49vw", marginRight: "5px" }}
              type={"text"}
              placeholder="Customer Name"
              onChange={(e) => {
                setCustomerName(e.target.value);
              }}
            />
            <input
              style={{ width: "49vw" }}
              type={"text"}
              placeholder="Customer Email"
              onChange={(e) => {
                setCustomerEmail(e.target.value);
              }}
            />
          </div>

          <Table
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleBillsByCustomer={handleBillsByCustomer}
            customers={customers}
            customerName={customerName}
            customerEmail={customerEmail}
          />
        </>
      )}
      {isAdding && (
        <Add
          customers={customers}
          setCustomers={setCustomers}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          customers={customers}
          selectedCustomer={selectedCustomer}
          setCustomers={setCustomers}
          setIsEditing={setIsEditing}
        />
      )}
      {isBillsLayout && (
        <BillsLayout
          selectedCustomer={selectedCustomer}
          setIsBillsLayout={setIsBillsLayout}
        />
      )}
    </div>
  );
};

export default Dashboard;
