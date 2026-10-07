import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  ExternalLink, 
  Tag, 
  Truck, 
  ShieldCheck, 
  Check, 
  ShoppingBag,
  Flame,
  ArrowRight
} from 'lucide-react';
import { SherItem, AffiliateProduct } from '../types';

interface TopMovingShowcaseProps {
  shers: SherItem[];
  onOpenProduct: (product: AffiliateProduct) => void;
  onOpenSher: (sher: SherItem) => void;
}

export const TopMovingShowcase: React.FC<TopMovingShowcaseProps> = ({
  shers,
  onOpenProduct,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Auto-advance slowly (every 6 seconds) so user can comfortably read
  useEffect(() => {
    if (isPaused || shers.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % shers.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, shers.length]);

  if (shers.length === 0) return null;

  const currentSher = shers[currentIndex];
  const prod = currentSher.pairedProduct;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % shers.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + shers.length) % shers.length);
  };

  const handleCopyCode = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="border-b-3 border-amber-500 dark:border-amber-600 bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 shadow-xl transition-colors py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* BIGGER, BOLDER PROMOTION BANNER */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Essential Statement Left: Urgent Discount & Services (Enlarged) */}
          <div className="flex items-center gap-4 shrink-0 text-center lg:text-left">
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-xl ring-4 ring-amber-400/30">
              <Flame className="h-9 w-9 sm:h-11 sm:w-11 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <span className="rounded-lg bg-amber-600 px-3 py-1 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-md">
                  خاص رعایت: FLAT 35% OFF
                </span>
                <span className="font-mono text-xs sm:text-sm font-extrabold text-amber-900 dark:text-amber-300 bg-amber-200/80 dark:bg-amber-950/60 px-2 py-0.5 rounded">
                  کوڈ: SURPRISE35
                </span>
              </div>
              <h3 className="text-base sm:text-xl font-extrabold text-slate-950 dark:text-white mt-1.5 font-urdu" dir="rtl">
                اردو شعری کتب و دیوان — گھر بیٹھے کیش آن ڈلیوری (COD) کے ساتھ منگوائیں
              </h3>
              <p className="text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-400 mt-1 font-urdu" dir="rtl">
                🚚 مفت تیز رفتار ڈلیوری · 100٪ اصلی ہارڈکور ایڈیشن · کتاب دیکھ کر پیسے دیں
              </p>
            </div>
          </div>

          {/* Center: Prominent Featured Book Spotlight Card (Enlarged) */}
          <div className="flex-1 w-full max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border-2 border-amber-400 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 sm:px-6 sm:py-4 shadow-xl hover:border-amber-600 transition-all cursor-pointer ring-1 ring-amber-300/40"
                onClick={() => onOpenProduct(prod)}
              >
                {/* Book Image (Larger) */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative h-20 w-20 sm:h-22 sm:w-22 shrink-0 overflow-hidden rounded-2xl border-2 border-amber-200 dark:border-slate-700 bg-slate-100 shadow-md">
                    <img
                      src={prod.imageUrl}
                      alt={prod.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                    {prod.discountPercent && (
                      <span className="absolute -top-1 -right-1 rounded bg-amber-600 px-2 py-0.5 text-[10px] font-black text-white shadow-xs">
                        {prod.discountPercent}
                      </span>
                    )}
                  </div>

                  {/* Title & Price */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 dark:text-amber-400 block font-mono">
                      FEATURED BOOK ARRIVAL
                    </span>
                    <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white truncate font-urdu" dir="rtl">
                      {prod.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono text-lg font-black text-emerald-700 dark:text-emerald-400">
                        {prod.price}
                      </span>
                      {prod.originalPrice && (
                        <span className="font-mono text-xs text-slate-400 line-through">
                          {prod.originalPrice}
                        </span>
                      )}
                      {prod.couponCode && (
                        <button
                          onClick={(e) => handleCopyCode(prod.couponCode!, e)}
                          className="rounded-md bg-amber-100 dark:bg-amber-900/50 border border-amber-400 px-2 py-0.5 text-xs font-mono font-bold text-amber-900 dark:text-amber-300 hover:bg-amber-200"
                        >
                          {copiedCode === prod.couponCode ? (
                            <span className="flex items-center gap-0.5 text-emerald-700 dark:text-emerald-400">
                              <Check className="h-3 w-3" /> Copied!
                            </span>
                          ) : (
                            <span>Code: {prod.couponCode}</span>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Big Direct Buy Button */}
                <a
                  href={prod.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-3.5 text-xs font-black shadow-lg transition-all active:scale-95 shrink-0 ring-2 ring-amber-500/50"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span className="font-urdu text-base font-bold">یہ کتاب منگوائیں</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Stepper Controls (Left, Counter, Pause, Right) */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 tabular-nums">
              {currentIndex + 1} / {shers.length}
            </span>

            <div className="flex items-center gap-1 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-1">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-slate-700 transition-colors"
                title="Previous Book"
                aria-label="Previous Book"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-slate-700 transition-colors"
                title={isPaused ? 'Play' : 'Pause'}
                aria-label={isPaused ? 'Play' : 'Pause'}
              >
                {isPaused ? <Play className="h-4 w-4 text-amber-600" /> : <Pause className="h-4 w-4" />}
              </button>

              <button
                onClick={handleNext}
                className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-slate-700 transition-colors"
                title="Next Book"
                aria-label="Next Book"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
