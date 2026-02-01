import React, { useState } from 'react'
import { assets } from "../assets/assets_frontend/assets";

function MyProfile() {

  const [userData, setUserData] = useState({
    name:"Edward Vincent",
    image:assets.profile_pic,
    email:'skldfsdklfnskdl@gmail.com',
    phone:"+1 233 3213 43423",
    address:{
      line1:"234 sdfs sdfsd",
      line2:"234 sdfsdfb sdf"
    },
    gender:"Male",
    dob:'2202-323-3213'
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div>
      <img src={userData.image} alt="image" />

      {/* {
        isEdit ? 
      } */}
    </div>
  )
}

export default MyProfile