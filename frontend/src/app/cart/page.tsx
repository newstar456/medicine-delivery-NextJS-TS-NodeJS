'use client';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { removeFromCart, updateQuantity, clearCart } from "@/store/slices/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { createOrder } from "@/store/api/orders";
import axios from "axios";
import { useState } from "react";

export default function CartPage() {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  if (items.length === 0) {
    return <p className="text-center mt-10 text-gray-600">🛒 Your cart is empty</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await createOrder({
        email,
        phone,
        address,
        items: items.map((i) => ({ id: i.medicineId, quantity: i.quantity })),
      });

      dispatch(clearCart());
      setSuccess("✅ Order submitted successfully!");
      setEmail("");
      setPhone("");
      setAddress("");
    } catch (err) {
      setError("❌ Failed to submit order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return <p className="text-center mt-10 text-gray-600">🛒 Your cart is empty</p>;
  }

 
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg mt-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      <ul className="space-y-4">
        <AnimatePresence>
          {items.map((item) => (
            <motion.li
              key={item.medicineId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    dispatch(updateQuantity({ medicineId: item.medicineId, quantity: Number(e.target.value) }))
                  }
                  className="w-16 text-center border rounded"
                />
                <button
                  onClick={() => dispatch(removeFromCart(item.medicineId))}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                >
                  ✕
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <div className="flex justify-between mt-6 text-lg font-semibold">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>

 <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-lg font-semibold"
        >
          {loading ? "Submitting..." : "✅ Submit Order"}
        </button>
      </form>

      {success && <p className="mt-4 text-green-600">{success}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}