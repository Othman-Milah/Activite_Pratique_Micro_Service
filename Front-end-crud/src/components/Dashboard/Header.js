import React from "react";

import Logout from "../Logout";

const Header = ({ setIsAdding, setIsAuthenticated, name }) => {
  return (
    <header>
      <h1>Customer Management</h1>
      <div style={{ marginTop: "30px", marginBottom: "18px" }}>
        <button onClick={() => setIsAdding(true)}>Add {name}</button>
        <Logout setIsAuthenticated={setIsAuthenticated} />
      </div>
    </header>
  );
};

export default Header;
