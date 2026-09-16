"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { FolderTree, Package, TrendingUp, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
    totalValue: 0,
    featured: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const { count: catCount } = await supabase
        .from("categories")
        .select("*", { count: "exact", head: true });

      const { data: products } = await supabase
        .from("products")
        .select("*");

      setStats({
        categories: catCount || 0,
        products: products?.length || 0,
        totalValue: products?.reduce((sum, p) => sum + (p.price || 0), 0) || 0,
        featured: products?.filter((p) => p.featured).length || 0,
      });

      setLoading(false);
    }
    loadStats();
  }, []);

  const cards = [
    { label: "الأقسام", value: stats.categories, icon: FolderTree, color: "yellow" },
    { label: "المنتجات", value: stats.products, icon: Package, color: "green" },
    { label: "المميزة", value: stats.featured, icon: TrendingUp, color: "blue" },
    { label: "قيمة المخزون", value: `$${stats.totalValue.toFixed(2)}`, icon: DollarSign, color: "purple" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">
          <span className="gradient-gold">لوحة التحكم</span>
        </h1>
        <p className="text-gray-400">مرحباً بك في DarkMaster Admin</p>
      </div>

      {/* Stats */}
      {loading ? (
        <p className="text-gray-400">جاري التحميل...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#111] border border-yellow-500/10 card-hover"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-yellow-500" />
                  </div>
                </div>
                <p className="text-3xl font-black mb-1">{card.value}</p>
                <p className="text-gray-400 text-sm">{card.label}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-12">
        <h2 className="text-2xl font-black mb-6">إجراءات سريعة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/admin/products/new"
            className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 hover:border-yellow-500/50 transition-all"
          >
            <Package className="w-8 h-8 text-yellow-500 mb-3" />
            <h3 className="font-bold text-lg mb-1">إضافة منتج جديد</h3>
            <p className="text-gray-400 text-sm">أضف منتجاً جديداً للمتجر</p>
          </a>
          <a
            href="/admin/categories/new"
            className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 hover:border-yellow-500/50 transition-all"
          >
            <FolderTree className="w-8 h-8 text-yellow-500 mb-3" />
            <h3 className="font-bold text-lg mb-1">إضافة قسم جديد</h3>
            <p className="text-gray-400 text-sm">أضف قسماً جديداً للمتجر</p>
          </a>
        </div>
      </div>
    </div>
  );
}