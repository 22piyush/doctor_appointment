import jwt from "jsonwebtoken";

const authDoctor = (req, res, next) => {
    try {
        const { dtoken } = req.headers;
        if (!dtoken) {
            return res.status(401).json({
                success: false,
                message: "No token provided",
            });
        }

        // Verify token
        const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
        req.body.docId = decoded.id
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export default authDoctor;
