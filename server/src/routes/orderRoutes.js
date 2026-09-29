import express from "express";

import {
  placeOrder,
  getOrders,
  getOrder,
} from "../controllers/orderController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

// Place new order
router.post("/", protect, placeOrder);

// Get logged-in user's orders
router.get("/", protect, getOrders);

// Get single order
router.get("/:id", protect, getOrder);

export default router;