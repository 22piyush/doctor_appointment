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

      <div className="flex flex-col justify-center md:flex-row gap-10 my-12 text-sm md:mx-28">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.contact_image}
          alt="contact_image"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">Our OFFICE</p>
          <p className="text-gray-500">
            34, wilson sandlley <br /> Suite 350, washinton america
          </p>
          <p className="text-gray-500">Tel: (415) 555-0132 <br /> asdasd123@gmail.com</p>
          <p className="font-semibold text-lg text-gray-600">Carrer at PRESCRIPTO</p>
          <p className="text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet aliquid nostrum quia amet. Id cupiditate amet, rem incidunt commodi sunt?</p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-300 cursor-pointer">Explore Jobs</button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
