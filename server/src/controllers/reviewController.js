import prisma from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

export { getAllReviews };