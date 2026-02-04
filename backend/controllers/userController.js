import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";


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
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            userId: newUser._id,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export default registerUser;
