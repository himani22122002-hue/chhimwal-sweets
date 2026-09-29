import express from "express";

import {
  getAddresses,
  addAddress,
  editAddress,
  removeAddress,
} from "../controllers/addressController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getAddresses);

router.post("/", protect, addAddress);

router.put("/:id", protect, editAddress);

router.delete("/:id", protect, removeAddress);

export default router;