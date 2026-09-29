import {
  createOrder,
  getMyOrders,
  getOrderById,
} from "../services/order.service.js";

const placeOrder = async (req, res) => {
  const {
    cartItems,
    shippingAddress,
    phone,
    paymentMethod,
  } = req.body;

  const order = await createOrder({
    userId: req.user.id,
    cartItems,
    shippingAddress,
    phone,
    paymentMethod,
  });

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    data: order,
  });
};

const getOrders = async (req, res) => {
  const orders = await getMyOrders(req.user.id);

  res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    data: orders,
  });
};

const getOrder = async (req, res) => {
  const order = await getOrderById(
    req.params.id,
    req.user.id
  );

  res.status(200).json({
    success: true,
    message: "Order fetched successfully",
    data: order,
  });
};

export {
  placeOrder,
  getOrders,
  getOrder,
};