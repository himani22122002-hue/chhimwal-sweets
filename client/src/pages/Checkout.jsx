import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    houseNo: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const orderItems = cartItems.map((item) => ({
        variantId: item.variant.id,
        quantity: Number(item.quantity),
      }));

      const shippingAddress = {
        fullName: formData.fullName,
        houseNo: formData.houseNo,
        street: formData.street,
        landmark: formData.landmark,
        city: formData.city,
        state: formData.state,
        pinCode: formData.pinCode,
      };

      const response = await fetch("/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          cartItems: orderItems,
          shippingAddress,
          phone: formData.mobile,
          paymentMethod: "COD",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to place order"
        );
      }

      // Clear cart only after successful order
      clearCart();

      // Store order temporarily for success page
      localStorage.setItem(
        "lastOrder",
        JSON.stringify(result.data)
      );

      navigate("/order-success");
    } catch (err) {
      console.error("Order placement failed:", err);
      setError(
        err.message || "Something went wrong while placing your order."
      );
    } finally {
      setLoading(false);
    }
  };

  const deliveryCharge = 0;
  const grandTotal = subtotal + deliveryCharge;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-[#FFF8E7]">
      <h1 className="text-3xl font-bold text-[#7B1E2B] mb-8">
        Checkout
      </h1>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Customer + Address */}
        <div className="lg:col-span-2 space-y-6">

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-[#7B1E2B] mb-4">
              Customer Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="p-3 rounded-lg border border-gray-200"
              />

              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                required
                value={formData.mobile}
                onChange={handleChange}
                className="p-3 rounded-lg border border-gray-200"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleChange}
                className="p-3 rounded-lg border border-gray-200 col-span-1 sm:col-span-2"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-[#7B1E2B] mb-4">
              Delivery Address
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="houseNo"
                placeholder="House/Flat No."
                required
                value={formData.houseNo}
                onChange={handleChange}
                className="p-3 rounded-lg border border-gray-200"
              />

              <input
                type="text"
                name="street"
                placeholder="Street / Area"
                required
                value={formData.street}
                onChange={handleChange}
                className="p-3 rounded-lg border border-gray-200"
              />

              <input
                type="text"
                name="landmark"
                placeholder="Landmark (Optional)"
                value={formData.landmark}
                onChange={handleChange}
                className="p-3 rounded-lg border border-gray-200 col-span-1 sm:col-span-2"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                required
                value={formData.city}
                onChange={handleChange}
                className="p-3 rounded-lg border border-gray-200"
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                required
                value={formData.state}
                onChange={handleChange}
                className="p-3 rounded-lg border border-gray-200"
              />

              <input
                type="text"
                name="pinCode"
                placeholder="PIN Code"
                required
                value={formData.pinCode}
                onChange={handleChange}
                className="p-3 rounded-lg border border-gray-200"
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">

            <h2 className="text-xl font-bold text-[#7B1E2B] mb-4">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.variant.weight}`}
                  className="flex justify-between text-sm gap-4"
                >
                  <span>
                    {item.name} ({item.variant.weight}) ×{" "}
                    {item.quantity}
                  </span>

                  <span className="font-medium text-[#7B1E2B] whitespace-nowrap">
                    ₹
                    {Number(item.variant.price) *
                      Number(item.quantity)}
                  </span>
                </div>
              ))}

              <div className="border-t pt-4 space-y-2">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    ₹{subtotal}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-medium text-green-600">
                    FREE
                  </span>
                </div>

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>

                  <span className="text-[#7B1E2B]">
                    ₹{grandTotal}
                  </span>
                </div>

              </div>
            </div>

            {/* Payment */}
            <div className="bg-[#FFF8E7] p-4 rounded-lg mb-6 border border-[#D4AF37]/20">
              <label className="flex items-center gap-3 font-semibold text-[#7B1E2B]">
                <input
                  type="radio"
                  checked
                  readOnly
                  className="accent-[#7B1E2B]"
                />

                Cash on Delivery (COD)
              </label>

              <p className="text-xs text-gray-500 mt-2">
                Currently we accept Cash on Delivery only.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7B1E2B] text-white py-3 rounded-lg font-bold hover:bg-[#5a1620] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>

          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;