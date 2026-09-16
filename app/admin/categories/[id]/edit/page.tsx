"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowRight, Save } from "lucide-react";
import Link from "next/link";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  useEffect(() => {
    async function loadCategory() {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setError("القسم غير موجود");
        setLoading(false);
        return;
      }

      setForm({
        name_ar: data.name_ar || "",
        name_en: data.name_en || "",
        slug: data.slug || "",
        icon: data.icon || "CreditCard",
        description_ar: data.description_ar || "",
        description_en: data.description_en || "",
        sort_order: data.sort_order || 0,
      });
      setLoading(false);
    }
    loadCategory();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const { error } = await supabase
      .from("categories")
      .update(form)
      .eq("id", id);

    if (error) {
      setError(error.message);
      setSaving(false);
    } else {
      router.push("/admin/categories");
    }
  };

  if (loading) {
    return <p className="text-gray-400">جاري التحميل...</p>;
  }

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
          <span className="gradient-gold">تعديل القسم</span>
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

        <div>
          <label className="block text-sm font-semibold mb-2">الاسم بالعربي *</label>
          <input
            type="text"
            value={form.name_ar}
            onChange={(e) => setForm({ ...form, name_ar: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-black border border-yellow-500/20 focus:border-yellow-500 outline-none transition-colors text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">الاسم بالإنجليزي *</label>
          <input
            type="text"
            value={form.name_en}
            onChange={(e) => setForm({ ...form, name_en: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-black border border-yellow-500/20 focus:border-yellow-500 outline-none transition-colors text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Slug *</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-black border border-yellow-500/20 focus:border-yellow-500 outline-none transition-colors text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">الأيقونة</label>
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

        <div>
          <label className="block text-sm font-semibold mb-2">الوصف بالعربي</label>
          <textarea
            value={form.description_ar}
            onChange={(e) => setForm({ ...form, description_ar: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-black border border-yellow-500/20 focus:border-yellow-500 outline-none transition-colors text-white resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">الوصف بالإنجليزي</label>
          <textarea
            value={form.description_en}
            onChange={(e) => setForm({ ...form, description_en: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-black border border-yellow-500/20 focus:border-yellow-500 outline-none transition-colors text-white resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">الترتيب</label>
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-3 rounded-lg bg-black border border-yellow-500/20 focus:border-yellow-500 outline-none transition-colors text-white"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 py-4 bg-yellow-500 text-black font-black rounded-lg hover:bg-yellow-400 transition-all disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {saving ? "جاري الحفظ..." : "حفظ التعديلات"}
        </button>
      </form>
    </div>
  );
}