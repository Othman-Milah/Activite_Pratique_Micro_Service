import React from "react";

const Table = ({
  handleEdit,
  handleDelete,
  handleBillsByCustomer,
  customers,
  customerName,
  customerEmail,
}) => {
  // const formatter = new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "USD",
  //   minimumFractionDigits: null,
  // });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Email</th>
            <th>Id</th>
            <th>Name</th>
            <th colSpan={3} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map(
              (customer, i) =>
                customer.name.startsWith(customerName) &&
                customer.email.startsWith(customerEmail) && (
                  <tr key={customer.id}>
                    <td>{i + 1}</td>
                    <td>{customer.email}</td>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td className="text-right">
                      <button
                        onClick={() => handleEdit(customer.id)}
                        className="button muted-button"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="text-left">
                      <button
                        onClick={() => handleDelete(customer.id)}
                        className="button muted-button"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="text-left">
                      <button
                        onClick={() => {
                          handleBillsByCustomer(customer.id);
                        }}
                        className="button muted-button"
                      >
                        Show Bills
                      </button>
                    </td>
                  </tr>
                )
            )
          ) : (
            <tr>
              <td colSpan={7}>No Employees</td>
            </tr>
          )}
          {/* {employees.length > 0 ? (
            employees.map((employee, i) => (
              <tr key={employee.id}>
                <td>{i + 1}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{formatter.format(employee.salary)}</td>
                <td>{employee.date} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(employee.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Employees</td>
            </tr>
          )} */}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
