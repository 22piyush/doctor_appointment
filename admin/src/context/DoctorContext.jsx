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

  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    getAppointments
  };

  return (
    <doctorContext.Provider value={value}>
      {props.children}
    </doctorContext.Provider>
  );
};

export default DoctorContextProvider;
