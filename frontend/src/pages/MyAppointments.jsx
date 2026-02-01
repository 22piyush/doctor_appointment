import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

function MyAppointments() {
  const { doctors } = useContext(AppContext);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointments
      </p>
      <div>
        {doctors.slice(0, 2).map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img src={item.image} alt={`image_${index}`} />
            </div>
            <div>
              <p>{item.name}</p>
              <p>{item.speciality}</p>
              <p>Address:</p>
              <p>{item.address.line1}</p>
              <p>{item.address.line2}</p>
              <p>
                <span>Date & Time:</span>23, july, 2025| 8:30 PM
              </p>
            </div>
            <div></div>
            <div>
              <button>Pay Online</button>
              <button>Cancel appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointments;
