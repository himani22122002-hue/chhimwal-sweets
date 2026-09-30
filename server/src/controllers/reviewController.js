import prisma from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// ==========================================
// CREATE REVIEW - CUSTOMER
// ==========================================
const createReview = asyncHandler(async (req, res) => {
  const { productId, rating, title, comment } = req.body;

  if (!productId) {
    throw new ApiError(400, "Product is required");
  }

  if (
    !rating ||
    Number(rating) < 1 ||
    Number(rating) > 5
  ) {
    throw new ApiError(
      400,
      "Rating must be between 1 and 5"
    );
  }

  if (!title?.trim()) {
    throw new ApiError(
      400,
      "Review title is required"
    );
  }

  if (!comment?.trim()) {
    throw new ApiError(
      400,
      "Review comment is required"
    );
  }

  // ------------------------------------------
  // Check product
  // ------------------------------------------
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new ApiError(
      404,
      "Product not found"
    );
  }

  // ------------------------------------------
  // Check duplicate review
  // ------------------------------------------
  const existingReview =
    await prisma.review.findFirst({
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

  // ------------------------------------------
  // Create review
  // ------------------------------------------
  const review = await prisma.review.create({
    data: {
      userId: req.user.id,
      productId,
      rating: Number(rating),
      title: title.trim(),
      comment: comment.trim(),

      // New reviews always start as pending
      status: "PENDING",
    },

    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
          avatar: true,
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

// ==========================================
// GET APPROVED REVIEWS FOR A PRODUCT
// CUSTOMER / PUBLIC
// ==========================================
const getProductReviews = asyncHandler(
  async (req, res) => {
    const { productId } = req.params;

    if (!productId) {
      throw new ApiError(
        400,
        "Product is required"
      );
    }

    // Check product exists
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        id: true,
      },
    });

    if (!product) {
      throw new ApiError(
        404,
        "Product not found"
      );
    }

    // Only APPROVED reviews are public
    const reviews =
      await prisma.review.findMany({
        where: {
          productId,
          status: "APPROVED",
        },

        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              avatar: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    const formattedReviews =
      reviews.map((review) => ({
        id: review.id,

        name:
          review.user?.fullName ||
          "Customer",

        avatar:
          review.user?.avatar || null,

        rating: review.rating,

        title: review.title,

        message: review.comment,

        date: review.createdAt,

        status: "APPROVED",
      }));

    res.status(200).json({
      success: true,
      data: formattedReviews,
      message:
        "Product reviews fetched successfully",
    });
  }
);

// ==========================================
// GET ALL REVIEWS - ADMIN
// ==========================================
const getAllReviews = asyncHandler(
  async (req, res) => {
    const reviews =
      await prisma.review.findMany({
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
              avatar: true,
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

    const formattedReviews =
      reviews.map((review) => ({
        id: review.id,

        customer:
          review.user?.fullName ||
          "Customer",

        customerId: review.userId,

        product:
          review.product?.name ||
          "Product",

        productId: review.productId,

        rating: review.rating,

        title: review.title,

        message: review.comment,

        /*
         * Prisma/database status:
         *
         * PENDING
         * APPROVED
         * REJECTED
         *
         * Admin UI:
         *
         * PENDING
         * APPROVED
         * HIDDEN
         */
        status:
          review.status === "REJECTED"
            ? "HIDDEN"
            : review.status,

        date: review.createdAt,
      }));

    res.status(200).json({
      success: true,
      data: formattedReviews,
      message:
        "Reviews fetched successfully",
    });
  }
);

// ==========================================
// UPDATE REVIEW STATUS - ADMIN
// ==========================================
const updateReviewStatus = asyncHandler(
  async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    /*
     * Frontend accepts:
     *
     * PENDING
     * APPROVED
     * HIDDEN
     *
     * Database supports:
     *
     * PENDING
     * APPROVED
     * REJECTED
     */

    const allowedStatuses = [
      "PENDING",
      "APPROVED",
      "HIDDEN",
    ];

    if (!allowedStatuses.includes(status)) {
      throw new ApiError(
        400,
        "Invalid review status"
      );
    }

    // ------------------------------------------
    // Find review
    // ------------------------------------------
    const review =
      await prisma.review.findUnique({
        where: {
          id,
        },
      });

    if (!review) {
      throw new ApiError(
        404,
        "Review not found"
      );
    }

    // ------------------------------------------
    // Convert frontend status to DB status
    // ------------------------------------------
    const databaseStatus =
      status === "HIDDEN"
        ? "REJECTED"
        : status;

    // ------------------------------------------
    // Update review
    // ------------------------------------------
    const updatedReview =
      await prisma.review.update({
        where: {
          id,
        },

        data: {
          status: databaseStatus,
        },

        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
              avatar: true,
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

    // ------------------------------------------
    // Convert DB status back for frontend
    // ------------------------------------------
    const frontendStatus =
      updatedReview.status === "REJECTED"
        ? "HIDDEN"
        : updatedReview.status;

    res.status(200).json({
      success: true,

      message:
        frontendStatus === "APPROVED"
          ? "Review approved successfully"
          : frontendStatus === "HIDDEN"
          ? "Review hidden successfully"
          : "Review status updated successfully",

      data: {
        id: updatedReview.id,

        customer:
          updatedReview.user?.fullName ||
          "Customer",

        customerId:
          updatedReview.userId,

        product:
          updatedReview.product?.name ||
          "Product",

        productId:
          updatedReview.productId,

        rating: updatedReview.rating,

        title: updatedReview.title,

        message: updatedReview.comment,

        status: frontendStatus,

        date: updatedReview.createdAt,
      },
    });
  }
);

// ==========================================
// EXPORTS
// ==========================================
export {
  createReview,
  getProductReviews,
  getAllReviews,
  updateReviewStatus,
};