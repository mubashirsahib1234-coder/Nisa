import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gift, 
  Sparkles, 
  X, 
  Check, 
  Copy, 
  Tag, 
  ArrowRight, 
  Truck, 
  ShieldCheck
} from 'lucide-react';
import { AffiliateProduct } from '../types';

interface WelcomeSurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProductModal?: (product: AffiliateProduct) => void;
  featuredProduct?: AffiliateProduct;
}

export const WelcomeSurpriseModal: React.FC<WelcomeSurpriseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const welcomeCode = 'SURPRISE35';

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(welcomeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-md my-auto rounded-2xl border border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-900 p-6 sm:p-7 text-slate-900 dark:text-white shadow-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close surprise"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Icon */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-slate-950 shadow-md">
            <Gift className="h-7 w-7" />
          </div>

          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-900/40 border border-amber-300 dark:border-amber-700 px-2.5 py-0.5 text-xs font-bold text-amber-900 dark:text-amber-300">
            <Sparkles className="h-3 w-3" />
            Khush Amdeed Gift!
          </span>

          <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Aapka Welcome Discount
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-300">
            Kitabein aur writing pens khareedne ke liye ye discount code use karein:
          </p>
        </div>

        {/* Simple Coupon Box */}
        <div className="mt-5 rounded-xl border border-amber-200 dark:border-amber-800/80 bg-amber-50/70 dark:bg-slate-800/80 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase">
              Discount Code
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              FLAT 35% OFF
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 rounded-lg border border-dashed border-amber-400 dark:border-amber-500 bg-white dark:bg-slate-900 p-2.5">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span className="font-mono text-base font-extrabold text-amber-900 dark:text-amber-300 tracking-wider">
                {welcomeCode}
              </span>
            </div>

            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 rounded-md bg-amber-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-700 transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Simple Sher */}
          <div className="rounded-lg bg-white/80 dark:bg-slate-900/60 p-2.5 text-center border border-slate-100 dark:border-slate-800">
            <p className="font-urdu text-sm font-semibold text-slate-800 dark:text-slate-100 leading-relaxed" dir="rtl">
              ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے<br />
              بہت نکلے مرے ارمان لیکن پھر بھی کم نکلے
            </p>
            <span className="text-[10px] text-amber-800 dark:text-amber-400 font-bold block mt-1">
              — Mirza Ghalib
            </span>
          </div>

          <div className="flex items-center justify-around text-[11px] text-slate-600 dark:text-slate-300 pt-1">
            <span className="flex items-center gap-1">
              <Truck className="h-3.5 w-3.5 text-amber-600" />
              Free Delivery
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              COD Available
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 space-y-2">
          <button
            onClick={() => {
              handleCopyCode();
              onClose();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-600 hover:bg-amber-700 px-4 py-3.5 text-xs font-black uppercase text-white shadow-lg transition-all active:scale-95"
          >
            <span className="text-base">👍</span>
            <span className="font-urdu text-sm font-bold">کوڈ کاپی کریں اور مکمل اردو کتاب منگوائیں</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
