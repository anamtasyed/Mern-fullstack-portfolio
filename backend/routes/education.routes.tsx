import {Router} from "express";
import authMiddleware from "../middleware/auth.middleware";
import {getEducations, createEducation, updateEducation, deleteEducation} from "../controllers/education.controller";

const router = Router();
// Logged-in users can view education records
router.get("/", authMiddleware, getEducations);

// Only admins can add education records
router.post("/", authMiddleware, createEducation);

// Only admins can update education records
router.put("/:id", authMiddleware, updateEducation);

// Only admins can delete education records
router.delete("/:id", authMiddleware, deleteEducation);

export default router;