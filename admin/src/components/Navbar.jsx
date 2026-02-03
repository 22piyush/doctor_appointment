import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets_admin/assets";

function Navbar() {
  const { aToken } = useContext(AdminContext);

  return (
    <div>
      <div>
        <img src={assets.admin_logo} alt="admin_logo" />
        <p>{aToken ? "Admin" : "Doctor"}</p>
      </div>
      <button>Logout</button>
    </div>
  );
}

export default Navbar;
