import express from "express";
import { protect, adminOnly } from "../middleware/auth.js";
import { getAllReviews } from "../controllers/reviewController.js";

const router = express.Router();

router.get("/", protect, adminOnly, getAllReviews);

export default router;