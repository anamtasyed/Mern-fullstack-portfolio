import {Router} from "express"; 
import authMiddleware from "../middleware/auth.middleware";
import {requireAdmin} from "../middleware/role.middleware";

import { getContacts, createContact, updateContact, deleteContact} from "../controllers/contact.controller";

const router = Router();
// Authenticated users can view contacts
router.get("/", authMiddleware, getContacts);

// Authenticated users can create contacts
router.post("/", authMiddleware, createContact);

// Authenticated users can update contacts
router.put("/:id", authMiddleware, updateContact);

// Authenticated users delete contacts
router.delete("/id", authMiddleware, deleteContact);

export default router;