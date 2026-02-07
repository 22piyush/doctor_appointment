import React from "react";
import { useContext } from "react";
import { doctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";

function DoctorAppointment() {
  const { getAppointments, appointments, dToken } = useContext(doctorContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return <div>DoctorAppointment</div>;
}

export default DoctorAppointment;
