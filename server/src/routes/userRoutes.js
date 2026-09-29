import express from "express";
import { protect, adminOnly } from "../middleware/auth.js";
import { getCustomers } from "../controllers/userController.js";

const router = express.Router();

router.get("/customers", protect, adminOnly, getCustomers);

export default router;