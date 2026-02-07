import express from "express";

import { allDoctorsList, loginDoctor } from "../controllers/doctorController.js";


const doctorRouter = express.Router()
doctorRouter.get('/list', allDoctorsList);
doctorRouter.post("/login", loginDoctor);

export default doctorRouter;