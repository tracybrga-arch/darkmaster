"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowRight, Save } from "lucide-react";
import Link from "next/link";

export default function NewCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name_ar: "",
    name_en: "",
    slug: "",
    icon: "CreditCard",
    description_ar: "",
    description_en: "",
    sort_order: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.from("categories").insert([form]);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin/categories");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/categories"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition-colors mb-4"
        >
          <ArrowRight className="w-4 h-4" />
          رجوع
        </Link>
        <h1 className="text-3xl font-black">
          <span className="gradient-gold">إضافة قسم جديد</span>
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-2xl bg-[#111] border border-yellow-500/20 space-y-6"
      >
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Name AR */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            الاسم بالعربي *
          </label>
          <input
            type="text"
            value={form.name_ar}
            onChange={(e) => setForm({ ...form, name_ar: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-black border border-yellow-500/20 focus:border-yellow-500 outline-none transition-colors text-white"
            placeholder="البطاقات المسروقة"
            required
          />
        </div>

        {/* Name EN */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            الاسم بالإنجليزي *
          </label>
          <input
            type="text"
            value={form.name_en}
            onChange={(e) => setForm({ ...form, name_en: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-black border border-yellow-500/20 focus:border-yellow-500 outline-none transition-colors text-white"
            placeholder="Stolen Cards"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Slug (بالإنجليزي بدون مسافات) *
          </label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-black border border-yellow-500/20 focus:border-yellow-500 outline-none transition-colors text-white"
            placeholder="stolen-cards"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            مثال: stolen-cards, virtual-cards
          </p>
        </div>

        {/* Icon */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            الأيقونة
          </label>
          <select
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-black border border-yellow-500/20 focus:border-yellow-500 outline-none transition-colors text-white"
          >
            <option value="CreditCard">💳 بطاقة</option>
            <option value="Wallet">👛 محفظة</option>
            <option value="Landmark">🏦 بنك</option>
            <option value="Shield">🛡️ حماية</option>
            <option value="Wrench">🔧 أدوات</option>
          </select>
        </div>

        {/* Description AR */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            الوصف بالعربي
          </label>
          <textarea
            value={form.description_ar}
            onChange={(e) => setForm({ ...form, description_ar: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-black border border-yellow-500/20 focus:border-yellow-500 outline-none transition-colors text-white resize-none"
            placeholder="وصف القسم..."
          />
        </div>

        {/* Description EN */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            الوصف بالإنجليزي
          </label>
          <textarea
            value={form.description_en}
            onChange={(e) => setForm({ ...form, description_en: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-black border border-yellow-500/20 focus:border-yellow-500 outline-none transition-colors text-white resize-none"
            placeholder="Category description..."
          />
        </div>

        {/* Sort Order */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            الترتيب
          </label>
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-3 rounded-lg bg-black border border-yellow-500/20 focus:border-yellow-500 outline-none transition-colors text-white"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-4 bg-yellow-500 text-black font-black rounded-lg hover:bg-yellow-400 transition-all disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {loading ? "جاري الحفظ..." : "حفظ القسم"}
        </button>
      </form>
    </div>
  );
}