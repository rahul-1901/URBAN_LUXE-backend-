import jwt from 'jsonwebtoken';
export const userAuthentication = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(403).json({
            message: "Unauthorized, JWT toekn is required..."
        })
    }

    try {
        const decoded = jwt.verify(auth, process.env.SECRET_KEY);
        if (decoded.email) {
            req.email = decodedValue1.email
            next();
        } else {
            res.status(400).json({
                msg: "You are not authenticated!!"
            })
        }
        next();
    } catch (error) {
        return res.status(403).json({
            message: "JWT token not verified.."
        })
    }
} 