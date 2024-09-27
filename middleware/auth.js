import jwt from "jsonwebtoken";
import { user } from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
    const token = req.cookies.AuthToken || req.headers.authorization?.split(" ")[1];
    console.log("Extracted token:", token);

    if (!token) {
        return res.status(200).json({ status: false, message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Decoded token:", decoded);

        req.user = await user.findOne({ email: decoded.email.email });
        console.log("Authenticated user:", req.user);

        if (!req.user) {
            return res.status(200).json({ status: false, message: "User not found" });
        }

        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.status(200).json({ status: false, message: "Invalid or expired token" });
    }
};
