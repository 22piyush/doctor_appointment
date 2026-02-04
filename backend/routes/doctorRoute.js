import express from "express";

import { allDoctorsList } from "../controllers/doctorController.js";


const doctorRouter = express.Router()
doctorRouter.get('/list', allDoctorsList);

export default doctorRouter;