import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-yellow-500/20 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-black gradient-gold">DarkMaster</span>
              <span className="text-2xl">💵</span>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-md">
              السوق الرقمي الأول للمنتجات الرقمية بأسعار لا تُقاوَم.
              نوفر لك أفضل العروض بجودة عالية وخدمة سريعة.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-yellow-500 font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  الأقسام
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  عننا
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  تواصل
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-yellow-500 font-bold mb-4">تواصل معنا</h3>
            <ul className="space-y-2 text-gray-400">
              <li>support@darkmaster.com</li>
              <li>DarkMaster Support</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-yellow-500/20 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 DarkMaster. جميع الحقوق محفوظة.
          </p>
          <p className="text-gray-500 text-sm">
            ⚠️ هذا الموقع لأغراض التوعية فقط
          </p>
        </div>
      </div>
    </footer>
  );
}