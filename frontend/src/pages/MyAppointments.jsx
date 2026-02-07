import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

function MyAppointments() {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data?.message || "Server error");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  const cancelAppointments = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointments`,
        { appointmentId },
        {
          headers: { token },
        },
      );

      if (data.success) {
        toast.success(data?.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data?.message || "Server error");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  const makePayment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment`,
        { appointmentId },
        {
          headers: { token },
        },
      );

      if (data.success) {
        toast.success(data?.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data?.message || "Server error");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  const formatSlotDate = (slotDate) => {
    const [day, month, year] = slotDate.split("_");
    return new Date(year, month - 1, day).toDateString();
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <p className="pb-3 mt-12 font-semibold text-lg text-zinc-700 border-b">
        My Appointments
      </p>

      <div className="mt-6 space-y-5">
        {appointments.map((item) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row gap-6 p-4 border border-zinc-200 rounded-lg shadow-sm hover:shadow-md transition"
          >
            {/* Doctor Image */}
            <div className="flex-shrink-0">
              <img
                className="w-32 h-32 object-cover rounded-md bg-indigo-50"
                src={item.docData.image}
                alt="doctor"
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1 text-sm text-zinc-700 space-y-1">
              <p className="text-base font-semibold">{item.docData.name}</p>
              <p className="text-indigo-600">{item.docData.speciality}</p>

              <div className="pt-2">
                <p className="font-medium">Address</p>
                <p>{item.docData?.address?.line1}</p>
                <p>{item.docData?.address?.line2}</p>
              </div>

              <p className="pt-2">
                <span className="font-medium">Date & Time:</span>{" "}
                {formatSlotDate(item.slotDate)} | {item.slotTime}
              </p>

              <p className="pt-1">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full border
      ${
        item.cancelled
          ? "text-red-600 border-red-600 bg-red-50"
          : item.isCompleted
            ? "text-green-600 border-green-600 bg-green-50"
            : "text-yellow-600 border-yellow-600 bg-yellow-50"
      }`}
                >
                  {item.cancelled
                    ? "Cancelled"
                    : item.isCompleted
                      ? "Completed"
                      : "Upcoming"}
                </span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex sm:flex-col gap-3 justify-end">
              {!item.payment && !item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => makePayment(item._id)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Pay Online
                </button>
              )}

              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointments(item._id)}
                  className="px-4 py-2 text-sm font-medium text-red-600 border border-red-500 rounded-md hover:bg-red-50"
                >
                  Cancel Appointment
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointments;
