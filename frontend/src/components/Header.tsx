'use client';

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";

export default function Header() {
  const { items } = useSelector((state: RootState) => state.cart);
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = items
    .reduce((sum, item) => sum + item.quantity * item.price, 0)
    .toFixed(2);

    return (
       <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-4 shadow-lg flex justify-between items-center">

      <nav className="flex gap-6 items-center text-lg">
        <Link href="/" className="hover:underline">
          Drugstores
        </Link>

        <Link href="/cart" className="relative flex items-center gap-2 hover:underline">
          <span>Cart</span>

          {/* Bubble animation for count */}
          {cartCount > 0 && (
            <motion.span
              key={cartCount} // triggers animation on change
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-red-500 text-xs text-white font-bold px-2 py-1 rounded-full absolute -top-2 -right-5"
            >
              {cartCount}
            </motion.span>
          )}

          {/* Total price */}
          {cartCount > 0 && (
            <span className="ml-8 text-sm text-gray-100">
              ${cartTotal}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}