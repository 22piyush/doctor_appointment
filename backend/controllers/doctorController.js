import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointModel.js";

const changeAvailablity = async (req, res) => {
    try {
        const { docId, available } = req.body;

        if (!docId) {
            return res.status(400).json({
                success: false,
                message: "Doctor ID is required",
            });
        }

        const doctor = await doctorModel.findByIdAndUpdate(
            docId,
            { available: Boolean(available) },
            { new: true } // returns updated document
        );

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Availability updated successfully",
            doctor,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }

}

const allDoctorsList = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select(['-password', '-email']);
        res.status(200).json({
            success: true,
            data: doctors,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const loginDoctor = async (req, res) => {
    try {

        const { email, password } = req.body
        const doctor = await doctorModel.findOne({ email });

        if (!doctor) {
            res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const isMatched = await bcrypt.compare(password, doctor.password)

        if (isMatched) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
            res.status(200).json({
                success: true,
                token
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}


const appointmentsDoctor = async (req, res) => {
    try {

        const { docId } = req.body;
        const appointments = await appointmentModel.find({ docId })

        res.status(200).json({
            success: true,
            appointments
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid Credentials"
        });
    }
}


export { changeAvailablity, allDoctorsList, loginDoctor, appointmentsDoctor };