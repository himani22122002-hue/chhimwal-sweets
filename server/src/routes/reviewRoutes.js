import express from "express";

import {
  createReview,
  getAllReviews,
  updateReviewStatus,
} from "../controllers/reviewController.js";

import {
  protect,
  adminOnly,
} from "../middleware/auth.js";

const router = express.Router();

// Customer - submit review
router.post(
  "/",
  protect,
  createReview
);

// Admin - get all reviews
router.get(
  "/",
  protect,
  adminOnly,
  getAllReviews
);

// Admin - update review status
router.patch(
  "/:id/status",
  protect,
  adminOnly,
  updateReviewStatus
);

export default router;