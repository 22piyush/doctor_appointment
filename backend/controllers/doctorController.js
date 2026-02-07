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
        console.log(req, "2222222222222222222");

        const docId = req.docId;
        console.log(docId, "Controllerr");

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


const appointmentsComplete = async (req, res) => {
    try {
        const docId = req.docId;
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.docId === docId) {

            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            res.status(200).json({
                success: true,
                message: "Appointment Completed"
            });

        } else {
            res.status(400).json({
                success: false,
                message: "Mark Failed"
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Invalid Credentials"
        });
    }
}


const appointmentCancel = async (req, res) => {
    try {
        const docId = req.docId;
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.docId === docId) {

            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            res.status(200).json({
                success: true,
                message: "Appointment Cancelled"
            });

        } else {
            res.status(400).json({
                success: false,
                message: "Cancelled Failed"
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Invalid Credentials"
        });
    }
}



const doctorDashboard = async (req, res) => {
    try {

        const docId = req.docId;

        const appointments = await appointmentModel.find({ docId });

        let earnings = 0;

        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        });

        let patients = [];

        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId);
            }
        })

        const dashData = {
            earnings,
            appointments,
            patients,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.status(200).json({
            success: true,
            dashData
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Invalid Credentials"
        });
    }
}


export { changeAvailablity, allDoctorsList, loginDoctor, appointmentsDoctor, appointmentsComplete, appointmentCancel,doctorDashboard };