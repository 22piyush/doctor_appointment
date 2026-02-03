import React, { useContext } from "react";
import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./context/AdminContext";

function App() {
  const { aToken } = useContext(AdminContext);
  console.log(aToken);
  

  return aToken ? (
    <div className="bg-blue-50">
      <ToastContainer />

    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
}

export default App;
