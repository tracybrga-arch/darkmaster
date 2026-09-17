import Link from "next/link";
import { ArrowLeft, Shield, Zap, Lock, CreditCard, Wallet, Landmark, Wrench, Star } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Category, Product } from "@/lib/supabase";

const iconMap: Record<string, any> = {
  CreditCard,
  Wallet,
  Landmark,
  Shield,
  Wrench,
};
export const revalidate = 0;
export default async function Home() {
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order")
    .limit(6);

  const { data: featuredProducts } = await supabase
    .from("products")
    .select("*, categories(name_ar)")
    .eq("featured", true)
    .limit(6);

  return (
    <div className="min-h-screen">
      
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 mb-6">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
              <span className="text-yellow-500 text-sm font-semibold">
                السوق الرقمي الأول
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              مرحباً بك في{" "}
              <span className="gradient-gold">DarkMaster</span>
              <span className="inline-block mr-2">💵</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              منتجات رقمية بأسعار لا تُقاوَم. تصفح، اختر، واستلم فوراً.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/categories"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-all hover:scale-105 glow-gold"
              >
                تصفح المنتجات
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-yellow-500/30 text-white font-bold rounded-lg hover:border-yellow-500 hover:bg-yellow-500/5 transition-all"
              >
                اعرف أكثر
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-yellow-500/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 rounded-2xl bg-[#111] border border-yellow-500/10 card-hover">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <Zap className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">تسليم فوري</h3>
              <p className="text-gray-400">استلم منتجك مباشرة بعد الشراء</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-[#111] border border-yellow-500/10 card-hover">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">ضمان الجودة</h3>
              <p className="text-gray-400">جميع المنتجات مفحوصة ومضمونة</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-[#111] border border-yellow-500/10 card-hover">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <Lock className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">دفع آمن</h3>
              <p className="text-gray-400">معاملات مشفرة وآمنة بالكامل</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories && categories.length > 0 && (
        <section className="py-20 border-t border-yellow-500/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                <span className="gradient-gold">الأقسام</span>
              </h2>
              <p className="text-gray-400 text-lg">تصفح أقسامنا المتنوعة</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {categories.map((cat: Category) => {
                const Icon = iconMap[cat.icon || "CreditCard"] || CreditCard;
                return (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    className="group relative p-8 rounded-2xl bg-[#111] border border-yellow-500/10 hover:border-yellow-500/50 transition-all card-hover overflow-hidden"
                  >
                    <div className="w-16 h-16 mb-6 rounded-2xl bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                      <Icon className="w-8 h-8 text-yellow-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-yellow-500 transition-colors">
                      {cat.name_ar}
                    </h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {cat.description_ar}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-yellow-500/10">
                      <span className="text-sm text-gray-500">تصفح</span>
                      <ArrowLeft className="w-5 h-5 text-yellow-500 group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-yellow-500/30 text-white font-bold rounded-lg hover:border-yellow-500 transition-all"
              >
                كل الأقسام
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="py-20 border-t border-yellow-500/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 text-yellow-500" />
                <h2 className="text-4xl md:text-5xl font-black">
                  <span className="gradient-gold">منتجات مميزة</span>
                </h2>
              </div>
              <p className="text-gray-400 text-lg">أفضل العروض المختارة لك</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {featuredProducts.map((product: Product & { categories: { name_ar: string } }) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group rounded-2xl bg-[#111] border border-yellow-500/10 hover:border-yellow-500/50 transition-all card-hover overflow-hidden block"
                >
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
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-500 transition-colors">
                      {product.name_ar}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {product.description_ar}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-yellow-500/10">
                      <span className="text-2xl font-black text-yellow-500">
                        ${product.price}
                      </span>
                      <ArrowLeft className="w-5 h-5 text-yellow-500 group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 border-t border-yellow-500/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              جاهز للبدء؟
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              تصفح منتجاتنا وابدأ التسوق الآن
            </p>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-10 py-5 bg-yellow-500 text-black font-black text-lg rounded-xl hover:bg-yellow-400 transition-all hover:scale-105 glow-gold"
            >
              ابدأ الآن
              <ArrowLeft className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}