import cloudinary from "../config/cloudinary.js";
import prisma from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "chhimwal-sweets/gallery",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
};

const getGalleryImages = asyncHandler(async (req, res) => {
  const images = await prisma.gallery.findMany({
    where: {
      active: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).json({
    success: true,
    data: images,
    message: "Gallery images fetched successfully",
  });
});

const createGalleryImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Please select an image");
  }

  const { title, category } = req.body;

  if (!title?.trim()) {
    throw new ApiError(400, "Image title is required");
  }

  if (!category?.trim()) {
    throw new ApiError(400, "Image category is required");
  }

  const uploadedImage = await uploadToCloudinary(req.file.buffer);

  const galleryImage = await prisma.gallery.create({
    data: {
      image: uploadedImage.secure_url,
      publicId: uploadedImage.public_id,
      title: title.trim(),
      category: category.trim(),
    },
  });

  return res.status(201).json({
    success: true,
    data: galleryImage,
    message: "Gallery image uploaded successfully",
  });
});

const updateGalleryImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, category } = req.body;

  const existingImage = await prisma.gallery.findUnique({
    where: { id },
  });

  if (!existingImage) {
    throw new ApiError(404, "Gallery image not found");
  }

  let imageUrl = existingImage.image;
  let publicId = existingImage.publicId;

  if (req.file) {
    const uploadedImage = await uploadToCloudinary(req.file.buffer);

    imageUrl = uploadedImage.secure_url;
    publicId = uploadedImage.public_id;

    if (existingImage.publicId) {
      try {
        await cloudinary.uploader.destroy(existingImage.publicId);
      } catch (error) {
        console.error("Old Cloudinary image deletion failed:", error);
      }
    }
  }

  const updatedImage = await prisma.gallery.update({
    where: { id },
    data: {
      image: imageUrl,
      publicId,
      ...(title?.trim() && { title: title.trim() }),
      ...(category?.trim() && { category: category.trim() }),
    },
  });

  return res.status(200).json({
    success: true,
    data: updatedImage,
    message: "Gallery image updated successfully",
  });
});

const deleteGalleryImage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingImage = await prisma.gallery.findUnique({
    where: { id },
  });

  if (!existingImage) {
    throw new ApiError(404, "Gallery image not found");
  }

  if (existingImage.publicId) {
    try {
      await cloudinary.uploader.destroy(existingImage.publicId);
    } catch (error) {
      console.error("Cloudinary image deletion failed:", error);
    }
  }

  await prisma.gallery.update({
    where: { id },
    data: {
      active: false,
    },
  });

  return res.status(200).json({
    success: true,
    data: {},
    message: "Gallery image deleted successfully",
  });
});

export {
  getGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
};