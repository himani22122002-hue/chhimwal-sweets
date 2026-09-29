import React, { useEffect, useState } from "react";
import {
  getOrders,
  updateOrderStatus,
} from "../../services/OrderService";
import OrderTable from "../../components/admin/OrderTable";
import OrderDetailsModal from "../../components/admin/OrderDetailsModal";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const ordersPerPage = 10;

  // ==========================================
  // LOAD REAL ORDERS
  // ==========================================
  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getOrders();

        setOrders(data);
        setFilteredOrders(data);
      } catch (err) {
        console.error("Failed to load orders:", err);
        setError(
          err?.message || "Failed to load orders"
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  // ==========================================
  // FILTER + SEARCH
  // ==========================================
  useEffect(() => {
    const searchValue = search.toLowerCase().trim();

    const result = orders.filter((order) => {
      const customerName =
        order?.user?.fullName?.toLowerCase() || "";

      const customerPhone =
        order?.user?.phone?.toLowerCase() || "";

      const orderNumber =
        order?.orderNumber?.toLowerCase() || "";

      const orderId =
        order?.id?.toLowerCase() || "";

      const status =
        order?.orderStatus || "";

      const matchesSearch =
        !searchValue ||
        customerName.includes(searchValue) ||
        customerPhone.includes(searchValue) ||
        orderNumber.includes(searchValue) ||
        orderId.includes(searchValue);

      const matchesFilter =
        filter === "All" || status === filter;

      return matchesSearch && matchesFilter;
    });

    setFilteredOrders(result);
    setCurrentPage(1);
  }, [search, filter, orders]);

  // ==========================================
  // UPDATE STATUS
  // ==========================================
  const handleStatusChange = async (id, status) => {
    try {
      const updatedOrder =
        await updateOrderStatus(id, status);

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order.id === id
            ? {
                ...order,
                orderStatus:
                  updatedOrder.orderStatus,
              }
            : order
        )
      );
    } catch (err) {
      console.error(
        "Failed to update order status:",
        err
      );

      alert(
        err?.message ||
          "Failed to update order status"
      );
    }
  };

  // ==========================================
  // PAGINATION
  // ==========================================
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const totalPages = Math.ceil(
    filteredOrders.length / ordersPerPage
  );

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg font-semibold text-[#7B1E2B]">
          Loading orders...
        </p>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================
  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow text-center">
          <p className="text-red-600 font-semibold mb-4">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-[#7B1E2B] text-white px-5 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#FFF8E7] min-h-screen">
      <h1 className="text-2xl font-bold text-[#7B1E2B] mb-6">
        Order Management
      </h1>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-[#D4AF37] rounded px-4 py-2 w-full max-w-sm"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-[#D4AF37] rounded px-4 py-2"
        >
          <option value="All">All</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="PREPARING">Preparing</option>
          <option value="OUT_FOR_DELIVERY">
            Out for Delivery
          </option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Orders */}
      <OrderTable
        orders={paginatedOrders}
        onView={setSelectedOrder}
        onStatusChange={handleStatusChange}
      />

      {/* Details */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((page) =>
                Math.max(1, page - 1)
              )
            }
            className="px-4 py-2 border rounded-lg disabled:opacity-40"
          >
            Previous
          </button>

          <span className="font-semibold text-[#7B1E2B]">
            {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((page) =>
                Math.min(totalPages, page + 1)
              )
            }
            className="px-4 py-2 border rounded-lg disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;