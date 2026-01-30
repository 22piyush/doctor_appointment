import React from "react";
import { assets } from "../assets/assets_frontend/assets";

function Footer() {
  return (
    <div>
      <div>
        {/* Left Section  */}
        <div>
          <img src={assets.logo} alt="logo" />
          <p>
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
          <p>COMPANY</p>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section  */}
        <div>
          <p>GET IN TOUCH</p>
          <ul>
            <li>123456789920</li>
            <li>dada#gmaimm.com</li>
          </ul>
        </div>
      </div>

      {/* Comment  */}
      <div>
        <hr />
        <p>Copyright 2026@ Prescripto - All Right Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
