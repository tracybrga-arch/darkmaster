"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Category } from "@/lib/supabase";
import { ArrowRight, Save, Upload, X } from "lucide-react";
import Link from "next/link";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const [form, setForm] = useState({
    name_ar: "",
    name_en: "",
    price: 0,
    description_ar: "",
    description_en: "",
    image_url: "",
    category_id: "",
    stock: 0,
    featured: false,
  });

  useEffect(() => {
    async function load() {
      const { data: cats } = await supabase
        .from("categories")
        .select("*")
        .order("sort_order");
      setCategories(cats || []);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setError("المنتج غير موجود");
        setLoading(false);
        return;
      }

      setForm({
        name_ar: data.name_ar || "",
        name_en: data.name_en || "",
        price: data.price || 0,
        description_ar: data.description_ar || "",
        description_en: data.description_en || "",
        image_url: data.image_url || "",
        category_id: data.category_id || "",
        stock: data.stock || 0,
        featured: data.featured || false,
      });
      setLoading(false);
    }
    load();
  }, [id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (uploadError) {
      setError("فشل رفع الصورة: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    setForm((f) => ({ ...f, image_url: urlData.publicUrl }));
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const { error } = await supabase
      .from("products")
      .update(form)
      .eq("id", id);

    if (error) {
      setError(error.message);
      setSaving(false);
    } else {
      router.push("/admin/products");
    }
  };

  if (loading) return <p className="text-gray-400">جاري التحميل...</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition-colors mb-4"
        >
          <ArrowRight className="w-4 h-4" />
          رجوع
        </Link>
        <h1 className="text-3xl font-black">
          <span className="gradient-gold">تعديل المنتج</span>
        </h1>
      </div>

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
          <label className="block text-sm font-semibold mb-2">صورة المنتج</label>
          {form.image_url ? (
            <div className="relative">
              <img src={form.image_url} alt="Product" className="w-full h-48 object-cover rounded-lg" />
              <button
                type="button"
                onClick={() => setForm({ ...form, image_url: "" })}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-yellow-500/30 rounded-lg cursor-pointer hover:border-yellow-500 transition-all">
              <Upload className="w-10 h-10 text-yellow-500 mb-2" />
              <span className="text-gray-400 text-sm">
                {uploading ? "جاري الرفع..." : "اضغط لرفع صورة"}
              </span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
            </label>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">القسم *</label>
          <select
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-black border border-yellow-500/20 focus:border-yellow-500 outline-none text-white"
            required
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name_ar}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">الاسم بالعربي *</label>
          <input
            type="text"
            value={form.name_ar}
            onChange={(e) => setForm({ ...form, name_ar: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-black border border-yellow-500/20 focus:border-yellow-500 outline-none text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">الاسم بالإنجليزي *</label>
          <input
            type="text"
            value={form.name_en}
            onChange={(e) => setForm({ ...form, name_en: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-black border border-yellow-500/20 focus:border-yellow-500 outline-none text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">السعر ($) *</label>
          <input
            type="number"
            step="0.01"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
            className="w-full px-4 py-3 rounded-lg bg-black border border-yellow-500/20 focus:border-yellow-500 outline-none text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">المخزون *</label>
          <input
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-3 rounded-lg bg-black border border-yellow-500/20 focus:border-yellow-500 outline-none text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">الوصف بالعربي</label>
          <textarea
            value={form.description_ar}
            onChange={(e) => setForm({ ...form, description_ar: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-black border border-yellow-500/20 focus:border-yellow-500 outline-none text-white resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">الوصف بالإنجليزي</label>
          <textarea
            value={form.description_en}
            onChange={(e) => setForm({ ...form, description_en: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-black border border-yellow-500/20 focus:border-yellow-500 outline-none text-white resize-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="featured"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            className="w-5 h-5 accent-yellow-500"
          />
          <label htmlFor="featured" className="text-sm font-semibold">
            منتج مميز
          </label>
        </div>

        <button
          type="submit"
          disabled={saving || uploading}
          className="w-full flex items-center justify-center gap-2 py-4 bg-yellow-500 text-black font-black rounded-lg hover:bg-yellow-400 transition-all disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {saving ? "جاري الحفظ..." : "حفظ التعديلات"}
        </button>
      </form>
    </div>
  );
}