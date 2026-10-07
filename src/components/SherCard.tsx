import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink, 
  Tag, 
  Star,
  Sparkles,
  ArrowUpRight,
  ThumbsUp
} from 'lucide-react';
import { SherItem, AffiliateProduct } from '../types';

interface SherCardProps {
  sher: SherItem;
  onOpenCardStudio: (sher: SherItem) => void;
  onOpenProductModal: (product: AffiliateProduct) => void;
  onToggleSave: (sherId: string) => void;
  isSaved: boolean;
}

export const SherCard: React.FC<SherCardProps> = ({
  sher,
  onOpenCardStudio,
  onOpenProductModal,
  onToggleSave,
  isSaved,
}) => {
  const [script, setScript] = useState<'urdu' | 'hindi' | 'english'>('urdu');
  const [copied, setCopied] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [likeCount, setLikeCount] = useState(sher.likesCount);
  const [hasLiked, setHasLiked] = useState(false);

  const product = sher.pairedProduct;

  const handleLike = () => {
    if (!hasLiked) {
      setLikeCount((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikeCount((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  const handleCopy = async () => {
    const text = `${sher.urdu}\n\n"${sher.english}"\n— ${sher.poet}\n\n📖 Paired Pick: ${product.title}\nCheck offer: ${product.affiliateUrl}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleCopyCoupon = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.couponCode) {
      navigator.clipboard.writeText(product.couponCode);
      setCopiedCoupon(true);
      setTimeout(() => setCopiedCoupon(false), 1800);
    }
  };

  const lines = (script === 'urdu' ? sher.urdu : script === 'hindi' ? sher.hindi : sher.english).split('\n');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      className="flex flex-col justify-between overflow-hidden rounded-2xl border border-amber-900/15 dark:border-white/10 bg-white/85 dark:bg-[#121720] hover:border-amber-600/40 transition-all duration-300 shadow-md backdrop-blur-sm group"
    >
      {/* Top Bar: Clean unboxed metadata & Script switch */}
      <div className="flex items-center justify-between border-b border-amber-900/10 dark:border-white/5 bg-amber-900/[0.03] dark:bg-white/[0.02] px-5 py-3 text-xs">
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
          <span className="font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
            {sher.category}
          </span>
          <span>·</span>
          <span className="font-mono">{sher.date}</span>
        </div>

        {/* Minimal script pill tabs */}
        <div className="flex items-center gap-1 rounded bg-black/5 dark:bg-black/30 p-0.5 text-[11px]">
          <button
            onClick={() => setScript('urdu')}
            className={`px-2 py-0.5 rounded transition-colors ${
              script === 'urdu' ? 'bg-amber-600/20 text-amber-900 dark:text-amber-300 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            اردو
          </button>
          <button
            onClick={() => setScript('hindi')}
            className={`px-2 py-0.5 rounded transition-colors ${
              script === 'hindi' ? 'bg-amber-600/20 text-amber-900 dark:text-amber-300 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            हिंदी
          </button>
          <button
            onClick={() => setScript('english')}
            className={`px-2 py-0.5 rounded transition-colors ${
              script === 'english' ? 'bg-amber-600/20 text-amber-900 dark:text-amber-300 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Eng
          </button>
        </div>
      </div>

      {/* Main Shayari Body */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={script + sher.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="min-h-[90px] flex flex-col justify-center"
          >
            {lines.map((line, idx) => (
              <p
                key={idx}
                className={`font-bold tracking-wide ${
                  script === 'urdu'
                    ? 'font-urdu text-lg sm:text-xl text-right dir-rtl leading-[1.75] sm:leading-[1.85] text-[#1c150e] dark:text-amber-100'
                    : script === 'hindi'
                    ? 'font-serif text-base sm:text-lg text-left leading-relaxed text-[#1c150e] dark:text-slate-100'
                    : 'font-display text-xs sm:text-sm text-left font-semibold text-slate-800 dark:text-slate-200'
                }`}
                dir={script === 'urdu' ? 'rtl' : 'ltr'}
              >
                {line}
              </p>
            ))}
          </motion.div>
        </AnimatePresence>

        {script !== 'english' && (
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 italic line-clamp-2 border-l-2 border-amber-600/60 dark:border-amber-500/40 pl-2">
            {sher.english}
          </p>
        )}

        <div className="mt-2.5 flex items-center justify-between border-t border-amber-900/10 dark:border-white/5 pt-2">
          <span className="font-display text-sm sm:text-base font-bold text-amber-900 dark:text-amber-200">
            — {sher.poet}
          </span>
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <button
              onClick={handleLike}
              className="flex items-center gap-1 hover:text-rose-500 transition-colors"
              title="Like this sher"
            >
              <Heart
                className={`h-3.5 w-3.5 transition-transform active:scale-125 ${
                  hasLiked ? 'fill-rose-500 text-rose-500' : ''
                }`}
              />
              <span className="font-mono tabular-nums">{likeCount}</span>
            </button>
            <button
              onClick={() => onOpenCardStudio(sher)}
              className="hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
              title="Share as social graphic"
            >
              <Share2 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleCopy}
              className="hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
              title="Copy sher + link"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* BARA 1-Click Thumb Pointer: "👍 اردو کتاب مکمل منگوائیں" */}
        <div
          onClick={() => onOpenProductModal(product)}
          className="mt-3.5 flex items-center justify-between gap-3 rounded-2xl border-2 border-amber-500 bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 dark:from-amber-950/80 dark:via-slate-900 dark:to-amber-950/80 p-3 sm:p-3.5 shadow-md hover:border-amber-600 hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* BARA THUMB ICON */}
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-md ring-2 ring-amber-400/40 group-hover:scale-105 transition-transform">
              <ThumbsUp className="h-6 w-6 sm:h-8 sm:w-8 animate-bounce" />
            </div>
            <div className="min-w-0">
              <span className="font-urdu text-base sm:text-lg font-black text-amber-950 dark:text-amber-300 block truncate" dir="rtl">
                👍 اردو کتاب مکمل منگوائیں
              </span>
              <span className="text-[11px] text-slate-800 dark:text-slate-200 font-bold block truncate font-urdu mt-0.5" dir="rtl">
                گھر بیٹھے آرڈر کریں (COD دستیاب) · <strong className="text-emerald-800 dark:text-emerald-400 font-mono">{product.price}</strong>
              </span>
            </div>
          </div>

          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 rounded-xl bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-2 text-xs font-black shadow-md whitespace-nowrap active:scale-95 transition-all ring-1 ring-amber-500"
          >
            <span className="font-urdu text-xs sm:text-sm font-bold">ابھی منگوائیں</span>
          </a>
        </div>
      </div>

      {/* "In Front" Influencer Affiliate Product Showcase Hook */}
      <div className="border-t border-amber-900/15 dark:border-amber-500/20 bg-amber-50/80 dark:bg-gradient-to-b dark:from-[#161e29] dark:to-[#0f151e] p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
            ✦ {product.badge}
          </span>
          {product.discountPercent && (
            <span className="rounded bg-amber-600/20 px-1.5 py-0.5 text-[10px] font-bold font-mono text-amber-900 dark:text-amber-300">
              {product.discountPercent}
            </span>
          )}
        </div>

        <div className="flex gap-3 items-center">
          {/* Product Thumbnail */}
          <div
            onClick={() => onOpenProductModal(product)}
            className="relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-amber-900/15 dark:border-white/10 bg-slate-900 group-hover:border-amber-500/50 transition-colors"
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          {/* Details & Influencer Hook in URDU */}
          <div className="flex-1 min-w-0">
            <h5
              onClick={() => onOpenProductModal(product)}
              className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate hover:text-amber-700 dark:hover:text-amber-300 cursor-pointer font-urdu"
              dir="rtl"
            >
              {product.title}
            </h5>
            <p className="text-[11px] text-slate-700 dark:text-slate-300 line-clamp-2 mt-0.5 font-urdu text-right leading-relaxed" dir="rtl">
              "{product.influencerHook}"
            </p>
            <div className="mt-1 flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-mono text-xs">
                <span className="font-bold text-slate-900 dark:text-white tabular-nums">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-slate-500 dark:text-slate-400 line-through text-[11px] tabular-nums">
                    {product.originalPrice}
                  </span>
                )}
              </div>
              {product.couponCode && (
                <button
                  onClick={handleCopyCoupon}
                  className="flex items-center gap-1 text-[10px] font-mono font-bold text-amber-800 dark:text-amber-300 hover:underline"
                  title="Copy coupon"
                >
                  <Tag className="h-2.5 w-2.5" />
                  <span>{product.couponCode}</span>
                  {copiedCoupon && <Check className="h-2.5 w-2.5 text-emerald-600 dark:text-emerald-400" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Direct Action Link */}
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => onOpenProductModal(product)}
            className="flex-1 rounded-lg border border-amber-900/15 dark:border-white/10 bg-white/70 dark:bg-white/5 py-1.5 text-center text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Quick View
          </button>
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 py-1.5 text-center text-xs font-bold text-white transition-colors shadow-xs"
          >
            <span>Buy {product.affiliatePlatform}</span>
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};
