"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/store/cart";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const count = useCart((state) => state.count);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // إغلاق القائمة عند تغيير الصفحة
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/categories", label: "الأقسام" },
    { href: "/about", label: "عننا" },
    { href: "/contact", label: "تواصل" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-xl border-b border-yellow-500/30 shadow-lg shadow-yellow-500/5"
          : "bg-black/80 backdrop-blur-md border-b border-yellow-500/10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <span className="text-2xl md:text-3xl font-black gradient-gold group-hover:scale-105 transition-transform inline-block">
                DarkMaster
              </span>
            </div>
            <span className="text-2xl md:text-3xl group-hover:rotate-12 transition-transform">
              💵
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 font-semibold transition-all rounded-lg ${
                    active
                      ? "text-yellow-500"
                      : "text-gray-300 hover:text-yellow-500"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-yellow-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            
            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2.5 rounded-lg text-gray-300 hover:text-yellow-500 hover:bg-yellow-500/10 transition-all group"
            >
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
              {mounted && count() > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 animate-pulse">
                  {count()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-lg text-gray-300 hover:text-yellow-500 hover:bg-yellow-500/10 transition-all"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 pb-4" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col gap-1 pt-4 border-t border-yellow-500/20">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                    active
                      ? "bg-yellow-500/10 text-yellow-500"
                      : "text-gray-300 hover:text-yellow-500 hover:bg-yellow-500/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}