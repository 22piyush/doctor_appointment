import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const doctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");

  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/appointments`,
        {
          headers: { dToken },
        },
      );

      if (data.success) {
        toast.success(data.message);
        setAppointments(data.appointments);
      }
    } catch (err) {
      return toast.error(err);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/complete-appointment`,
        {
          appointmentId,
        },
        {
          headers: { dToken },
        },
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        return toast.error(data.message);
      }
    } catch (err) {
      return toast.error(err.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/cancel-appointment`,
        {
          appointmentId,
        },
        {
          headers: { dToken },
        },
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        return toast.error(data.message);
      }
    } catch (err) {
      return toast.error(err.message);
    }
  };

  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment
  };

  return (
    <doctorContext.Provider value={value}>
      {props.children}
    </doctorContext.Provider>
  );
};

export default DoctorContextProvider;
