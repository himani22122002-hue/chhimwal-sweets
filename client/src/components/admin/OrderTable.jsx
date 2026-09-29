import React from "react";
import { motion } from "framer-motion";

const STATUS_OPTIONS = [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

const STATUS_STYLES = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PROCESSING: "bg-purple-100 text-purple-800",
  SHIPPED: "bg-blue-100 text-blue-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const STATUS_LABELS = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

const OrderTable = ({
  orders = [],
  onView,
  onStatusChange,
}) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#D4AF37]">
      <table className="w-full text-sm text-left">

        {/* TABLE HEADER */}
        <thead className="text-xs uppercase bg-[#7B1E2B] text-[#FFF8E7]">
          <tr>
            <th className="px-4 py-3">Order ID</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Items</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody className="bg-[#FFF8E7]">

          {orders.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                className="px-4 py-8 text-center text-gray-500"
              >
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order) => {

              const customerName =
                order.user?.fullName || "Guest";

              const customerPhone =
                order.user?.phone ||
                order.phone ||
                "N/A";

              const itemCount =
                order.orderItems?.reduce(
                  (total, item) =>
                    total + Number(item.quantity || 0),
                  0
                ) || 0;

              const totalAmount =
                Number(order.totalAmount || 0);

              const status =
                order.orderStatus || "PENDING";

              return (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-[#D4AF37]/20 hover:bg-[#D4AF37]/10"
                >

                  {/* ORDER ID */}
                  <td className="px-4 py-3 font-medium text-[#7B1E2B]">
                    {order.orderNumber || order.id}
                  </td>

                  {/* CUSTOMER */}
                  <td className="px-4 py-3 font-medium">
                    {customerName}
                  </td>

                  {/* PHONE */}
                  <td className="px-4 py-3">
                    {customerPhone}
                  </td>

                  {/* ITEMS */}
                  <td className="px-4 py-3">
                    {itemCount}
                  </td>

                  {/* TOTAL */}
                  <td className="px-4 py-3 font-semibold">
                    ₹{totalAmount.toFixed(2)}
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        STATUS_STYLES[status] ||
                        "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {STATUS_LABELS[status] || status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">

                      {/* VIEW */}
                      <button
                        type="button"
                        onClick={() => onView(order)}
                        className="text-[#7B1E2B] font-medium hover:text-[#D4AF37]"
                      >
                        View
                      </button>

                      {/* STATUS DROPDOWN */}
                      <select
                        value={status}
                        onChange={(e) =>
                          onStatusChange(
                            order.id,
                            e.target.value
                          )
                        }
                        className="text-xs bg-white border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                      >
                        {STATUS_OPTIONS.map(
                          (statusOption) => (
                            <option
                              key={statusOption}
                              value={statusOption}
                            >
                              {STATUS_LABELS[statusOption]}
                            </option>
                          )
                        )}
                      </select>

                    </div>
                  </td>

                </motion.tr>
              );
            })
          )}

        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;