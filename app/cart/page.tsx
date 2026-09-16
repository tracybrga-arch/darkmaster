"use client";

import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, X } from "lucide-react";
import { useCart } from "@/store/cart";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckout = () => {
    setShowModal(true);
  };

  const confirmCheckout = () => {
    window.open("https://t.me/lmwdy_sm", "_blank");
    clearCart();
    setShowModal(false);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <p className="text-gray-400">جاري التحميل...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-yellow-500" />
            </div>
            <h1 className="text-3xl font-black mb-4">السلة فارغة</h1>
            <p className="text-gray-400 mb-8">لم تقم بإضافة أي منتجات بعد</p>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-all"
            >
              تصفح المنتجات
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl md:text-5xl font-black">
            <span className="gradient-gold">سلة الشراء</span>
          </h1>
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-400 transition-colors text-sm font-semibold"
          >
            حذف الكل
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#111] border border-yellow-500/10"
              >
                <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-yellow-500/10 to-transparent flex items-center justify-center overflow-hidden flex-shrink-0">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl">💳</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg mb-1 truncate">{item.name}</h3>
                  <p className="text-yellow-500 font-black text-xl">${item.price}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 flex items-center justify-center text-yellow-500 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 flex items-center justify-center text-yellow-500 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-red-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-2xl bg-[#111] border border-yellow-500/20">
              <h2 className="text-2xl font-black mb-6">ملخص الطلب</h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-gray-400">
                  <span>المجموع الفرعي</span>
                  <span>${total().toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <span>الضريبة (0%)</span>
                  <span>$0.00</span>
                </div>
                <div className="border-t border-yellow-500/20 pt-4 flex items-center justify-between">
                  <span className="text-xl font-bold">المجموع</span>
                  <span className="text-2xl font-black text-yellow-500">
                    ${total().toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-yellow-500 text-black font-black text-lg rounded-xl hover:bg-yellow-400 transition-all hover:scale-[1.02] glow-gold"
              >
                إتمام الشراء
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md p-8 rounded-3xl bg-[#111] border-2 border-yellow-500/50 shadow-2xl shadow-yellow-500/20">
            
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 left-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-yellow-500" />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-black text-center mb-3">
              تأكيد الطلب
            </h2>

            {/* Message */}
            <p className="text-gray-400 text-center mb-8 leading-relaxed">
              سيتم فتح تليجرام للتواصل معنا وإتمام طلبك.
              <br />
              هل أنت متأكد؟
            </p>

            {/* Summary */}
            <div className="p-4 rounded-xl bg-black/50 border border-yellow-500/20 mb-6">
              <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                <span>عدد المنتجات</span>
                <span>{items.reduce((s, i) => s + i.quantity, 0)}</span>
              </div>
              <div className="flex items-center justify-between font-bold">
                <span>المجموع</span>
                <span className="text-yellow-500 text-xl">${total().toFixed(2)}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-4 rounded-xl border border-yellow-500/30 text-white font-bold hover:bg-white/5 transition-all"
              >
                إلغاء
              </button>
              <button
                onClick={confirmCheckout}
                className="flex-1 py-4 rounded-xl bg-yellow-500 text-black font-black hover:bg-yellow-400 transition-all"
              >
                تأكيد
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}