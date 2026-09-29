import express from "express";

import {
  placeOrder,
  getOrders,
  getOrder,
  getAllAdminOrders,
  changeOrderStatus,
} from "../controllers/orderController.js";

import {
  protect,
  adminOnly,
} from "../middleware/auth.js";

const router = express.Router();

// ==========================================
// CUSTOMER - PLACE ORDER
// ==========================================
router.post("/", protect, placeOrder);

// ==========================================
// ADMIN - GET ALL ORDERS
// IMPORTANT: Must be before /:id
// ==========================================
router.get(
  "/admin/all",
  protect,
  adminOnly,
  getAllAdminOrders
);

// ==========================================
// ADMIN - UPDATE ORDER STATUS
// ==========================================
router.patch(
  "/admin/:id/status",
  protect,
  adminOnly,
  changeOrderStatus
);

// ==========================================
// CUSTOMER - GET MY ORDERS
// ==========================================
router.get("/", protect, getOrders);

// ==========================================
// CUSTOMER - GET SINGLE ORDER
// ==========================================
router.get("/:id", protect, getOrder);

export default router;