import Link from "next/link";
import { ShoppingCart, Package } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/supabase";
import { notFound } from "next/navigation";
export const revalidate = 0;
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!category) {
    notFound();
  }

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", category.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-yellow-500 transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-yellow-500 transition-colors">
            الأقسام
          </Link>
          <span>/</span>
          <span className="text-yellow-500">{category.name_ar}</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="gradient-gold">{category.name_ar}</span>
          </h1>
          <p className="text-gray-400 text-lg">
            {category.description_ar}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {products?.length || 0} منتج متوفر
          </p>
        </div>

        {/* Products Grid */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: Product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group rounded-2xl bg-[#111] border border-yellow-500/10 hover:border-yellow-500/50 transition-all card-hover overflow-hidden block"
              >
                {/* Image */}
                <div className="aspect-video bg-gradient-to-br from-yellow-500/10 to-transparent flex items-center justify-center overflow-hidden">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name_ar}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-7xl">💳</span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-500 transition-colors">
                    {product.name_ar}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {product.description_ar}
                  </p>

                  {/* Stock */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Package className="w-4 h-4" />
                    <span>متوفر: {product.stock}</span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-yellow-500/10">
                    <div>
                      <span className="text-2xl font-black text-yellow-500">
                        ${product.price}
                      </span>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-all hover:scale-105">
                      <ShoppingCart className="w-4 h-4" />
                      أضف
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">لا توجد منتجات في هذا القسم حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
}