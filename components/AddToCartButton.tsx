"use client";

import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/store/cart";

type Props = {
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string | null;
  };
};

export default function AddToCartButton({ product }: Props) {
  const [added, setAdded] = useState(false);
  const addItem = useCart((state) => state.addItem);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`w-full flex items-center justify-center gap-3 px-8 py-5 font-black text-lg rounded-xl transition-all hover:scale-[1.02] mb-8 ${
        added
          ? "bg-green-500 text-black"
          : "bg-yellow-500 text-black hover:bg-yellow-400 glow-gold"
      }`}
    >
      {added ? (
        <>
          <Check className="w-6 h-6" />
          تمت الإضافة!
        </>
      ) : (
        <>
          <ShoppingCart className="w-6 h-6" />
          أضف إلى السلة
        </>
      )}
    </button>
  );
}