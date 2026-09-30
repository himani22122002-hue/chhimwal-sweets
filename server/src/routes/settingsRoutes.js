import express from "express";

import {
  getSettings,
  updateSettings,
} from "../controllers/settingsController.js";

import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// Customer / public
router.get("/", getSettings);

// Admin only
router.put("/", protect, adminOnly, updateSettings);

export default router;