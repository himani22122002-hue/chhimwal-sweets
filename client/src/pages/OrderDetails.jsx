import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/v1/orders/${id}`,
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
          result?.message ||
            "Failed to fetch order details"
        );
      }

      setOrder(result?.data);
    } catch (error) {
      console.error("Failed to fetch order:", error);

      setError(
        error?.message ||
          "Unable to load order details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatStatus = (status) => {
    if (!status) return "Pending";

    return status
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] py-12 px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-10 text-center">
          <p className="text-gray-500">
            Loading order details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] py-12 px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-10 text-center">
          <p className="text-red-600 mb-5">
            {error || "Order not found"}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/profile?tab=orders")
            }
            className="px-6 py-3 bg-[#7B1E2B] text-white rounded-xl"
          >
            Back to My Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8E7] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <button
          type="button"
          onClick={() =>
            navigate("/profile?tab=orders")
          }
          className="flex items-center gap-2 text-[#7B1E2B] mb-6 hover:underline"
        >
          <ArrowLeft size={18} />
          Back to My Orders
        </button>

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Package
                  size={26}
                  className="text-[#7B1E2B]"
                />

                <h1 className="text-3xl font-bold text-[#7B1E2B]">
                  Order Details
                </h1>
              </div>

              <p className="text-gray-500">
                Order #{order.orderNumber}
              </p>

              <p className="text-gray-500 text-sm mt-1">
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>

            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusClass(
                order.orderStatus
              )}`}
            >
              {formatStatus(order.orderStatus)}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold text-[#7B1E2B] mb-6">
            Ordered Items
          </h2>

          <div className="space-y-5">
            {order.orderItems?.map((item) => {
              const product =
                item.productVariant?.product;

              const price = Number(item.price);
              const quantity = Number(item.quantity);
              const itemTotal = price * quantity;

              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:justify-between gap-4 border-b border-gray-100 pb-5 last:border-b-0 last:pb-0"
                >
                  <div className="flex gap-4">
                    {product?.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-xl bg-[#FFF8E7]"
                      />
                    )}

                    <div>
                      <h3 className="font-bold text-[#7B1E2B]">
                        {product?.name || "Product"}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Variant:{" "}
                        {item.productVariant?.weight ||
                          "N/A"}
                      </p>

                      <p className="text-sm text-gray-500">
                        Quantity: {quantity}
                      </p>
                    </div>
                  </div>

                  <div className="font-bold text-[#D4AF37]">
                    ₹{itemTotal.toFixed(0)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold text-[#7B1E2B] mb-5">
            Order Summary
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>

              <span>
                ₹
                {(
                  Number(order.totalAmount) -
                  Number(order.deliveryCharge || 0) +
                  Number(order.discountApplied || 0)
                ).toFixed(0)}
              </span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Delivery Charge</span>

              <span>
                ₹
                {Number(
                  order.deliveryCharge || 0
                ).toFixed(0)}
              </span>
            </div>

            {Number(order.discountApplied || 0) > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>

                <span>
                  -₹
                  {Number(
                    order.discountApplied
                  ).toFixed(0)}
                </span>
              </div>
            )}

            <div className="border-t pt-4 flex justify-between text-lg font-bold text-[#7B1E2B]">
              <span>Total</span>

              <span>
                ₹{Number(order.totalAmount).toFixed(0)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold text-[#7B1E2B] mb-5">
            Payment Information
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <p className="text-sm text-gray-500">
                Payment Method
              </p>

              <p className="font-semibold text-gray-800">
                {order.paymentMethod === "COD"
                  ? "Cash on Delivery"
                  : order.paymentMethod}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Payment Status
              </p>

              <p className="font-semibold text-gray-800">
                {formatStatus(order.paymentStatus)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-[#7B1E2B] mb-5">
            Delivery Address
          </h2>

          <div className="text-gray-700 space-y-1">
            <p className="font-semibold">
              {order.shippingAddress?.fullName}
            </p>

            <p>
              {order.shippingAddress?.houseNo},{" "}
              {order.shippingAddress?.street}
            </p>

            {order.shippingAddress?.landmark && (
              <p>
                {order.shippingAddress.landmark}
              </p>
            )}

            <p>
              {order.shippingAddress?.city},{" "}
              {order.shippingAddress?.state} -{" "}
              {order.shippingAddress?.pinCode}
            </p>

            <p className="pt-2">
              Phone: {order.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;