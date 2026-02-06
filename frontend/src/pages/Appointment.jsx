import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

function Appointment() {
  const { docId } = useParams();

  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THUS", "FRI", "SAT"];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(1);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = () => {
    const today = new Date();
    const days = [];

    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(today);
      dayDate.setDate(today.getDate() + i);

      const slotDate = `${dayDate.getDate()}_${dayDate.getMonth() + 1}_${dayDate.getFullYear()}`;

      let currentTime = new Date(dayDate);
      const endTime = new Date(dayDate);
      endTime.setHours(21, 0, 0, 0);

      // start time logic
      if (today.toDateString() === dayDate.toDateString()) {
        const now = new Date();
        currentTime.setHours(Math.max(now.getHours(), 10));
        currentTime.setMinutes(now.getMinutes() < 30 ? 30 : 0);
      } else {
        currentTime.setHours(10, 0, 0, 0);
      }

      const slots = [];

      while (currentTime < endTime) {
        const timeString = currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // 🔥 ONLY THIS CHECK MATTERS
        const isBooked = docInfo?.slots_booked?.[slotDate]?.includes(slotTime);

        if (!isBooked) {
          slots.push({
            datetime: new Date(currentTime),
            time: timeString,
          });
        }

        currentTime.setMinutes(currentTime.getMinutes() + 30);
      }

      days.push({ date: dayDate, slots });
    }

    setDocSlots(days);

    // auto select first available slot
    const firstDay = days.findIndex((d) => d.slots.length > 0);
    if (firstDay !== -1) {
      setSlotIndex(firstDay);
      setSlotTime(days[firstDay].slots[0]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (!slotTime) {
      toast.error("Please select a time slot");
      return;
    }

    try {
      const date = slotTime.datetime;

      const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        {
          docId,
          slotDate,
          slotTime: slotTime.time, // send clean value
        },
        {
          headers: { token },
        },
      );

      if (data.success) {
        toast.success(data.message || "Appointment booked successfully");
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message || "Booking failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
    console.log(docSlots);
  }, [docInfo]);

  return (
    docInfo && (
      <div>
        {/* Doctors Details  */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-[#5F6FFF] w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt="image"
            />
          </div>

          <div className="flex-1 border border-gary-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* Doc Info */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}{" "}
              <img
                className="w-5"
                src={assets.verified_icon}
                alt="verified_icon"
              />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            {/* ------------------- Doctor About ------------------ */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="info_icon" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>

            <p className="text-gray-500 font-medium mt-4">
              Appointment Fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slots  */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.map((day, index) => {
              const hasSlots = day.slots.length > 0;

              return (
                <div
                  key={index}
                  onClick={() => hasSlots && setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer
          ${slotIndex === index ? "bg-[#5F6FFF] text-white" : "border border-gray-200"}
          ${!hasSlots && "opacity-40 cursor-not-allowed"}
        `}
                >
                  <p>{daysOfWeek[day.date.getDay()]}</p>
                  <p>{day.date.getDate()}</p>
                  {!hasSlots && <p className="text-xs">No slots</p>}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-4 gap-3 mt-4">
            {docSlots.length > 0 &&
              docSlots[slotIndex]?.slots.map((item, index) => (
                <p
                  key={index}
                  onClick={() => setSlotTime(item)}
                  className={`text-center text-sm py-2 rounded-md cursor-pointer border
          ${
            slotTime?.time === item.time
              ? "bg-[#5F6FFF] text-white"
              : "border-gray-300 hover:bg-gray-100"
          }
        `}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          <button
            onClick={bookAppointment}
            className="bg-[#5F6FFF] text-white text-sm font-light px-14 py-3 rounded-full my-6"
          >
            Book an appointment
          </button>
        </div>

        {/* Listing Related Doctors  */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
}

export default Appointment;
