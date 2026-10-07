import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const AffiliateDisclaimer: React.FC = () => {
  return (
    <div className="border-t border-amber-900/15 dark:border-white/5 bg-amber-900/[0.03] dark:bg-[#080c12] py-8 text-xs text-slate-600 dark:text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-amber-900/15 dark:border-white/10 bg-white/70 dark:bg-[#0e131b] p-5 sm:flex sm:items-center sm:justify-between sm:gap-6 shadow-xs">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-slate-900 dark:text-slate-200">
                Ethical Affiliate &amp; Editorial Transparency
              </h5>
              <p className="mt-1 text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                Sher &amp; Souq is an independent cultural platform celebrating Urdu poetry and literary lifestyle. 
                When you click through our affiliate links (e.g. Amazon Associates, Bookshop.org), we may earn a small referral commission at no additional cost to you. 
                Every book, calligraphy instrument, and fragrance is curated with love and authentic literary alignment.
              </p>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 shrink-0 text-right">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/30 bg-emerald-600/10 px-3 py-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              FTC Compliant Disclosure
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-amber-900/10 dark:border-white/5 pt-6 text-[11px] text-slate-500 dark:text-slate-400">
          <p className="font-urdu" dir="rtl">
            © {new Date().getFullYear()} <strong className="font-bold text-slate-800 dark:text-slate-200">نِساء (www.nisa.com)</strong> — روزانہ کی شاعری اور ادبی کتب سروس۔ جملہ حقوق محفوظ ہیں۔
          </p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer">www.nisa.com</span>
            <span>·</span>
            <span className="hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer">Editorial Policy</span>
            <span>·</span>
            <span className="hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer">Affiliate Terms</span>
          </div>
        </div>
      </div>
    </div>
  );
};
