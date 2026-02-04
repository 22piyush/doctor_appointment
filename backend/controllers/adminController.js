import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

const addDoctor = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            speciality,
            degree,
            experience,
            about,
            fees,
            address,
        } = req.body;

        const imageFile = req.file;

        if (
            !name ||
            !email ||
            !password ||
            !speciality ||
            !degree ||
            !experience ||
            !about ||
            !fees ||
            !address
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email address",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        if (!imageFile) {
            return res.status(400).json({
                success: false,
                message: "Doctor image is required",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(
            imageFile.path,
            { resource_type: "image" }
        );

        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            image: imageUrl,
            available: true,
            date: Date.now()
        };

        const doctor = new doctorModel(doctorData);
        await doctor.save();

        res.status(201).json({
            success: true,
            message: "Doctor added successfully",
            doctor,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // Check admin credentials
        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);

            return res.status(200).json({
                success: true,
                message: "Admin login successful",
                token,
            });
        }

        // Invalid credentials
        return res.status(401).json({
            success: false,
            message: "Invalid admin credentials",
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

const allDoctors = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select('-password');
        res.json({ success: true, doctors })

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export { addDoctor, loginAdmin, allDoctors };
