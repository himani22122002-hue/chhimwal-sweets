import React, { useEffect, useState } from "react";
import CustomerTable from "../../components/admin/CustomerTable";
import CustomerDetailsModal from "../../components/admin/CustomerDetailsModal";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // LOAD REAL CUSTOMERS
  // =========================

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/v1/users/customers`,
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
            result?.message || "Failed to fetch customers"
          );
        }

        const customerData = Array.isArray(result?.data)
          ? result.data
          : [];

        setCustomers(customerData);
        setFilteredCustomers(customerData);
      } catch (err) {
        console.error("Customers loading error:", err);
        setError(
          err.message || "Failed to load customers"
        );
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  // =========================
  // SEARCH
  // =========================

  useEffect(() => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) {
      setFilteredCustomers(customers);
      return;
    }

    const filtered = customers.filter((customer) => {
      const name = String(
        customer?.name || ""
      ).toLowerCase();

      const email = String(
        customer?.email || ""
      ).toLowerCase();

      const mobile = String(
        customer?.mobile || ""
      ).toLowerCase();

      return (
        name.includes(search) ||
        email.includes(search) ||
        mobile.includes(search)
      );
    });

    setFilteredCustomers(filtered);
  }, [searchTerm, customers]);

  // =========================
  // SELECT CUSTOMER
  // =========================

  const toggleSelectCustomer = (id) => {
    setSelectedCustomers((prev) =>
      prev.includes(id)
        ? prev.filter((customerId) => customerId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const allVisibleIds = filteredCustomers.map(
      (customer) => customer.id
    );

    const allSelected =
      allVisibleIds.length > 0 &&
      allVisibleIds.every((id) =>
        selectedCustomers.includes(id)
      );

    if (allSelected) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(allVisibleIds);
    }
  };

  // =========================
  // STATUS
  // =========================
  // Backend currently has no customer status field.
  // So we don't fake database updates.

  const handleStatusChange = () => {
    alert(
      "Customer status management is not connected to the database yet."
    );
  };

  // =========================
  // DELETE
  // =========================
  // Backend currently has no customer delete API.

  const handleDelete = () => {
    alert(
      "Customer deletion is not connected to the database yet."
    );
  };

  // =========================
  // BULK ACTIONS
  // =========================

  const handleBulkStatus = () => {
    if (selectedCustomers.length === 0) {
      alert("Please select at least one customer.");
      return;
    }

    alert(
      "Bulk customer status management is not connected to the database yet."
    );
  };

  const handleBulkDelete = () => {
    if (selectedCustomers.length === 0) {
      alert("Please select at least one customer.");
      return;
    }

    alert(
      "Bulk customer deletion is not connected to the database yet."
    );
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="p-6 bg-[#FFF8E7] min-h-screen text-[#7B1E2B] flex items-center justify-center">
        <p className="text-lg font-semibold">
          Loading customers...
        </p>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="p-6 bg-[#FFF8E7] min-h-screen text-[#7B1E2B]">
        <h1 className="text-3xl font-bold mb-6">
          Customer Management
        </h1>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <p className="text-red-600 font-semibold mb-4">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-[#7B1E2B] text-white px-5 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#FFF8E7] min-h-screen text-[#7B1E2B]">
      <h1 className="text-3xl font-bold mb-6">
        Customer Management
      </h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search customers..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        className="mb-4 p-2 border border-[#D4AF37] rounded w-full max-w-md"
      />

      {/* BULK ACTIONS */}
      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={handleBulkStatus}
          className="bg-[#7B1E2B] text-[#FFF8E7] p-2 rounded"
        >
          Bulk Active
        </button>

        <button
          type="button"
          onClick={handleBulkDelete}
          className="bg-red-600 text-white p-2 rounded"
        >
          Bulk Delete
        </button>
      </div>

      {/* CUSTOMER TABLE */}
      <CustomerTable
        customers={filteredCustomers}
        onView={setSelectedCustomer}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        selectedCustomers={selectedCustomers}
        toggleSelectCustomer={toggleSelectCustomer}
        toggleSelectAll={toggleSelectAll}
      />

      {/* CUSTOMER DETAILS */}
      <CustomerDetailsModal
        customer={selectedCustomer}
        onClose={() =>
          setSelectedCustomer(null)
        }
      />
    </div>
  );
};

export default Customers;