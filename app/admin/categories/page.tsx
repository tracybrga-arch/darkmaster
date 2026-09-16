"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Category } from "@/lib/supabase";
import { Plus, Edit, Trash2, FolderTree } from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadCategories() {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true });
    
    setCategories(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`هل أنت متأكد من حذف "${name}"؟`)) return;

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) {
      alert("حدث خطأ: " + error.message);
    } else {
      loadCategories();
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black mb-2">
            <span className="gradient-gold">إدارة الأقسام</span>
          </h1>
          <p className="text-gray-400">إجمالي: {categories.length} قسم</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-all"
        >
          <Plus className="w-5 h-5" />
          إضافة قسم
        </Link>
      </div>

      {/* List */}
      {loading ? (
        <p className="text-gray-400">جاري التحميل...</p>
      ) : categories.length === 0 ? (
        <div className="text-center py-20 rounded-2xl bg-[#111] border border-yellow-500/10">
          <FolderTree className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-6">لا توجد أقسام بعد</p>
          <Link
            href="/admin/categories/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-all"
          >
            <Plus className="w-5 h-5" />
            إضافة أول قسم
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center gap-4 p-4 rounded-2xl bg-[#111] border border-yellow-500/10 hover:border-yellow-500/30 transition-all"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <FolderTree className="w-6 h-6 text-yellow-500" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg">{cat.name_ar}</h3>
                <p className="text-sm text-gray-500">
                  {cat.name_en} • {cat.slug}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/categories/${cat.id}/edit`}
                  className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 transition-all"
                >
                  <Edit className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => handleDelete(cat.id, cat.name_ar)}
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