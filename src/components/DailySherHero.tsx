import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  Tag, 
  Share2, 
  Bookmark, 
  Star,
  Flame,
  Truck,
  ShieldCheck,
  ThumbsUp
} from 'lucide-react';
import { SherItem, AffiliateProduct } from '../types';

interface DailySherHeroProps {
  sher: SherItem;
  onOpenCardStudio: (sher: SherItem) => void;
  onOpenProductModal: (product: AffiliateProduct) => void;
  onToggleSave: (sherId: string) => void;
  isSaved: boolean;
}

export const DailySherHero: React.FC<DailySherHeroProps> = ({
  sher,
  onOpenCardStudio,
  onOpenProductModal,
  onToggleSave,
  isSaved,
}) => {
  const [activeScript, setActiveScript] = useState<'urdu' | 'hindi' | 'english'>('urdu');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  const product = sher.pairedProduct;

  const handleCopySherWithLink = async () => {
    const textToCopy = `✨ Sher: ${sher.urdu}\n"${sher.english}"\n— ${sher.poet}\n\n📖 Kitab: ${product.title}\nOffer: Code [${product.couponCode || 'SURPRISE35'}] use karein\nLink: ${product.affiliateUrl}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2400);
    } catch {
      // fallback
    }
  };

  const handleCopyCoupon = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.couponCode) {
      navigator.clipboard.writeText(product.couponCode);
      setCopiedCoupon(true);
      setTimeout(() => setCopiedCoupon(false), 2000);
    }
  };

  const lines = (activeScript === 'urdu' ? sher.urdu : activeScript === 'hindi' ? sher.hindi : sher.english).split('\n');

  return (
    <section id="daily-sher" className="relative pt-4 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Subheader */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
              <Flame className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              Daily Sher of the Day
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="text-xs font-mono font-medium text-slate-700 dark:text-slate-400">{sher.date}</span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase">{sher.category}</span>
          </div>

          {/* Script segmented toggle */}
          <div className="flex items-center gap-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-0.5 text-xs">
            <button
              onClick={() => setActiveScript('urdu')}
              className={`rounded px-3 py-1 font-bold transition-all ${
                activeScript === 'urdu'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
              }`}
            >
              اردو (Urdu)
            </button>
            <button
              onClick={() => setActiveScript('hindi')}
              className={`rounded px-3 py-1 font-bold transition-all ${
                activeScript === 'hindi'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
              }`}
            >
              हिंदी (Hindi)
            </button>
            <button
              onClick={() => setActiveScript('english')}
              className={`rounded px-3 py-1 font-bold transition-all ${
                activeScript === 'english'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
              }`}
            >
              English Meaning
            </button>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
          
          {/* Left Column: Big Bold Legible Sher (7 Cols) */}
          <motion.div
            key={sher.id + activeScript}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col justify-between rounded-2xl border-2 border-amber-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-9 shadow-md lg:col-span-7"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl text-amber-600 dark:text-amber-400 font-serif leading-none">“</span>
                <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                  {sher.moodTitle}
                </span>
              </div>

              {/* Large, High-Contrast Couplet Lines (Chote thore kiye hain for elegant balance) */}
              <div className="my-2 min-h-[95px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScript + sher.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    {lines.map((line, idx) => (
                      <p
                        key={idx}
                        className={`font-bold tracking-wide ${
                          activeScript === 'urdu'
                            ? 'font-urdu text-xl sm:text-2xl text-right dir-rtl leading-[1.8] sm:leading-[1.9] text-slate-950 dark:text-white'
                            : activeScript === 'hindi'
                            ? 'font-serif text-lg sm:text-xl text-left leading-relaxed text-slate-950 dark:text-white'
                            : 'font-display text-sm sm:text-base text-left font-semibold text-slate-900 dark:text-slate-100'
                        }`}
                        dir={activeScript === 'urdu' ? 'rtl' : 'ltr'}
                      >
                        {line}
                      </p>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Translation in simple English */}
              {activeScript !== 'english' && (
                <div className="mt-2.5 rounded-lg bg-amber-50 dark:bg-slate-800/80 p-2.5 border-l-4 border-amber-500">
                  <span className="text-[10px] font-bold uppercase text-amber-800 dark:text-amber-400 block mb-0.5">
                    English Meaning:
                  </span>
                  <p className="text-xs text-slate-800 dark:text-slate-200 italic font-medium leading-relaxed">
                    "{sher.english}"
                  </p>
                </div>
              )}

              {/* BARA INTERACTIVE 1-CLICK THUMB POINTER: URDU KITAB MUKAMMAL MANGWAYEIN */}
              <div
                onClick={() => onOpenProductModal(product)}
                className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border-3 border-amber-500 bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 dark:from-amber-950/80 dark:via-slate-900 dark:to-amber-950/80 p-4 sm:p-5 shadow-lg hover:shadow-xl hover:border-amber-600 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  {/* BARA THUMB ICON WITH PULSE & BOUNCE */}
                  <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-xl ring-4 ring-amber-400/40 group-hover:scale-105 transition-transform">
                    <ThumbsUp className="h-9 w-9 sm:h-11 sm:w-11 animate-bounce" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-urdu text-lg sm:text-2xl font-black text-amber-950 dark:text-amber-300" dir="rtl">
                        👍 اردو کتاب مکمل منگوائیں
                      </span>
                      <span className="text-[10px] sm:text-xs font-black bg-amber-600 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                        1-Click Buy
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-1 font-urdu line-clamp-1" dir="rtl">
                      گھر بیٹھے 1-کلک میں آرڈر کریں · {product.title} (قیمت: {product.price})
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-xs font-black text-emerald-800 dark:text-emerald-400 flex items-center gap-1 font-urdu" dir="rtl">
                        🚚 کیش آن ڈلیوری (COD) دستیاب ہے — کتاب دیکھ کر پیسے دیں
                      </span>
                      {product.couponCode && (
                        <span className="text-[10px] font-mono font-bold bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded">
                          کوڈ: {product.couponCode}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <a
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="shrink-0 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-3.5 text-xs font-black shadow-lg transition-all active:scale-95 ring-2 ring-amber-500/50"
                >
                  <span className="font-urdu text-base font-bold">ابھی منگوائیں</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Bottom Row: Poet Attribution & Action Buttons */}
            <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-extrabold text-amber-900 dark:text-amber-300">
                    — {sher.poet}
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Classical Urdu Ghazal
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleSave(sher.id)}
                    className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold transition-all ${
                      isSaved
                        ? 'border-amber-500 bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-300'
                        : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                    title="Bookmark sher"
                  >
                    <Bookmark className={`h-3.5 w-3.5 ${isSaved ? 'fill-amber-600 text-amber-600' : ''}`} />
                    <span>{isSaved ? 'Saved' : 'Save'}</span>
                  </button>

                  <button
                    onClick={() => onOpenCardStudio(sher)}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                    title="Social Story Card"
                  >
                    <Share2 className="h-3.5 w-3.5 text-amber-600" />
                    <span>Story Card</span>
                  </button>

                  <button
                    onClick={handleCopySherWithLink}
                    className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-amber-700 transition-all active:scale-95 shadow-xs"
                    title="Copy Sher + Link"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Sher</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clear Companion Book / Product Card (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-col justify-between rounded-2xl border-2 border-amber-300 dark:border-amber-600 bg-white dark:bg-slate-900 p-6 shadow-md lg:col-span-5"
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-extrabold uppercase tracking-wide text-amber-800 dark:text-amber-400">
                📖 Paired Book / Item
              </span>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                {product.affiliatePlatform} Verified
              </span>
            </div>

            {/* Product Image */}
            <div
              onClick={() => onOpenProductModal(product)}
              className="mt-3 relative cursor-pointer overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800"
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {product.discountPercent && (
                <div className="absolute top-2.5 left-2.5 rounded bg-amber-600 px-2 py-0.5 text-xs font-extrabold text-white shadow-md">
                  {product.discountPercent}
                </div>
              )}
            </div>

            {/* Clear Product Information */}
            <div className="mt-3 space-y-1.5">
              <h4
                onClick={() => onOpenProductModal(product)}
                className="font-display text-lg sm:text-xl font-extrabold text-slate-950 dark:text-white hover:text-amber-700 dark:hover:text-amber-300 cursor-pointer"
              >
                {product.title}
              </h4>

              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center text-amber-500 font-bold">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <span className="ml-1 text-slate-900 dark:text-white font-mono">{product.rating}</span>
                </div>
                <span className="text-slate-400">·</span>
                <span className="text-slate-600 dark:text-slate-300 font-medium">
                  {product.reviewCount} readers bought
                </span>
              </div>

              {/* Short, direct Urdu description */}
              <div className="text-xs text-slate-800 dark:text-slate-200 bg-amber-50 dark:bg-slate-800 p-2.5 rounded-lg border border-amber-200 dark:border-slate-700 leading-relaxed font-urdu text-right" dir="rtl">
                <span className="font-bold text-amber-900 dark:text-amber-400 block mb-0.5 text-xs">کتاب کی خاص تفصیل:</span>
                "{product.influencerHook}"
              </div>
            </div>

            {/* Price & Buy Button */}
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-2xl font-extrabold text-slate-950 dark:text-white">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="font-mono text-xs text-slate-500 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>

                {product.couponCode && (
                  <button
                    onClick={handleCopyCoupon}
                    className="flex items-center gap-1 rounded border border-dashed border-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 text-xs font-mono font-bold text-amber-900 dark:text-amber-300 hover:bg-amber-100"
                    title="Click to copy coupon code"
                  >
                    <Tag className="h-3 w-3" />
                    <span>{product.couponCode}</span>
                    {copiedCoupon && <Check className="h-3 w-3 text-emerald-600" />}
                  </button>
                )}
              </div>

              {/* Direct Buy Button with COD mention */}
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-700 py-3 text-xs font-extrabold uppercase text-white shadow-md transition-all active:scale-95"
              >
                <span className="font-urdu text-sm font-bold">🛒 مکمل کتاب ابھی خریدیں (COD دستیاب)</span>
                <ExternalLink className="h-4 w-4" />
              </a>

              <div className="flex items-center justify-around text-[10px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Truck className="h-3 w-3 text-amber-600" />
                  Prime Dispatch
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-600" />
                  100% Genuine Edition
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
