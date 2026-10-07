import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Star, 
  Tag, 
  Check, 
  Copy, 
  ShieldCheck, 
  Sparkles,
  Gift
} from 'lucide-react';
import { AffiliateProduct } from '../types';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: AffiliateProduct | null;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  if (!isOpen || !product) return null;

  const handleCopyCoupon = () => {
    if (product.couponCode) {
      navigator.clipboard.writeText(product.couponCode);
      setCopiedCoupon(true);
      setTimeout(() => setCopiedCoupon(false), 2200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-auto rounded-2xl border border-white/10 bg-[#0e131b] shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#141b25]">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              {product.badge}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Top Gallery & Title */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
            <div className="sm:col-span-5 overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-lg">
              <img
                src={product.imageUrl}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center aspect-[4/3]"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="sm:col-span-7 space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="uppercase tracking-wider font-mono text-amber-400">{product.category}</span>
                <span>·</span>
                <span>{product.affiliatePlatform} Official Store</span>
              </div>

              <h3 className="font-urdu text-2xl font-bold text-white leading-snug text-right" dir="rtl">
                {product.title}
              </h3>

              <p className="text-xs text-slate-300 font-urdu text-right leading-relaxed" dir="rtl">
                {product.subtitle}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center text-amber-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 font-bold text-white font-mono">{product.rating}</span>
                </div>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400 font-mono">
                  {product.reviewCount.toLocaleString()} verified literary customer ratings
                </span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="font-mono text-3xl font-bold text-white tabular-nums">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="font-mono text-base text-slate-400 line-through tabular-nums">
                    {product.originalPrice}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="rounded bg-amber-500/20 px-2 py-0.5 text-xs font-bold text-amber-300 font-mono">
                    Save {product.discountPercent}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Influencer Hook Section in Urdu */}
          <div className="rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-4 sm:p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center justify-end gap-1.5 mb-1.5 font-urdu" dir="rtl">
              <Sparkles className="h-4 w-4 text-amber-400" />
              کتاب و پروڈکٹ کی تفصیل
            </h4>
            <p className="text-base text-slate-200 leading-relaxed font-urdu text-right" dir="rtl">
              "{product.influencerHook}"
            </p>
          </div>

          {/* Key Product Features in Urdu */}
          {product.features && product.features.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 text-right font-urdu" dir="rtl">
                اہم خصوصیات:
              </h4>
              <ul className="grid grid-cols-1 gap-2">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start justify-end gap-2 text-xs text-slate-200 font-urdu text-right" dir="rtl">
                    <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5 order-last" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Coupon Code Callout */}
          {product.couponCode && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-amber-400/50 bg-[#161f2c] p-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                  <Gift className="h-4 w-4 text-amber-400" />
                  Exclusive Reader Discount
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Apply at checkout on {product.affiliatePlatform} for instant savings
                </div>
              </div>

              <button
                onClick={handleCopyCoupon}
                className="flex items-center gap-2 rounded-lg bg-amber-400 px-3.5 py-1.5 text-xs font-mono font-bold text-slate-950 hover:bg-amber-300 transition-colors shadow"
              >
                <span>{product.couponCode}</span>
                {copiedCoupon ? (
                  <Check className="h-3.5 w-3.5 text-slate-950" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-slate-950" />
                )}
              </button>
            </div>
          )}

          {/* CTAs with Prominent Thumb Affordance */}
          <div className="pt-2 space-y-3">
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-950 shadow-xl shadow-amber-500/25 hover:from-amber-400 hover:to-amber-300 transition-all active:scale-[0.98] ring-2 ring-amber-300/50"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-white text-base">
                👍
              </span>
              <span className="font-urdu text-base sm:text-lg font-black" dir="rtl">
                اردو کتاب مکمل منگوائیں (کیش آن ڈلیوری دستیاب ہے)
              </span>
              <ExternalLink className="h-4 w-4" />
            </a>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-300 font-urdu" dir="rtl">
              <span>🚚 تیز ترین ہوم ڈلیوری</span>
              <span>·</span>
              <span>🛡️ 100٪ اصلی کتاب گارنٹی</span>
              <span>·</span>
              <span>💵 پہلے کتاب دیکھیں، پھر رقم ادا کریں</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
