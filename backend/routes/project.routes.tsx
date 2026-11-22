import {Router} from "express";
import authMiddleware from "../middleware/auth.middleware";
import {getProjects, createProject, updateProject, deleteProject} from "../controllers/project.controller";

const router = Router();
// Logged-in users can view projects
router.get("/", authMiddleware, getProjects);

// Only admins can add projects
router.post("/", authMiddleware, createProject);

// Only admins can update projects
router.put("/:id", authMiddleware, updateProject);

// Only admins can delete projects
router.delete("/:id", authMiddleware, deleteProject);

export default router;