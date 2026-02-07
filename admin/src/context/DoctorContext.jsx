import { useState } from "react";
import { createContext } from "react";

export const doctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");

  const value = {
    dToken,
    setDToken,
    backendUrl,
  };

  return (
    <doctorContext.Provider value={value}>
      {props.children}
    </doctorContext.Provider>
  );
};

export default DoctorContextProvider;
