import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const emptyForm = {
  label: "Home",
  fullName: "",
  phone: "",
  houseNo: "",
  street: "",
  landmark: "",
  city: "",
  state: "",
  pinCode: "",
  isDefault: false,
};

const AddressBook = () => {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState(emptyForm);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/v1/addresses", {
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to fetch addresses"
        );
      }

      setAddresses(result?.data || []);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
      setError(error.message || "Unable to load addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAdd = () => {
    setEditingId(null);

    setForm({
      ...emptyForm,
      isDefault: addresses.length === 0,
    });

    setError("");
    setSuccess("");
    setShowForm(true);
  };

  const handleEdit = (address) => {
    setEditingId(address.id);

    setForm({
      label: address.label || "Home",
      fullName: address.fullName || "",
      phone: address.phone || "",
      houseNo: address.houseNo || "",
      street: address.street || "",
      landmark: address.landmark || "",
      city: address.city || "",
      state: address.state || "",
      pinCode: address.pinCode || "",
      isDefault: address.isDefault || false,
    });

    setError("");
    setSuccess("");
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const url = editingId
        ? `/api/v1/addresses/${editingId}`
        : "/api/v1/addresses";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to save address"
        );
      }

      setSuccess(
        editingId
          ? "Address updated successfully."
          : "Address added successfully."
      );

      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);

      await fetchAddresses();
    } catch (error) {
      console.error("Address save failed:", error);

      setError(
        error?.message || "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/v1/addresses/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to delete address"
        );
      }

      setSuccess("Address deleted successfully.");

      await fetchAddresses();
    } catch (error) {
      console.error("Address delete failed:", error);

      setError(
        error?.message || "Unable to delete address."
      );
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
        <p className="text-gray-500">
          Loading addresses...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Success Message */}
      {success && (
        <div className="mb-5 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Address List */}
      {!showForm && (
        <div className="grid md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-3xl shadow-lg"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-[#7B1E2B]">
                  {address.label}
                </h3>

                {address.isDefault && (
                  <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    Default
                  </span>
                )}
              </div>

              <p className="font-semibold text-gray-800">
                {address.fullName}
              </p>

              <p className="text-gray-600 mt-1">
                {address.houseNo}, {address.street}
              </p>

              {address.landmark && (
                <p className="text-gray-600">
                  {address.landmark}
                </p>
              )}

              <p className="text-gray-600">
                {address.city}, {address.state} -{" "}
                {address.pinCode}
              </p>

              <p className="text-gray-600 mt-2">
                {address.phone}
              </p>

              <div className="flex gap-4 mt-5">
                <button
                  onClick={() => handleEdit(address)}
                  className="text-sm text-[#7B1E2B] hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(address.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}

          {/* Add Address */}
          <button
            onClick={handleAdd}
            className="min-h-[220px] border-2 border-dashed border-[#7B1E2B]/30 rounded-3xl p-6 text-[#7B1E2B] hover:border-[#7B1E2B] hover:bg-[#FFF8E7] transition"
          >
            + Add New Address
          </button>
        </div>
      )}

      {/* Add / Edit Form */}
      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-3xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-[#7B1E2B] mb-6">
            {editingId ? "Edit Address" : "Add New Address"}
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Label */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Address Label
              </label>

              <select
                name="label"
                value={form.label}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#7B1E2B]"
              >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#7B1E2B]"
                placeholder="Enter full name"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Mobile Number
              </label>

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#7B1E2B]"
                placeholder="Enter mobile number"
              />
            </div>

            {/* House */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                House / Flat No.
              </label>

              <input
                type="text"
                name="houseNo"
                value={form.houseNo}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#7B1E2B]"
                placeholder="House / Flat number"
              />
            </div>

            {/* Street */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Street / Area
              </label>

              <input
                type="text"
                name="street"
                value={form.street}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#7B1E2B]"
                placeholder="Street / Area"
              />
            </div>

            {/* Landmark */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Landmark
              </label>

              <input
                type="text"
                name="landmark"
                value={form.landmark}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#7B1E2B]"
                placeholder="Nearby landmark"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                City
              </label>

              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#7B1E2B]"
                placeholder="City"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                State
              </label>

              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#7B1E2B]"
                placeholder="State"
              />
            </div>

            {/* PIN */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                PIN Code
              </label>

              <input
                type="text"
                name="pinCode"
                value={form.pinCode}
                onChange={handleChange}
                required
                maxLength={6}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#7B1E2B]"
                placeholder="6-digit PIN"
              />
            </div>
          </div>

          {/* Default Address */}
          <label className="flex items-center gap-3 mt-6 cursor-pointer">
            <input
              type="checkbox"
              name="isDefault"
              checked={form.isDefault}
              onChange={handleChange}
              className="w-4 h-4"
            />

            <span className="text-gray-700">
              Set as default address
            </span>
          </label>

          {/* Buttons */}
          <div className="flex gap-3 mt-8">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-[#7B1E2B] text-white rounded-xl hover:bg-[#7B1E2B]/90 disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : editingId
                ? "Update Address"
                : "Save Address"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="px-6 py-3 border border-[#7B1E2B] text-[#7B1E2B] rounded-xl hover:bg-[#FFF8E7] disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      )}
    </div>
  );
};

export default AddressBook;