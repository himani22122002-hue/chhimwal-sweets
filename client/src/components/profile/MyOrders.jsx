import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/v1/orders", {
          method: "GET",
          credentials: "include",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.message || "Failed to fetch orders");
        }

        setOrders(result?.data || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setError(error.message || "Unable to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

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

    return status.charAt(0) + status.slice(1).toLowerCase();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
        <p className="text-gray-500">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
        <p className="text-red-600 mb-4">{error}</p>

        <button
          onClick={() => window.location.reload()}
          className="bg-[#7B1E2B] text-white px-5 py-2 rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
        <h3 className="text-xl font-semibold text-[#7B1E2B] mb-2">
          No Orders Yet
        </h3>

        <p className="text-gray-500 mb-5">
          You haven't placed any orders yet.
        </p>

        <button
          onClick={() => navigate("/products")}
          className="bg-[#7B1E2B] text-white px-6 py-2 rounded-lg hover:opacity-90"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order, index) => {
        const firstItem = order.orderItems?.[0];

        const productName =
          firstItem?.productVariant?.product?.name ||
          "Product";

        const itemCount = order.orderItems?.length || 0;

        return (
          <motion.div
            key={order.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white p-6 rounded-3xl shadow-lg flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold text-[#7B1E2B]">
                {productName}
                {itemCount > 1 && (
                  <span className="text-sm text-gray-500 font-normal ml-2">
                    + {itemCount - 1} more item
                    {itemCount - 1 > 1 ? "s" : ""}
                  </span>
                )}
              </h3>

              <p className="text-sm text-gray-500">
                #{order.orderNumber} • {formatDate(order.createdAt)}
              </p>

              <p className="font-bold text-[#D4AF37]">
                ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
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
                onClick={() => navigate(`/orders/${order.id}`)}
                className="text-[#7B1E2B] hover:underline"
              >
                View Details
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default MyOrders;