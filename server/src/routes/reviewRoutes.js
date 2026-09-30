import express from "express";

import {
  createReview,
  getAllReviews,
} from "../controllers/reviewController.js";

import {
  protect,
  adminOnly,
} from "../middleware/auth.js";

const router = express.Router();

// Customer - submit review
router.post("/", protect, createReview);

// Admin - get all reviews
router.get(
  "/",
  protect,
  adminOnly,
  getAllReviews
);

export default router;