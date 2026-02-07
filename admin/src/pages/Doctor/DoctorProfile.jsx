import React, { useContext, useEffect, useState } from "react";
import { doctorContext } from "../../context/DoctorContext";

function DoctorProfile() {
  const {
    dToken,
    profileData,
    getProfileData,
    updateProfileData,
  } = useContext(doctorContext);

  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    fees: "",
    address: "",
    available: false,
  });

  // Fetch profile
  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  // Prefill editable fields
  useEffect(() => {
    if (profileData) {
      setFormData({
        fees: profileData.fees || "",
        address: profileData.address || "",
        available: profileData.available || false,
      });
    }
  }, [profileData]);

  const { fees, address, available } = formData;

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Save profile
  const handleSave = () => {
    updateProfileData(fees, address, available);
    setIsEdit(false);
  };

  if (!profileData) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-xl p-6">

        {/* Header */}
        <div className="flex items-center gap-6">
          <img
            src={profileData.image}
            alt="doctor"
            className="w-28 h-28 rounded-full object-cover border"
          />

          <div>
            <h2 className="text-2xl font-semibold">{profileData.name}</h2>
            <p className="text-gray-600">
              {profileData.degree} · {profileData.speciality}
            </p>

            <span className="inline-block mt-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
              {profileData.experience} Years Experience
            </span>
          </div>
        </div>

        {/* About */}
        <p className="mt-5 text-gray-700">{profileData.about}</p>

        {/* Editable Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Fees */}
          <div>
            <label className="text-sm font-medium">Consultation Fees</label>
            {isEdit ? (
              <input
                type="number"
                name="fees"
                value={fees}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 mt-1"
              />
            ) : (
              <p className="mt-1 font-semibold">₹ {profileData.fees}</p>
            )}
          </div>

          {/* Availability */}
          <div>
            <label className="text-sm font-medium">Availability</label>
            {isEdit ? (
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  name="available"
                  checked={available}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span>{available ? "Available" : "Not Available"}</span>
              </label>
            ) : (
              <p
                className={`mt-1 font-semibold ${
                  profileData.available
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {profileData.available ? "Available" : "Not Available"}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Clinic Address</label>
            {isEdit ? (
              <textarea
                name="address"
                value={address}
                onChange={handleChange}
                rows="3"
                className="w-full border rounded-md px-3 py-2 mt-1 resize-none"
              />
            ) : (
              <p className="mt-1">{profileData.address}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          {isEdit ? (
            <>
              <button
                onClick={() => setIsEdit(false)}
                className="px-5 py-2 rounded-md border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;
