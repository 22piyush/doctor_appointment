import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets_admin/assets";

function Sidebar() {
  const { aToken } = useContext(AdminContext);

  return (
    <div className="min-h-screen w-50 bg-white border-r shadow-sm sticky top-0 left-0">
      {aToken && (
        <ul className="flex flex-col gap-1 p-4">
          <NavLink
            to="/admin-dashboard"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <img src={assets.home_icon} alt="home_icon" className="w-5" />
            <p className="text-sm font-medium">Dashboard</p>
          </NavLink>

          <NavLink
            to="/all-appointments"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <img
              src={assets.appointment_icon}
              alt="appointment_icon"
              className="w-5"
            />
            <p className="text-sm font-medium">Appointments</p>
          </NavLink>

          <NavLink
            to="/add-doctor"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <img src={assets.add_icon} alt="add_icon" className="w-5" />
            <p className="text-sm font-medium">Add Doctor</p>
          </NavLink>

          <NavLink
            to="/doctor-list"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <img src={assets.people_icon} alt="people_icon" className="w-5" />
            <p className="text-sm font-medium">Doctor List</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
}

export default Sidebar;
