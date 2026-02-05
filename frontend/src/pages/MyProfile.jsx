import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

function MyProfile() {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const [image, setImage] = useState(false);

  const inputStyle =
    "w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    userData && (
      <div className="max-w-lg mx-auto p-5 flex flex-col gap-4 text-sm bg-white rounded-lg shadow">
        {isEdit ? (
          <label htmlFor="">
            <div>
              <img src="" alt="" />
              <img src="" alt="" />
            </div>
            <input type="file" is="image" hidden />
          </label>
        ) : (
          <img
            className="w-36 rounded-full self-center"
            src={userData.image}
            alt="profile"
          />
        )}

        {/* Name */}
        {isEdit ? (
          <input
            className={`${inputStyle} text-2xl font-semibold`}
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="text-2xl font-semibold text-center">{userData.name}</p>
        )}

        <hr />

        {/* Contact Info */}
        <div>
          <p className="text-gray-500 font-medium underline mb-2">
            CONTACT INFORMATION
          </p>

          <p className="text-gray-600">Email</p>
          <p>{userData.email}</p>

          <p className="text-gray-600 mt-2">Phone</p>
          {isEdit ? (
            <input
              className={inputStyle}
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p>{userData.phone}</p>
          )}

          <p className="text-gray-600 mt-2">Address</p>
          {isEdit ? (
            <>
              <input
                className={inputStyle}
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
              <input
                className={inputStyle}
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            </>
          ) : (
            <p>
              {userData?.address?.line1}
              <br />
              {userData?.address?.line2}
            </p>
          )}
        </div>

        {/* Basic Info */}
        <div>
          <p className="text-gray-500 font-medium underline mb-2">
            BASIC INFORMATION
          </p>

          <p className="text-gray-600">Gender</p>
          {isEdit ? (
            <select
              className={inputStyle}
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}

          <p className="text-gray-600 mt-2">Birthday</p>
          {isEdit ? (
            <input
              type="date"
              className={inputStyle}
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p>{userData.dob}</p>
          )}
        </div>

        {/* Button */}
        <button
          onClick={() => setIsEdit(!isEdit)}
          className={`mt-4 px-4 py-2 cursor-pointer text-white rounded-full ${
            isEdit
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isEdit ? "Save Information" : "Edit Profile"}
        </button>
      </div>
    )
  );
}

export default MyProfile;
