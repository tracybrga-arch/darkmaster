import Link from "next/link";
import { CreditCard, Wallet, Landmark, Shield, Wrench, ArrowLeft, Package } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Category } from "@/lib/supabase";

const iconMap: Record<string, any> = {
  CreditCard,
  Wallet,
  Landmark,
  Shield,
  Wrench,
};

export default async function CategoriesPage() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="gradient-gold">الأقسام</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            تصفح جميع الأقسام واختر ما يناسبك
          </p>
        </div>

        {/* Categories Grid */}
        {categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {categories.map((category: Category) => {
              const Icon = iconMap[category.icon || "CreditCard"] || CreditCard;
              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group relative p-8 rounded-2xl bg-[#111] border border-yellow-500/10 hover:border-yellow-500/50 transition-all card-hover overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 to-yellow-500/0 group-hover:from-yellow-500/5 group-hover:to-transparent transition-all" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 mb-6 rounded-2xl bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                      <Icon className="w-8 h-8 text-yellow-500" />
                    </div>

                    <h2 className="text-2xl font-bold mb-3 group-hover:text-yellow-500 transition-colors">
                      {category.name_ar}
                    </h2>

                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {category.description_ar}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-yellow-500/10">
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        تصفح المنتجات
                      </span>
                      <ArrowLeft className="w-5 h-5 text-yellow-500 group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">لا توجد أقسام حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
}