import React, { useContext, useEffect, useState } from "react";
import { doctorContext } from "../../context/DoctorContext";
import {
  FaDollarSign,
  FaCalendarCheck,
  FaUsers,
  FaChartLine,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarDay,
  FaUserInjured,
  FaMoneyBillWave,
  FaExclamationCircle,
  FaStethoscope
} from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function DoctorDashboard() {
  const { dashData, getDashData, dToken } = useContext(doctorContext);
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalAppointments: 0,
    totalPatients: 0,
    upcomingAppointments: 0,
    completedAppointments: 0,
    cancelledAppointments: 0,
    pendingPayments: 0
  });

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  useEffect(() => {
    if (dashData) {
      calculateStats();
    }
  }, [dashData]);

  const calculateStats = () => {
    if (!dashData) return;

    const appointments = dashData.appointments || [];
    const totalAppointments = appointments.length;
    const totalPatients = dashData.patients || 0;
    const totalEarnings = dashData.earnings || 0;

    // Calculate appointment statuses
    const upcomingAppointments = appointments.filter(app => 
      !app.cancelled && !app.isCompleted && !app.payment
    ).length;

    const completedAppointments = appointments.filter(app => 
      app.isCompleted
    ).length;

    const cancelledAppointments = appointments.filter(app => 
      app.cancelled
    ).length;

    const pendingPayments = appointments.filter(app => 
      !app.payment && !app.cancelled
    ).length;

    setStats({
      totalEarnings,
      totalAppointments,
      totalPatients,
      upcomingAppointments,
      completedAppointments,
      cancelledAppointments,
      pendingPayments
    });
  };

  // Format currency with proper handling of large numbers
  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return '$0.00';
    
    // For very large numbers, format them appropriately
    if (amount >= 1e12) {
      return `$${(amount / 1e12).toFixed(2)}T`;
    }
    if (amount >= 1e9) {
      return `$${(amount / 1e9).toFixed(2)}B`;
    }
    if (amount >= 1e6) {
      return `$${(amount / 1e6).toFixed(2)}M`;
    }
    if (amount >= 1e3) {
      return `$${(amount / 1e3).toFixed(2)}K`;
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Format date from "7_2_2026" to "Feb 7, 2026"
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const [month, day, year] = dateStr.split('_');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Sample data for charts (replace with actual data as needed)
  const weeklyAppointmentsData = [
    { day: 'Mon', appointments: 4, earnings: 1200 },
    { day: 'Tue', appointments: 3, earnings: 900 },
    { day: 'Wed', appointments: 6, earnings: 1800 },
    { day: 'Thu', appointments: 2, earnings: 600 },
    { day: 'Fri', appointments: 5, earnings: 1500 },
    { day: 'Sat', appointments: 8, earnings: 2400 },
    { day: 'Sun', appointments: 3, earnings: 900 }
  ];

  const appointmentStatusData = [
    { name: 'Upcoming', value: stats.upcomingAppointments, color: '#3B82F6' },
    { name: 'Completed', value: stats.completedAppointments, color: '#10B981' },
    { name: 'Cancelled', value: stats.cancelledAppointments, color: '#EF4444' }
  ];

  const StatCard = ({ icon: Icon, title, value, subtitle, color, iconBg, isLoading }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl border border-gray-100">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-xl ${iconBg}`}>
          <Icon className={`text-2xl ${color}`} />
        </div>
        {isLoading ? (
          <div className="animate-pulse h-4 bg-gray-200 rounded w-16"></div>
        ) : (
          <div className="text-right">
            <span className="text-xs text-gray-500">{subtitle}</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        {isLoading ? (
          <>
            <div className="animate-pulse h-7 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="animate-pulse h-4 bg-gray-200 rounded w-16"></div>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-gray-800 truncate" title={value}>
              {value}
            </h3>
            <p className="text-gray-600 text-sm mt-1 truncate">{title}</p>
          </>
        )}
      </div>
    </div>
  );

  const AppointmentCard = ({ appointment }) => {
    if (!appointment) return null;
    
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={appointment.userData?.image} 
              alt={appointment.userData?.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
            />
            <div>
              <h4 className="font-semibold text-gray-800">{appointment.userData?.name}</h4>
              <p className="text-sm text-gray-500 flex items-center">
                <FaUserInjured className="mr-1" /> Patient
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              appointment.cancelled ? 'bg-red-100 text-red-800' :
              appointment.isCompleted ? 'bg-green-100 text-green-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {appointment.cancelled ? 'Cancelled' : 
               appointment.isCompleted ? 'Completed' : 
               appointment.payment ? 'Paid' : 'Upcoming'}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {formatDate(appointment.slotDate)} • {appointment.slotTime}
            </p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
          <div>
            <p className="text-xs text-gray-500">Amount</p>
            <p className="font-semibold text-gray-800">
              {formatCurrency(appointment.amount)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Payment</p>
            <p className={`font-medium ${appointment.payment ? 'text-green-600' : 'text-yellow-600'}`}>
              {appointment.payment ? 'Paid' : 'Pending'}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Doctor Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's your practice overview.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Current Status</p>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="font-medium text-gray-700">Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={FaMoneyBillWave}
          title="Total Earnings"
          value={formatCurrency(stats.totalEarnings)}
          subtitle="Lifetime"
          color="text-green-600"
          iconBg="bg-green-50"
          isLoading={!dashData}
        />
        
        <StatCard
          icon={FaCalendarCheck}
          title="Total Appointments"
          value={stats.totalAppointments}
          subtitle="All time"
          color="text-blue-600"
          iconBg="bg-blue-50"
          isLoading={!dashData}
        />
        
        <StatCard
          icon={FaUsers}
          title="Total Patients"
          value={stats.totalPatients}
          subtitle="Unique patients"
          color="text-purple-600"
          iconBg="bg-purple-50"
          isLoading={!dashData}
        />
        
        <StatCard
          icon={FaClock}
          title="Upcoming Appointments"
          value={stats.upcomingAppointments}
          subtitle="Next 30 days"
          color="text-yellow-600"
          iconBg="bg-yellow-50"
          isLoading={!dashData}
        />
      </div>

      {/* Detailed Stats & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Appointment Status Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Appointment Status</h3>
            <FaStethoscope className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {appointmentStatusData.map((status) => (
              <div key={status.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: status.color }}
                  />
                  <span className="text-gray-700">{status.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-gray-800">{status.value}</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-500 text-sm">
                    {stats.totalAppointments > 0 
                      ? `${Math.round((status.value / stats.totalAppointments) * 100)}%` 
                      : '0%'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Pending Payments</p>
                <p className="text-xl font-bold text-gray-800">{stats.pendingPayments}</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-xl font-bold text-gray-800">
                  {stats.totalAppointments > 0 
                    ? `${Math.round((stats.completedAppointments / stats.totalAppointments) * 100)}%` 
                    : '0%'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Weekly Performance</h3>
            <FaChartLine className="text-gray-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyAppointmentsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'earnings' ? formatCurrency(value) : value,
                    name === 'earnings' ? 'Earnings' : 'Appointments'
                  ]}
                />
                <Legend />
                <Bar 
                  yAxisId="left" 
                  dataKey="appointments" 
                  name="Appointments" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]} 
                />
                <Bar 
                  yAxisId="right" 
                  dataKey="earnings" 
                  name="Earnings" 
                  fill="#10B981" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Appointments & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Appointments */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Recent Appointments</h3>
              <FaCalendarDay className="text-gray-400" />
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {dashData?.latestAppointments?.length > 0 ? (
                dashData.latestAppointments.map((appointment, index) => (
                  <AppointmentCard key={index} appointment={appointment} />
                ))
              ) : (
                <div className="text-center py-8">
                  <FaCalendarDay className="text-gray-300 text-4xl mx-auto mb-3" />
                  <p className="text-gray-500">No recent appointments</p>
                </div>
              )}
            </div>
            {dashData?.latestAppointments?.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <FaCalendarCheck className="mr-2" />
                  View All Appointments
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions & Upcoming */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                <FaCalendarCheck className="mr-2" />
                Schedule New Appointment
              </button>
              <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                <FaUsers className="mr-2" />
                View All Patients
              </button>
              <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                <FaChartLine className="mr-2" />
                View Reports
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                <FaMoneyBillWave className="mr-2" />
                Payment History
              </button>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Schedule</h3>
            <div className="space-y-3">
              {dashData?.latestAppointments?.slice(0, 3).map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <FaClock className="text-blue-600 text-sm" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{appointment.slotTime}</p>
                      <p className="text-sm text-gray-500">{appointment.userData?.name}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    appointment.isCompleted ? 'bg-green-100 text-green-800' :
                    appointment.cancelled ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {appointment.isCompleted ? 'Done' : 
                     appointment.cancelled ? 'Cancelled' : 'Upcoming'}
                  </span>
                </div>
              ))}
              {(!dashData?.latestAppointments || dashData.latestAppointments.length === 0) && (
                <div className="text-center py-4">
                  <p className="text-gray-500">No appointments today</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Average Appointment Value</p>
              <p className="text-2xl font-bold mt-1">
                {stats.totalAppointments > 0 
                  ? formatCurrency(stats.totalEarnings / stats.totalAppointments)
                  : formatCurrency(0)}
              </p>
            </div>
            <FaDollarSign className="text-3xl opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Patient Satisfaction</p>
              <p className="text-2xl font-bold mt-1">94%</p>
            </div>
            <FaCheckCircle className="text-3xl opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Next Available Slot</p>
              <p className="text-2xl font-bold mt-1">Tomorrow, 9 AM</p>
            </div>
            <FaClock className="text-3xl opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;