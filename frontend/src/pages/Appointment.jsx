import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";

function Appointment() {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  return (
    docInfo && (
      <div>
        {/* Doctors Details  */}
        <div>
          <div>
            <img src={docInfo.image} alt="image" />
          </div>

          <div>
            {/* Doc Info */}
            <p>{docInfo.name} <img src={assets.verified_icon} alt="verified_icon" /></p>
            <div>
              <p>{docInfo.degree} - {docInfo.speciality}</p>
              <button>{docInfo.experience}</button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Appointment;
