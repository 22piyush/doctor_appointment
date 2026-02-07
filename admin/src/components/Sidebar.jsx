import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets_admin/assets";
import { doctorContext } from "../context/DoctorContext";

function Sidebar() {
  const { aToken } = useContext(AdminContext);
 const { dToken } = useContext(doctorContext);
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
     ${
       isActive
         ? "bg-blue-100 text-blue-600 border-l-4 border-blue-500"
         : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
     }`;

  return (
    <div className="min-h-screen w-52 bg-white border-r shadow-sm sticky top-0 left-0">
      {aToken && (
        <ul className="flex flex-col gap-1 p-4">
          <NavLink to="/admin-dashboard" className={linkClass}>
            <img src={assets.home_icon} alt="home_icon" className="w-5" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink to="/all-appointments" className={linkClass}>
            <img
              src={assets.appointment_icon}
              alt="appointment_icon"
              className="w-5"
            />
            <p>Appointments</p>
          </NavLink>

          <NavLink to="/add-doctor" className={linkClass}>
            <img src={assets.add_icon} alt="add_icon" className="w-5" />
            <p>Add Doctor</p>
          </NavLink>

          <NavLink to="/doctor-list" className={linkClass}>
            <img src={assets.people_icon} alt="people_icon" className="w-5" />
            <p>Doctor List</p>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className="flex flex-col gap-1 p-4">
          <NavLink to="/doctor-dashboard" className={linkClass}>
            <img src={assets.home_icon} alt="home_icon" className="w-5" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink to="/doctor-appointments" className={linkClass}>
            <img
              src={assets.appointment_icon}
              alt="appointment_icon"
              className="w-5"
            />
            <p>Appointments</p>
          </NavLink>

          <NavLink to="/doctor-profile" className={linkClass}>
            <img src={assets.add_icon} alt="add_icon" className="w-5" />
            <p>Profile</p>
          </NavLink>

        </ul>
      )}
    </div>
  );
}

export default Sidebar;
