import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [state, setState] = useState("Sign Up");

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.data);
      }
    } catch (err) {
      toast.error(err || "Some error occures");
    }
  };

  const registerLoginUser = async (name, email, password) => {
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (data.success) {
          // localStorage.setItem("token", data.token);
          // setToken(data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message || "Some error occurred");
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message || "Some error occurred");
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  const value = {
    doctors,
    currencySymbol,
    state,
    setState,
    token,
    setToken,
    registerLoginUser,
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
