import React from "react";
import { assets } from "../assets/assets_frontend/assets";

function Banner() {
  return (
    <div className="flex bg-[#5F6FFF] rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10">
      {/* Left Side */}
      <div>
        <div>
            <h1>Book Appointment</h1>
            <p>with 100+ Trustd Doctors</p>
        </div>
        <button>Create account</button>
      </div>

      {/* Right Side */}
      <div>
        <img src={assets.appointment_img} alt="appointment_img" />
      </div>
    </div>
  );
}

export default Banner;
