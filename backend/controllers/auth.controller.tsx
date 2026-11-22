import type {Request, Response} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User";

type UserRole = "Admin" | "User";
interface MemoryUser {
    _id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    role: UserRole;
}
const memoryUsers = new Map<string, MemoryUser>();
const isDatabaseConnected = () => mongoose.connection.readyState === 1;

const generateToken = (userId: string, role: UserRole) => {
    const secret = process.env.JWT_SECRET || "comp229-assignment-secret";
    return jwt.sign({userId, role}, secret, {expiresIn: "2h"} );

};
// Register User
export const register = async (req: Request, res: Response) => {
    try {
        const {username, firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400) .json({
                message: "All fields are required. "
            });
        }
        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters."
            });
        }
        const normalizedEmail = String(email).trim().toLowerCase();
        const existingUser = isDatabaseConnected()
            ? await User.findOne({ email: normalizedEmail })
            : memoryUsers.get(normalizedEmail);
        if(existingUser) {
            return res.status(400).json({
                message: "Email is already registered."
            });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const role: UserRole = "User";
        const user = isDatabaseConnected()
            ? await User.create({
                username: String(username || `${firstName} ${lastName}`).trim(),
                firstName: String(firstName).trim(),
                lastName: String(lastName).trim(),
                email: normalizedEmail,
                password: hashedPassword,
                role
            })
            : (() => {
                const memoryUser: MemoryUser = {
                    _id: `user-${Date.now()}`,
                    username: String(username || `${firstName} ${lastName}`).trim(),
                    firstName: String(firstName).trim(),
                    lastName: String(lastName).trim(),
                    email: normalizedEmail,
                    password: hashedPassword,
                    role
                };
                memoryUsers.set(normalizedEmail, memoryUser);
                return memoryUser;
            })();
        const token = generateToken(
            user._id.toString(),
            user.role
        );
        return res.status(201).json({
            message: "Registration successful.",
            token,
            user: {
               _id: user._id.toString(),
               username: user.username,
               firstName: "firstName" in user ? user.firstName : undefined,
               lastName: "lastName" in user ? user.lastName : undefined,
               email: user.email,
               role: user.role

            }
        });

    } catch (error) {
        console.error("Signup error: ", error);
        return res.status(500).json({
            message: "Registration failed."
        });

    }
};

// SIGN IN user
export const signIn = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({
            message: "Email and password are required."
            });
        }
        const normalizedEmail = String(email).trim().toLowerCase();
        const user = isDatabaseConnected()
            ? await User.findOne({ email: normalizedEmail }).select("+password")
            : memoryUsers.get(normalizedEmail);
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }
        const passwordMatches = await bcrypt.compare(
            password, user.password
        );  
        if (!passwordMatches) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }
        const token = generateToken(
            user._id.toString(),
            user.role
        );
        return res.status(200).json({
            message: "Login successful.", token,
            user: {
                _id: user._id.toString(),
                username: user.username,
                firstName: "firstName" in user ? user.firstName : undefined,
                lastName: "lastName" in user ? user.lastName : undefined,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Signin error:", error);
        return res.status(500).json({
            message: "Login failed."
        });


    }
};
// SIGN IN USER
export const signOut = (_req: Request, res: Response) => {
    return res.status(200).json({
        message: "Signout successful. Remove the token from the client."
    });
};