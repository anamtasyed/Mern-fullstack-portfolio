import type { RequestHandler } from "express";

export const requireAdmin: RequestHandler = (
    _req, res, next
) => {
    const user = res.locals.authUser as { userId: string; role: string } | undefined;
    if (!user) {
        return res.status(401).json({
            message: "Authentication required."
        });
    }
    if (user.role !== "Admin") {
        return res.status(403).json({
            message: "Admin access required."
        });
    }
    next();
};