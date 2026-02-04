import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
    try {
        console.log(req.headers);

        const {aToken} = req.headers;

        if (!aToken) {
            return res.status(401).json({
                success: false,
                message: "No token provided",
            });
        }

        // Verify token
        const decoded = jwt.verify(aToken, process.env.JWT_SECRET);

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
