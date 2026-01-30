import React from "react";
import { assets } from "../assets/assets_frontend/assets";

function Footer() {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* Left Section  */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            harum sit unde ab tempora error perspiciatis, recusandae est,
            doloribus dolores delectus. Esse magnam illum, odio hic ad possimus
            minus fugit? Nemo explicabo voluptas, id vel veniam nisi quod quis.
            Praesentium, harum? Accusantium nam asperiores quae expedita ipsum
            laborum id quaerat?
          </p>
        </div>

        {/* Center Section  */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section  */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>123456789920</li>
            <li>dada#gmaimm.com</li>
          </ul>
        </div>
      </div>

      {/* Comment  */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">Copyright 2026@ Prescripto - All Right Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
