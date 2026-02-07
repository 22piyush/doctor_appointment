import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets_admin/assets";

function AllAppointments() {
  const { aToken, getAllAppointments, appointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="p-5 w-full">
      <h2 className="text-xl font-semibold mb-4">All Appointments</h2>

      {/* TABLE CONTAINER */}
      <div className="bg-white shadow rounded">
        {/* SCROLL AREA */}
        <div className="max-h-[500px] overflow-y-auto border">
          <table className="w-full">
            {/* STICKY HEADER */}
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="p-3 ">#</th>
                <th className="p-3 ">Patient</th>
                <th className="p-3 ">Age</th>
                <th className="p-3 ">Date & Time</th>
                <th className="p-3 ">Doctor</th>
                <th className="p-3 ">Fees</th>
                <th className="p-3 ">Status</th>
              </tr>
            </thead>

            <tbody>
              {appointments?.length > 0 ? (
                appointments.map((item, index) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="p-3 ">{index + 1}</td>

                    <td className="p-3 ">
                      <div className="flex items-center gap-6">
                        <div className="h-10 rounded-full">
                          <img
                            src={item.userData.image}
                            alt="doctors"
                            className="h-full"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.userData?.name}</p>
                          <p className="text-sm text-gray-500">
                            {item.userData?.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-3 ">
                      {calculateAge(item.userData?.dob)} yrs
                    </td>

                    <td className="p-3 ">
                      <p>{item.slotDate.replaceAll("_", "-")}</p>
                      <p className="text-sm text-gray-500">{item.slotTime}</p>
                    </td>

                    <td className="p-3 ">
                      <p className="font-medium">{item.docData?.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.docData?.speciality}
                      </p>
                    </td>

                    <td className="p-3 ">₹ {item.amount}</td>

                    <td className="p-3 ">
                      {item.cancelled ? (
                        <span className="text-red-500 font-medium">
                          Cancelled
                        </span>
                      ) : item.isCompleted ? (
                        <span className="text-green-600 font-medium">
                          Completed
                        </span>
                      ) : (
                        <img
                          onClick={() => cancelAppointment(item._id)}
                          className="w-10 cursor-pointer hover:scale-110 transition"
                          src={assets.cancel_icon}
                          alt="cancel_icon"
                        />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-5 text-gray-500">
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllAppointments;
