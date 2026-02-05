import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
    try {
        console.log(req.headers, "0000000000000");

        const { token } = req.headers;
        console.log(token, "111111111");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided",
            });
        }

        // Verify token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        console.log(token_decode, "333333333333333");

        req.userId = token_decode.id;

        console.log(req.userId, "44444444444444444444");

        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export default authUser;
