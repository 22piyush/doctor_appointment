import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
    try {
        const {atoken} = req.headers;
        if (!atoken) {
            return res.status(401).json({
                success: false,
                message: "No token provided",
            });
        }

        // Verify token
        const decoded = jwt.verify(atoken, process.env.JWT_SECRET);

        if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({
                success: false,
                message: "NOT AUthorised",
            });
        }

        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export default authAdmin;
