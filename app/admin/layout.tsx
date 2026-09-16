"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, FolderTree, LogOut, Home } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // لو في صفحة login، ما نتحقق
    if (pathname === "/admin/login") {
      setLoading(false);
      return;
    }

    const isLogged = localStorage.getItem("admin_logged_in");
    if (!isLogged) {
      router.push("/admin/login");
    } else {
      setLoading(false);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    router.push("/admin/login");
  };

  // لو صفحة login، اعرضها بدون layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">جاري التحميل...</p>
      </div>
    );
  }

  const menuItems = [
    { href: "/admin", label: "الرئيسية", icon: LayoutDashboard },
    { href: "/admin/categories", label: "الأقسام", icon: FolderTree },
    { href: "/admin/products", label: "المنتجات", icon: Package },
  ];

  return (
    <div className="min-h-screen flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a0a] border-l border-yellow-500/20 flex flex-col">
        
        {/* Logo */}
        <div className="p-6 border-b border-yellow-500/20">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-black gradient-gold">DarkMaster</span>
            <span className="text-xl">💵</span>
          </Link>
          <p className="text-xs text-gray-500 mt-1">لوحة التحكم</p>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/30"
                    : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-500/5"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-yellow-500/20 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:text-yellow-500 transition-all"
          >
            <Home className="w-5 h-5" />
            <span className="text-sm">الموقع</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">خروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-black">
        {children}
      </main>
    </div>
  );
}