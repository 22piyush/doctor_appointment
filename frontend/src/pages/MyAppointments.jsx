import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

function MyAppointments() {
  const { backendUrl, token } = useContext(AppContext);

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

  useEffect(()=>{
    if(token){
      getUserAppointments();
    }
  },[token])

  return (
    <div className="max-w-4xl mx-auto px-4">
      <p className="pb-3 mt-12 font-semibold text-lg text-zinc-700 border-b">
        My Appointments
      </p>

      <div className="mt-6 space-y-5">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-6 p-4 border border-zinc-200  rounded-lg shadow-sm hover:shadow-md transition"
          >
            {/* Doctor Image */}
            <div className="flex-shrink-0">
              <img
                className="w-32 h-32 object-cover rounded-md bg-indigo-50"
                src={item.image}
                alt={`doctor_${index}`}
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1 text-sm text-zinc-700 space-y-1">
              <p className="text-base font-semibold">{item.name}</p>
              <p className="text-indigo-600">{item.speciality}</p>

              <div className="pt-2">
                <p className="font-medium">Address</p>
                <p>{item.address.line1}</p>
                <p>{item.address.line2}</p>
              </div>

              <p className="pt-2">
                <span className="font-medium">Date & Time:</span> 23 July, 2025
                | 8:30 PM
              </p>
            </div>

            {/* Actions */}
            <div className="flex sm:flex-col gap-3 justify-end">
              <button className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
                Pay Online
              </button>
              <button className="cursor-pointer px-4 py-2 text-sm font-medium text-red-600 border border-red-500 rounded-md hover:bg-red-50 transition">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointments;
