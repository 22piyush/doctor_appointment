import express from "express";

import { allDoctorsList, appointmentsDoctor, loginDoctor } from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";


const doctorRouter = express.Router()
doctorRouter.get('/list', allDoctorsList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);

export default doctorRouter;