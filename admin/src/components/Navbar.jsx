import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets_admin/assets";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { aToken, setAToken } = useContext(AdminContext);

  const navigate = useNavigate();

  const logout = () => {
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
    navigate("/");
  };

  return (
    <div className="h-[65px] w-full bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <img
          src={assets.admin_logo}
          alt="admin_logo"
          className="sm:w-40 w-38 object-contain"
        />
        <p className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>

      <button
        onClick={logout}
        className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
