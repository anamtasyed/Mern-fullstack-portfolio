import type { RequestHandler} from "express";
import jwt, {type JwtPayload} from "jsonwebtoken";

type UserRole = "Admin" | "User";

interface AuthPayload extends JwtPayload { userId: string; role: UserRole; }
const authMiddleware: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check whether the token exists
    if(!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({
            message: "Access denied. Please login first."
        });
        
    }
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET || "comp229-assignment-secret";

    try {
        const decoded = jwt.verify(token, secret);
        if(typeof decoded === "string") {
            return res.status(401).json({ message: "Invalid token." });
        }
        const payload = decoded as AuthPayload;
        if (!payload.userId || !["Admin", "User"].includes(payload.role)) {
            return res.status(401).json({ message: "Invalid token payload." });
        }
        res.locals.authUser = { userId: payload.userId, role: payload.role };
        next();
    } catch {
        return res.status(401).json({ message: "Invalid or expired token." });
    }
};
export default authMiddleware;