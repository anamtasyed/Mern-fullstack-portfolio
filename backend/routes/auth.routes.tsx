import { Router } from "express";
import {register, signIn, signOut} from "../controllers/auth.controller";

const router = Router();

// Register a new user
router.post("/signup", register);
router.post("/register", register);

// Login existing user
router.post("/signin", signIn);
router.post("/login", signIn);

// Logout user
router.post("/signout", signOut);
router.post("/logout", signOut);

export default router;