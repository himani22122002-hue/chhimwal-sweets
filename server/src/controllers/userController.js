import prisma from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getCustomers = asyncHandler(async (req, res) => {
  const customers = await prisma.user.findMany({
    where: {
      role: "USER",
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      avatar: true,
      isVerified: true,
      createdAt: true,
      _count: {
        select: {
          orders: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCustomers = customers.map((customer) => ({
    id: customer.id,
    name: customer.fullName,
    email: customer.email,
    mobile: customer.phone,
    avatar: customer.avatar,
    isVerified: customer.isVerified,
    orders: customer._count.orders,
    date: customer.createdAt,
    status: "Active",
  }));

  res.status(200).json({
    success: true,
    data: formattedCustomers,
    message: "Customers fetched successfully",
  });
});

export { getCustomers };