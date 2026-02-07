import { useContext } from "react";
import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorList from "./pages/Admin/DoctorList";
import { doctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

function App() {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(doctorContext);

  // Not logged in
  if (!aToken && !dToken) {
    return (
      <>
        <Login />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="bg-blue-50 min-h-screen">
      <ToastContainer />
      <Navbar />

      <div className="flex items-start">
        <Sidebar />

        <Routes>
          {/* DEFAULT REDIRECT */}
          <Route
            path="/"
            element={
              aToken ? (
                <Navigate to="/admin-dashboard" replace />
              ) : (
                <Navigate to="/doctor-dashboard" replace />
              )
            }
          />

          {/* ADMIN ROUTES */}
          {aToken && (
            <>
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/all-appointments" element={<AllAppointments />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/doctor-list" element={<DoctorList />} />
            </>
          )}

          {/* DOCTOR ROUTES */}
          {dToken && (
            <>
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route
                path="/doctor-appointments"
                element={<DoctorAppointment />}
              />
              <Route path="/doctor-profile" element={<DoctorProfile />} />
            </>
          )}

          {/* FALLBACK */}
          <Route
            path="*"
            element={
              <Navigate
                to={aToken ? "/admin-dashboard" : "/doctor-dashboard"}
                replace
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

