import { Mail, MessageCircle, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            <span className="gradient-gold">تواصل معنا</span>
          </h1>
          <p className="text-gray-400 text-xl">
            نحن هنا لمساعدتك على مدار الساعة
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <a
            href="https://t.me/lmwdy_sm"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-2xl bg-[#111] border border-yellow-500/10 hover:border-yellow-500/50 transition-all card-hover text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <Send className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="font-bold text-lg mb-2">تليجرام</h3>
            <p className="text-gray-400 text-sm">@lmwdy_sm</p>
          </a>

          <div className="p-8 rounded-2xl bg-[#111] border border-yellow-500/10 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <Mail className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="font-bold text-lg mb-2">إيميل</h3>
            <p className="text-gray-400 text-sm">support@darkmaster.com</p>
          </div>

          <div className="p-8 rounded-2xl bg-[#111] border border-yellow-500/10 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="font-bold text-lg mb-2">دعم</h3>
            <p className="text-gray-400 text-sm">24/7</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-16 p-6 rounded-2xl bg-red-500/10 border border-red-500/30">
          <p className="text-center text-red-400 font-semibold">
            ⚠️ هذا الموقع الاصلي للمتجر 
          </p>
        </div>
      </div>
    </div>
  );
}