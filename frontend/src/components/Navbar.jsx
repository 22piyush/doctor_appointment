import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img className="w-44 cursor-pointer" src={assets.logo} alt="logo_img" />
      <ul className="hidden md:flex items-center gap-5 font-medium">
        <NavLink to='/'>
          <li className="py-1 ">Home</li>
          <hr className="border-none outline-none h-0.5 bg-[#5F6FFF] w-3/5 m-auto hidden "/>
        </NavLink>
        <NavLink to='doctors'>
          <li className="py-1 ">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-[#5F6FFF] w-3/5 m-auto hidden "/>
        </NavLink>
        <NavLink to='about'>
          <li className="py-1 ">About</li>
          <hr className="border-none outline-none h-0.5 bg-[#5F6FFF] w-3/5 m-auto hidden "/>
        </NavLink>
        <NavLink to='contact'>
          <li className="py-1 ">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-[#5F6FFF] w-3/5 m-auto hidden "/>
        </NavLink>
      </ul>
      <div>
        <button>Create Account</button>
      </div>
    </div>
  );
}

export default Navbar;
