"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // كلمة المرور (غيّرها لاحقاً)
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "darkmaster2025";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      // احفظ الجلسة
      localStorage.setItem("admin_logged_in", "true");
      router.push("/admin");
    } else {
      setError("اسم المستخدم أو كلمة المرور غلط");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black gradient-gold mb-2">
            DarkMaster
          </h1>
          <p className="text-gray-400">لوحة التحكم</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="p-8 rounded-2xl bg-[#111] border border-yellow-500/20"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            تسجيل الدخول
          </h2>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              اسم المستخدم
            </label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pr-10 pl-4 py-3 rounded-lg bg-black border border-yellow-500/20 focus:border-yellow-500 outline-none transition-colors text-white"
                placeholder="admin"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-10 pl-4 py-3 rounded-lg bg-black border border-yellow-500/20 focus:border-yellow-500 outline-none transition-colors text-white"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-yellow-500 text-black font-black rounded-lg hover:bg-yellow-400 transition-all hover:scale-[1.02] glow-gold"
          >
            دخول
          </button>

          <p className="text-center text-gray-500 text-xs mt-4">
            الافتراضي: admin / darkmaster2025
          </p>
        </form>
      </div>
    </div>
  );
}