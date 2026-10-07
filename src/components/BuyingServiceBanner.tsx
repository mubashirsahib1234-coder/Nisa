import React from 'react';
import { 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  Tag, 
  Sparkles
} from 'lucide-react';

interface BuyingServiceBannerProps {
  onOpenSurprise: () => void;
}

export const BuyingServiceBanner: React.FC<BuyingServiceBannerProps> = ({ onOpenSurprise }) => {
  return (
    <section className="my-10 border-y-2 border-amber-300 dark:border-slate-800 bg-amber-50/90 dark:bg-slate-900/90 py-8 sm:py-10 transition-colors shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Title & Explanation */}
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 bg-amber-200/80 dark:bg-amber-950/60 px-2.5 py-1 rounded-md">
              <Sparkles className="h-4 w-4" />
              باضابطہ اور تصدیق شدہ سروس (Official Verified Service)
            </div>
            <h3 className="font-urdu text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white leading-snug" dir="rtl">
              اردو کتب اور قلمی اشیاء براہِ راست گھر منگوائیں
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-xl font-urdu" dir="rtl">
              اصلی ہارڈکور شعری کتب، کیلیگرافی فاؤنٹین پین، عود اور ادبی تحائف تیز ترین ہوم ڈلیوری اور خصوصی رعایت کے ساتھ۔
            </p>
          </div>

          {/* 4 Feature Badges (Larger) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
            <div className="flex flex-col items-center text-center p-4 rounded-2xl border-2 border-amber-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md">
              <Truck className="h-7 w-7 text-amber-600 dark:text-amber-400 mb-2" />
              <span className="text-sm font-bold text-slate-950 dark:text-white font-urdu">24 گھنٹے ڈلیوری</span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">تیز ترین ترسیل</span>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-2xl border-2 border-amber-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md">
              <CreditCard className="h-7 w-7 text-amber-600 dark:text-amber-400 mb-2" />
              <span className="text-sm font-bold text-slate-950 dark:text-white font-urdu">کیش آن ڈلیوری</span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">کتاب دیکھ کر پیسے دیں</span>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-2xl border-2 border-amber-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md">
              <ShieldCheck className="h-7 w-7 text-emerald-600 dark:text-emerald-400 mb-2" />
              <span className="text-sm font-bold text-slate-950 dark:text-white font-urdu">100٪ اصلی کتابیں</span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">معیاری طباعت</span>
            </div>

            <div 
              onClick={onOpenSurprise}
              className="flex flex-col items-center text-center p-4 rounded-2xl border-2 border-amber-400 dark:border-amber-500 bg-gradient-to-b from-amber-100 to-amber-200/90 dark:from-amber-950/70 dark:to-amber-900/60 shadow-md cursor-pointer hover:scale-105 transition-transform"
            >
              <Tag className="h-7 w-7 text-amber-800 dark:text-amber-300 mb-2" />
              <span className="text-sm font-black text-amber-950 dark:text-amber-200 font-mono">SURPRISE35</span>
              <span className="text-[11px] text-amber-900 dark:text-amber-300 font-black font-urdu">فلیٹ 35% رعایت</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
