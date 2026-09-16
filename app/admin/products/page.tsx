"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/supabase";
import { Plus, Edit, Trash2, Package } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    
    setProducts(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`هل أنت متأكد من حذف "${name}"؟`)) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      alert("حدث خطأ: " + error.message);
    } else {
      loadProducts();
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black mb-2">
            <span className="gradient-gold">إدارة المنتجات</span>
          </h1>
          <p className="text-gray-400">إجمالي: {products.length} منتج</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-all"
        >
          <Plus className="w-5 h-5" />
          إضافة منتج
        </Link>
      </div>

      {/* List */}
      {loading ? (
        <p className="text-gray-400">جاري التحميل...</p>
      ) : products.length === 0 ? (
        <div className="text-center py-20 rounded-2xl bg-[#111] border border-yellow-500/10">
          <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-6">لا توجد منتجات بعد</p>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-all"
          >
            <Plus className="w-5 h-5" />
            إضافة أول منتج
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-4 rounded-2xl bg-[#111] border border-yellow-500/10 hover:border-yellow-500/30 transition-all"
            >
              {/* Image */}
              <div className="w-16 h-16 rounded-xl bg-yellow-500/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name_ar}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl">💳</span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg">{product.name_ar}</h3>
                <p className="text-sm text-gray-500">
                  ${product.price} • مخزون: {product.stock}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 transition-all"
                >
                  <Edit className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => handleDelete(product.id, product.name_ar)}
                  className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}