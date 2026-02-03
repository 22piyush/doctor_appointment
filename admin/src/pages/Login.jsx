import React, { useContext, useState } from "react";
import { assets } from "../assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";

function Login() {
  const [state, setState] = useState("Admin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);

  const onSubmitHadler = async (e) => {
    e.preventDefault();

    try {
      if (state === "Admin") {

        const {data} = await axios.post(`${backendUrl}/api/admin/login,`{email,password})
        if(data.success){
          console.log(data.token);
          
        }
      } else {
      }
    } catch (err) {}
  };

  return (
    <form
      onSubmit={onSubmitHadler}
      className="min-h-screen flex items-center justify-center bg-blue-50"
    >
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        <p className="text-2xl font-semibold text-center text-blue-600 mb-6">
          <span className="font-bold">{state}</span> Login
        </p>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600 mb-1">Email</p>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-gray-600 mb-1">Password</p>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 mb-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          {state === "Admin" ? (
            <>
              Doctor Login
              <span
                onClick={() => setState("Doctor")}
                className="ml-2 text-blue-600 font-medium cursor-pointer hover:underline hover:text-blue-700 transition"
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Admin Login
              <span
                onClick={() => setState("Admin")}
                className="ml-2 text-blue-600 font-medium cursor-pointer hover:underline hover:text-blue-700 transition"
              >
                Click here
              </span>
            </>
          )}
        </p>
      </div>
    </form>
  );
}

export default Login;
