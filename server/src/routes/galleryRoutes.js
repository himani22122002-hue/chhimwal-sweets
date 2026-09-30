import express from "express";
import multer from "multer";

import {
  getGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from "../controllers/galleryController.js";

import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// Public
router.get("/", getGalleryImages);

// Admin
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  createGalleryImage
);

router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"),
  updateGalleryImage
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteGalleryImage
);

export default router;