import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

function DoctorList() {
  const { doctors, aToken, getAllDoctors,changeAvailability } = useContext(AdminContext);
  console.log(doctors);

  useEffect(() => {
    if (aToken) getAllDoctors();
  }, [aToken]);

  return (
    <div className="p-6 min-h-screen w-full">
      <div className="bg-white max-w-4xl mx-auto p-6 rounded-lg shadow max-h-[80vh] show-scrollbar overflow-auto">
        <div className="w-full grid [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0">
          {doctors.map((item, index) => (
            <div
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg"
              key={index}
            >
              <img
                className="bg-blue-50"
                src={item.image}
                alt={`image_${index}`}
              />
              <div className="p-4">
                <div className="flex items-center gap-3 text-sm">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={item.available}
                    onChange={(e) => changeAvailability(item._id , e.target.checked)}
                    className="w-4 h-4 accent-green-600 cursor-pointer"
                  />

                  {/* Status Indicator */}
                  <div
                    className={`flex items-center gap-2 ${
                      item.available ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.available
                          ? "bg-green-500 animate-pulse"
                          : "bg-red-500"
                      }`}
                    ></span>

                    <p>{item.available ? "Available" : "Not Available"}</p>
                  </div>
                </div>

                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DoctorList;
