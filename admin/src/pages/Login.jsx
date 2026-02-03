import React, { useState } from "react";
import { assets } from "../assets_admin/assets";

function Login() {
  const [state, setState] = useState("Admin");

  return (
    <form className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        <p className="text-2xl font-semibold text-center text-blue-600 mb-6">
          <span className="font-bold">{state}</span> Login
        </p>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600 mb-1">Email</p>
          <input
            type="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-gray-600 mb-1">Password</p>
          <input
            type="password"
            required
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
