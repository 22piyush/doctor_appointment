import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import { v2 as cloudinary } from 'cloudinary';


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        /* ------------------ validations ------------------ */
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }

        // password length
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long",
            });
        }

        /* ------------------ check existing user ------------------ */
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        /* ------------------ hash password ------------------ */
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        /* ------------------ save user ------------------ */
        const userData = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET)

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token: token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

const getProfile = async (req, res) => {

    try {
        const userId = req.userId;
        const userData = await userModel.findById(userId).select('-password')
        res.status(200).json({
            success: true,
            userData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }

};

const updateProfile = async (req, res) => {
    try {
        const {name, phone, address, dob, gender } = req.body;
        const userId = req.userId;
        const imageFile = req.file;

        if (!name || !phone || !address || !dob || !gender) {
            return res.status(400).json({
                success: false,
                message: "Data Missing",
            });
        }

        const parsedAddress = JSON.parse(address);

        await userModel.findByIdAndUpdate(
            userId,
            { name, phone, address: parsedAddress, dob, gender },
            { new: true }
        );

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(
                imageFile.path,
                { resource_type: "image" }
            );

            await userModel.findByIdAndUpdate(userId, {
                image: imageUpload.secure_url,
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


export { registerUser, loginUser, getProfile, updateProfile };
