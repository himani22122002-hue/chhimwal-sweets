import express from "express";

import {
  createReview,
  getProductReviews,
  getAllReviews,
  updateReviewStatus,
} from "../controllers/reviewController.js";

import {
  protect,
  adminOnly,
} from "../middleware/auth.js";

const router = express.Router();

// ==========================================
// CUSTOMER - SUBMIT REVIEW
// ==========================================
router.post(
  "/",
  protect,
  createReview
);

// ==========================================
// CUSTOMER/PUBLIC - GET APPROVED
// REVIEWS FOR A PRODUCT
// ==========================================
router.get(
  "/product/:productId",
  getProductReviews
);

// ==========================================
// ADMIN - GET ALL REVIEWS
// ==========================================
router.get(
  "/",
  protect,
  adminOnly,
  getAllReviews
);

// ==========================================
// ADMIN - UPDATE REVIEW STATUS
// ==========================================
router.patch(
  "/:id/status",
  protect,
  adminOnly,
  updateReviewStatus
);

export default router;