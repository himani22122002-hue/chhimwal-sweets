import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/v1/orders`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to fetch orders"
        );
      }

      setOrders(result?.data || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);

      setError(
        error?.message || "Unable to load your orders."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-700";

      case "PROCESSING":
        return "bg-yellow-100 text-yellow-700";

      case "SHIPPED":
        return "bg-blue-100 text-blue-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatStatus = (status) => {
    if (!status) return "Pending";

    return status
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getOrderProductName = (order) => {
    const firstItem = order.orderItems?.[0];

    return (
      firstItem?.productVariant?.product?.name ||
      "Order"
    );
  };

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
        <p className="text-gray-500">
          Loading your orders...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
        <p className="text-red-600 mb-4">
          {error}
        </p>

        <button
          type="button"
          onClick={fetchOrders}
          className="px-5 py-2 bg-[#7B1E2B] text-white rounded-xl"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
        <h3 className="text-xl font-bold text-[#7B1E2B] mb-2">
          No Orders Yet
        </h3>

        <p className="text-gray-500 mb-5">
          You haven't placed any orders yet.
        </p>

        <button
          type="button"
          onClick={() => navigate("/products")}
          className="px-6 py-3 bg-[#7B1E2B] text-white rounded-xl hover:bg-[#7B1E2B]/90"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-3xl shadow-lg flex flex-col md:flex-row md:justify-between md:items-center gap-5"
        >
          <div>
            <h3 className="font-bold text-[#7B1E2B] text-lg">
              {getOrderProductName(order)}

              {order.orderItems?.length > 1 && (
                <span className="text-sm text-gray-500 ml-2">
                  +{order.orderItems.length - 1} more
                </span>
              )}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              #{order.orderNumber} •{" "}
              {formatDate(order.createdAt)}
            </p>

            <p className="font-bold text-[#D4AF37] mt-1">
              ₹{Number(order.totalAmount).toFixed(0)}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span
              className={`px-3 py-1 rounded-full text-sm ${getStatusClass(
                order.orderStatus
              )}`}
            >
              {formatStatus(order.orderStatus)}
            </span>

            <button
              type="button"
              onClick={() =>
                navigate(`/orders/${order.id}`)
              }
              className="text-[#7B1E2B] hover:underline"
            >
              View Details
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MyOrders;