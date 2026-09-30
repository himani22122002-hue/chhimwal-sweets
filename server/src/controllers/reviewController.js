import prisma from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// ==================== CREATE REVIEW ====================

const createReview = asyncHandler(async (req, res) => {
  const { productId, rating, title, comment } = req.body;

  if (!productId) {
    throw new ApiError(400, "Product is required");
  }

  if (!rating || Number(rating) < 1 || Number(rating) > 5) {
    throw new ApiError(400, "Rating must be between 1 and 5");
  }

  if (!title?.trim()) {
    throw new ApiError(400, "Review title is required");
  }

  if (!comment?.trim()) {
    throw new ApiError(400, "Review comment is required");
  }

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const existingReview = await prisma.review.findFirst({
    where: {
      userId: req.user.id,
      productId,
    },
  });

  if (existingReview) {
    throw new ApiError(
      400,
      "You have already reviewed this product"
    );
  }

  const review = await prisma.review.create({
    data: {
      userId: req.user.id,
      productId,
      rating: Number(rating),
      title: title.trim(),
      comment: comment.trim(),
      status: "PENDING",
    },

    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  res.status(201).json({
    success: true,
    message: "Review submitted successfully",
    data: review,
  });
});

// ==================== GET ALL REVIEWS - ADMIN ====================

const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await prisma.review.findMany({
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },

      product: {
        select: {
          id: true,
          name: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedReviews = reviews.map((review) => ({
    id: review.id,
    customer: review.user?.fullName || "Customer",
    customerId: review.userId,
    product: review.product?.name || "Product",
    productId: review.productId,
    rating: review.rating,
    title: review.title,
    message: review.comment,
    status: review.status,
    date: review.createdAt,
  }));

  res.status(200).json({
    success: true,
    data: formattedReviews,
    message: "Reviews fetched successfully",
  });
});

export {
  createReview,
  getAllReviews,
};