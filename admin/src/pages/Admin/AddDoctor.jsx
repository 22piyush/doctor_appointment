import React, { useContext, useState } from "react";
import { assets } from "../../assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

function AddDoctor() {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  console.log(aToken, "333333333333");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) return toast.error("Doctor image is required");
      if (!name.trim()) return toast.error("Doctor name is required");
      if (!email.trim()) return toast.error("Email is required");
      if (!password.trim()) return toast.error("Password is required");
      if (password.length < 6)
        return toast.error("Password must be at least 6 characters");
      if (!degree.trim()) return toast.error("Degree is required");
      if (!experience) return toast.error("Experience is required");
      if (!fees || fees <= 0) return toast.error("Enter valid fees");
      if (!about.trim()) return toast.error("About field is required");
      if (!address1.trim()) return toast.error("Address line 1 is required");

      const formData = new FormData();

      formData.append("image", docImg); // doctor image

      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);

      // Address (nested)
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 }),
      );

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: { aToken },
        },
      );

      if (data.success) {
        toast.success(data.message);
        // reset image
        setDocImg(null);

        // reset text fields
        setName("");
        setEmail("");
        setSpeciality("");
        setDegree("");
        setExperience("");
        setFees("");
        setAbout("");

        // reset address
        setAddress1("");
        setAddress2("");
        document.getElementById("doc-img").value = "";
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      return toast.error(err);
    }
  };

  return (
    <div className="p-6 min-h-screen w-full">
      <form className="bg-white max-w-4xl mx-auto p-6 rounded-lg shadow max-h-[80vh] show-scrollbar overflow-auto">
        <p className="text-lg font-semibold mb-6">Add Doctor</p>

        {/* Image Upload */}
        <div className="flex items-center gap-6 mb-6">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="upload_area"
              className="w-28 h-28 object-cover border rounded-lg"
            />
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(e) => setDocImg(e.target.files[0])}
            required
          />
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Doctor Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <select
            className="input-field"
            required
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
          >
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
            required
            placeholder="Degree Education (eg: MBBS)"
            className="input-field"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />

          <select
            className="input-field"
            required
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          >
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
            required
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="number"
            required
            placeholder="Fees"
            className="input-field"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
          />
        </div>

        {/* About */}
        <div className="mt-5">
          <textarea
            rows="4"
            required
            placeholder="About Doctor"
            className="input-field resize-none"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </div>

        {/* Address */}
        <p className="text-sm font-semibold mt-6 mb-3">Address</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            required
            type="text"
            placeholder="Address Line 1"
            className="input-field"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
          />

          <input
            required
            type="text"
            placeholder="Address Line 2"
            className="input-field"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={onSubmitHandler}
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
