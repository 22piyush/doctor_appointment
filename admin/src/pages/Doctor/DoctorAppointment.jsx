import React, { useContext, useEffect } from "react";
import { doctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets_admin/assets";

function DoctorAppointment() {
  const { getAppointments, appointments, dToken } = useContext(doctorContext);
    const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="p-5 w-full">
      <h2 className="text-xl font-semibold mb-4">Appointments</h2>

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
                <th className="p-3 ">Payment</th>
                <th className="p-3 ">Age</th>
                <th className="p-3 ">Date & Time</th>
                <th className="p-3 ">Fees</th>
                <th className="p-3 ">Action</th>
              </tr>
            </thead>

            <tbody>
              {appointments?.length > 0 ? (
                appointments.map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-b last:border-none hover:bg-gray-50"
                  >
                    {/* # */}
                    <td className="p-3 text-center">{index + 1}</td>

                    {/* Patient */}
                    <td className="p-3">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.userData?.image}
                          alt="patient"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-800">
                            {item.userData?.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.userData?.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Payment */}
                    <td className="p-3">
                      {item.payment ? (
                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                          Paid
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-medium">
                          Pending
                        </span>
                      )}
                    </td>

                    {/* Age */}
                    <td className="p-3">
                      {calculateAge(item.userData?.dob)} yrs
                    </td>

                    {/* Date & Time */}
                    <td className="p-3">
                      <p className="font-medium">
                        {item.slotDate.replaceAll("_", "-")}
                      </p>
                      <p className="text-sm text-gray-500">{item.slotTime}</p>
                    </td>

                    {/* Fees */}
                    <td className="p-3 font-medium text-gray-800">
                      ₹ {item.amount}
                    </td>

                    {/* Action */}
                    <td className="p-3">
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
                          className="w-8 cursor-pointer hover:scale-110 transition"
                          src={assets.cancel_icon}
                          alt="cancel"
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

export default DoctorAppointment;
