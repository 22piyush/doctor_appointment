import jwt from "jsonwebtoken";

const authDoctor = (req, res, next) => {
    try {
        const { dtoken } = req.headers;

        console.log(req.headers);
        
        
        if (!dtoken) {
            return res.status(401).json({
                success: false,
                message: "No token provided",
            });
        }

        // Verify token
        const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);

        console.log(decoded , "Decodeddddd");


        
        req.docId = decoded.id

         console.log( req.docId , " req.body.docIdvvvvvvvvvvvvvv");

        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export default authDoctor;
