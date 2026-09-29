import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from "../services/order.service.js";

// ==========================================
// CUSTOMER - PLACE ORDER
// ==========================================
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

// ==========================================
// CUSTOMER - GET MY ORDERS
// ==========================================
const getOrders = async (req, res) => {
  const orders = await getMyOrders(req.user.id);

  res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    data: orders,
  });
};

// ==========================================
// CUSTOMER - GET SINGLE ORDER
// ==========================================
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

// ==========================================
// ADMIN - GET ALL ORDERS
// ==========================================
const getAllAdminOrders = async (req, res) => {
  const orders = await getAllOrders();

  res.status(200).json({
    success: true,
    message: "All orders fetched successfully",
    data: orders,
  });
};

// ==========================================
// ADMIN - UPDATE ORDER STATUS
// ==========================================
const changeOrderStatus = async (req, res) => {
  const { status } = req.body;

  const order = await updateOrderStatus(
    req.params.id,
    status
  );

  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    data: order,
  });
};

export {
  placeOrder,
  getOrders,
  getOrder,
  getAllAdminOrders,
  changeOrderStatus,
};