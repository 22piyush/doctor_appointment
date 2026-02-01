import React from "react";
import { assets } from "../assets/assets_frontend/assets";

function Contact() {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt="about_image"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>Our OFFICE</p>
          <p>
            34, wilson sandlley <br /> Suite 350, washinton america
          </p>
          <p>Tel: (415) 555-0132 <br /> asdasd123@gmail.com</p>
          <p>Carrer at PRESCRIPTO</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet aliquid nostrum quia amet. Id cupiditate amet, rem incidunt commodi sunt?</p>
          <button></button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
