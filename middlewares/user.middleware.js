import jwt from 'jsonwebtoken';
export const userAuthentication = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
        return res.status(403).json({
            message: "Unauthorized, JWT toekn is required..."
        })
    }

    const jwtToken = auth.split(" ")[1];

    try {
        const decoded = jwt.verify(jwtToken, process.env.SECRET_KEY);
        if (decoded.email) {
            req.email = decoded.email
            next();
        } else {
            res.status(400).json({
                msg: "You are not authenticated!!"
            })
        }
    } catch (error) {
        return res.status(403).json({
            message: "JWT token not verified.."
        })
    }
} 