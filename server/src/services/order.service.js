import prisma from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";

const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(1000 + Math.random() * 9000);

  return `CS${timestamp}${random}`;
};

// ==========================================
// CREATE ORDER - CUSTOMER
// ==========================================
const createOrder = async ({
  userId,
  cartItems,
  shippingAddress,
  phone,
  paymentMethod = "COD",
}) => {
  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  if (!cartItems || cartItems.length === 0) {
    throw new ApiError(400, "Cart is empty");
  }

  if (!shippingAddress) {
    throw new ApiError(400, "Shipping address is required");
  }

  if (!phone) {
    throw new ApiError(400, "Phone number is required");
  }

  if (paymentMethod !== "COD") {
    throw new ApiError(400, "Only Cash on Delivery is available");
  }

  const variantIds = cartItems.map((item) => item.variantId);

  const variants = await prisma.productVariant.findMany({
    where: {
      id: {
        in: variantIds,
      },
    },
    include: {
      product: true,
    },
  });

  if (variants.length !== variantIds.length) {
    throw new ApiError(
      400,
      "One or more products are no longer available"
    );
  }

  let totalAmount = 0;
  const orderItemsData = [];

  for (const cartItem of cartItems) {
    const variant = variants.find(
      (item) => item.id === cartItem.variantId
    );

    if (!variant) {
      throw new ApiError(400, "Product variant not found");
    }

    const quantity = Number(cartItem.quantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new ApiError(400, "Invalid product quantity");
    }

    if (variant.stock < quantity) {
      throw new ApiError(
        400,
        `${variant.product.name} has only ${variant.stock} items in stock`
      );
    }

    const price = Number(
      variant.discountedPrice ?? variant.price
    );

    totalAmount += price * quantity;

    orderItemsData.push({
      productVariantId: variant.id,
      quantity,
      price,
    });
  }

  const orderNumber = generateOrderNumber();

  const order = await prisma.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        orderNumber,
        totalAmount,
        deliveryCharge: 0,
        discountApplied: 0,
        paymentMethod: "COD",
        paymentStatus: "PENDING",
        orderStatus: "PENDING",
        shippingAddress,
        phone,
        userId,
        orderItems: {
          create: orderItemsData,
        },
      },
      include: {
        orderItems: {
          include: {
            productVariant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    for (const cartItem of cartItems) {
      await tx.productVariant.update({
        where: {
          id: cartItem.variantId,
        },
        data: {
          stock: {
            decrement: Number(cartItem.quantity),
          },
        },
      });
    }

    return createdOrder;
  });

  return order;
};

// ==========================================
// GET MY ORDERS - CUSTOMER
// ==========================================
const getMyOrders = async (userId) => {
  return prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      orderItems: {
        include: {
          productVariant: {
            include: {
              product: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// ==========================================
// GET SINGLE ORDER - CUSTOMER
// ==========================================
const getOrderById = async (orderId, userId) => {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId,
    },
    include: {
      orderItems: {
        include: {
          productVariant: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return order;
};

// ==========================================
// GET ALL ORDERS - ADMIN
// ==========================================
const getAllOrders = async () => {
  return prisma.order.findMany({
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
        },
      },
      orderItems: {
        include: {
          productVariant: {
            include: {
              product: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// ==========================================
// UPDATE ORDER STATUS - ADMIN
// ==========================================
const updateOrderStatus = async (orderId, status) => {
  const validStatuses = [
    "PENDING",
    "CONFIRMED",
    "PREPARING",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED",
  ];

  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid order status");
  }

  const existingOrder = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!existingOrder) {
    throw new ApiError(404, "Order not found");
  }

  return prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      orderStatus: status,
    },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
        },
      },
      orderItems: {
        include: {
          productVariant: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });
};

export {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};