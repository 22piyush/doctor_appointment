import React from "react";
import { AdminContext } from "../../context/AdminContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaUserMd,
  FaCalendarCheck,
  FaDollarSign,
  FaClock,
  FaExclamationCircle,
  FaCheckCircle,
  FaCalendarAlt,
  FaChartLine,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Dashboard() {
  const { aToken, getDashData, dashData } = useContext(AdminContext);
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalUsers: 0,
    totalAppointments: 0,
    recentAppointments: 0,
    totalRevenue: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    cancelledAppointments: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  useEffect(() => {
    if (dashData) {
      calculateStats();
    }
  }, [dashData]);

  const calculateStats = () => {
    if (!dashData) return;

    const totalDoctors = dashData.doctors?.length || 0;
    const totalUsers = dashData.user?.length || 0;
    const totalAppointments = dashData.appointments?.length || 0;
    const recentAppointments = dashData.latestAppointments?.length || 0;

    // Calculate revenue (sum of all appointment amounts)
    const totalRevenue =
      dashData.appointments?.reduce((sum, appointment) => {
        return sum + (appointment.amount || 0);
      }, 0) || 0;

    // Calculate appointment statuses
    const pendingAppointments =
      dashData.appointments?.filter((app) => !app.cancelled && !app.isCompleted)
        .length || 0;

    const completedAppointments =
      dashData.appointments?.filter((app) => app.isCompleted).length || 0;

    const cancelledAppointments =
      dashData.appointments?.filter((app) => app.cancelled).length || 0;

    setStats({
      totalDoctors,
      totalUsers,
      totalAppointments,
      recentAppointments,
      totalRevenue,
      pendingAppointments,
      completedAppointments,
      cancelledAppointments,
    });
  };

  // Sample data for charts (you can replace with actual data)
  const appointmentData = [
    { name: "Mon", appointments: 4 },
    { name: "Tue", appointments: 3 },
    { name: "Wed", appointments: 6 },
    { name: "Thu", appointments: 2 },
    { name: "Fri", appointments: 5 },
    { name: "Sat", appointments: 8 },
    { name: "Sun", appointments: 3 },
  ];

  const statusData = [
    { name: "Completed", value: stats.completedAppointments },
    { name: "Pending", value: stats.pendingAppointments },
    { name: "Cancelled", value: stats.cancelledAppointments },
  ];

  const COLORS = ["#10B981", "#3B82F6", "#EF4444"];

  const StatCard = ({ icon: Icon, title, value, change, color, iconBg }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl border border-gray-100">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-lg ${iconBg}`}>
          <Icon className={`text-2xl ${color}`} />
        </div>
        <div className="text-right">
          {change && (
            <span
              className={`text-sm ${change > 0 ? "text-green-600" : "text-red-600"}`}
            >
              {change > 0 ? "↑" : "↓"} {Math.abs(change)}%
            </span>
          )}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold text-gray-800 truncate" title={value}>
          {value}
        </h3>
        <p className="text-gray-600 text-sm mt-1">{title}</p>
      </div>
    </div>
  );

  const RecentAppointmentCard = ({ appointment }) => {
    if (!appointment) return null;

    return (
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={appointment.userData?.image}
              alt={appointment.userData?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold text-gray-800">
                {appointment.userData?.name}
              </h4>
              <p className="text-sm text-gray-500">
                with Dr. {appointment.docData?.name}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                appointment.cancelled
                  ? "bg-red-100 text-red-800"
                  : appointment.isCompleted
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
              }`}
            >
              {appointment.cancelled
                ? "Cancelled"
                : appointment.isCompleted
                  ? "Completed"
                  : "Pending"}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {appointment.slotDate} • {appointment.slotTime}
            </p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
          <span className="text-gray-600 text-sm">
            {appointment.docData?.speciality}
          </span>
          <span className="font-semibold text-gray-800">
            $
            {typeof appointment.amount === "number"
              ? appointment.amount.toFixed(2)
              : "0.00"}
          </span>
        </div>
      </div>
    );
  };

  const formatCurrency = (amount) => {
    if (typeof amount !== "number") return "$0.00";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's what's happening with your clinic today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={FaUserMd}
          title="Total Doctors"
          value={stats.totalDoctors}
          change={5}
          color="text-blue-600"
          iconBg="bg-blue-50"
        />

        <StatCard
          icon={FaUsers}
          title="Total Patients"
          value={stats.totalUsers}
          change={12}
          color="text-green-600"
          iconBg="bg-green-50"
        />

        <StatCard
          icon={FaCalendarCheck}
          title="Total Appointments"
          value={stats.totalAppointments}
          change={8}
          color="text-purple-600"
          iconBg="bg-purple-50"
        />

        <StatCard
          icon={FaDollarSign}
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          change={18}
          color="text-yellow-600"
          iconBg="bg-yellow-50"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Appointments Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Appointments Overview
            </h3>
            <FaChartLine className="text-gray-400" />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appointmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="appointments"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Appointment Status
            </h3>
            <FaCalendarAlt className="text-gray-400" />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {statusData.map((status, index) => (
              <div key={status.name} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-sm text-gray-600">{status.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Appointments */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Appointments
              </h3>
              <FaClock className="text-gray-400" />
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {dashData?.latestAppointments?.length > 0 ? (
                dashData.latestAppointments.map((appointment, index) => (
                  <RecentAppointmentCard
                    key={index}
                    appointment={appointment}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <FaCalendarAlt className="text-gray-300 text-4xl mx-auto mb-3" />
                  <p className="text-gray-500">No recent appointments</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats & Actions */}
        <div className="space-y-6">
          {/* Status Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Appointment Summary
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Pending</span>
                </div>
                <span className="font-semibold text-gray-800">
                  {stats.pendingAppointments}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Completed</span>
                </div>
                <span className="font-semibold text-gray-800">
                  {stats.completedAppointments}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Cancelled</span>
                </div>
                <span className="font-semibold text-gray-800">
                  {stats.cancelledAppointments}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate("/add-doctor")}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add New Doctor
              </button>
              <button
                onClick={() => navigate("/all-appointments")}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Schedule Appointment
              </button>
              <button
                onClick={() => navigate("/doctor-list")}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                All Doctors
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
