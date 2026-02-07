import express from "express";

import { allDoctorsList, appointmentCancel, appointmentsComplete, appointmentsDoctor, doctorDashboard, doctorProfile, loginDoctor, updateDoctorProfile } from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";


const doctorRouter = express.Router()
doctorRouter.get('/list', allDoctorsList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);
doctorRouter.post("/complete-appointment", authDoctor, appointmentsComplete);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);

doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);
doctorRouter.get("/profile", authDoctor, doctorProfile);
export default doctorRouter;