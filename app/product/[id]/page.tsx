import Link from "next/link";
import { ShoppingCart, Package, ArrowRight, Shield, Zap, Lock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
export const revalidate = 0;
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: product } = await supabase
    .from("products")
    .select("*, categories(name_ar, slug)")
    .eq("id", id)
    .single();

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap">
          <Link href="/" className="hover:text-yellow-500 transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-yellow-500 transition-colors">
            الأقسام
          </Link>
          <span>/</span>
          <Link
            href={`/categories/${product.categories?.slug}`}
            className="hover:text-yellow-500 transition-colors"
          >
            {product.categories?.name_ar}
          </Link>
          <span>/</span>
          <span className="text-yellow-500">{product.name_ar}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Image */}
          <div className="rounded-3xl bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 aspect-square flex items-center justify-center overflow-hidden">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name_ar}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[200px]">💳</span>
            )}
          </div>

          {/* Details */}
          <div>
            {/* Category Badge */}
            <Link
              href={`/categories/${product.categories?.slug}`}
              className="inline-block px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-sm font-semibold mb-4"
            >
              {product.categories?.name_ar}
            </Link>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              {product.name_ar}
            </h1>

            {/* Description */}
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {product.description_ar}
            </p>

            {/* Price */}
            <div className="mb-8">
              <span className="text-5xl font-black gradient-gold">
                ${product.price}
              </span>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 text-gray-400 mb-8">
              <Package className="w-5 h-5" />
              <span>متوفر: {product.stock} قطعة</span>
            </div>

            {/* CTA */}
            <AddToCartButton
              product={{
                id: product.id,
                name: product.name_ar,
                price: product.price,
                image_url: product.image_url,
              }}
            />

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 rounded-xl bg-[#111] border border-yellow-500/10">
                <Zap className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <p className="text-xs text-gray-400">تسليم فوري</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-[#111] border border-yellow-500/10">
                <Shield className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <p className="text-xs text-gray-400">ضمان الجودة</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-[#111] border border-yellow-500/10">
                <Lock className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <p className="text-xs text-gray-400">دفع آمن</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}