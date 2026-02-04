import React from "react";
import { assets } from "../../assets_admin/assets";

function AddDoctor() {
  return (
    <div className="p-6  min-h-screen w-full">
      <form className="bg-white max-w-4xl mx-auto p-6 rounded-lg shadow">
        <p className="text-lg font-semibold mb-6">Add Doctor</p>

        {/* Image Upload */}
        <div className="flex items-center gap-6 mb-6">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              src={assets.upload_area}
              alt="upload_area"
              className="w-28 h-28 object-cover border rounded-lg"
            />
          </label>
          <input type="file" id="doc-img" hidden />
          <p className="text-sm text-gray-500">
            Upload doctor <br /> picture
          </p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Doctor Name"
            className="input-field"
            required
          />

          <select className="input-field">
            <option value="">Select Speciality</option>
            <option value="General Physician">General Physician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
          </select>

          <input
            type="text"
            placeholder="Degree (eg: MBBS)"
            className="input-field"
          />

          <select className="input-field">
            <option value="">Select Experience</option>
            {Array.from({ length: 15 }, (_, i) => {
              const year = i + 1;
              return (
                <option key={year} value={`${year} Year${year > 1 ? "s" : ""}`}>
                  {year} Year{year > 1 ? "s" : ""}
                </option>
              );
            })}
          </select>

          <input
            type="password"
            placeholder="Password"
            className="input-field"
          />

          <input type="number" placeholder="Fees" className="input-field" />
        </div>

        {/* About */}
        <div className="mt-5">
          <textarea
            rows="4"
            placeholder="About Doctor"
            className="input-field resize-none"
          ></textarea>
        </div>

        {/* Address */}
        <p className="text-sm font-semibold mt-6 mb-3">Address</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Address Line 1"
            className="input-field"
          />

          <input
            type="text"
            placeholder="Address Line 2"
            className="input-field"
          />
        </div>

        {/* Button */}
        <button
          type="button"
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
}

export default AddDoctor;
