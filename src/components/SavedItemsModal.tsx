import React from 'react';
import { X, Bookmark, ExternalLink, ArrowRight, Trash2 } from 'lucide-react';
import { SherItem, AffiliateProduct } from '../types';

interface SavedItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedShers: SherItem[];
  onRemoveSave: (sherId: string) => void;
  onOpenProductModal: (product: AffiliateProduct) => void;
}

export const SavedItemsModal: React.FC<SavedItemsModalProps> = ({
  isOpen,
  onClose,
  savedShers,
  onRemoveSave,
  onOpenProductModal,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-auto rounded-2xl border border-white/10 bg-[#0e131b] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#141b25]">
          <div className="flex items-center gap-2.5">
            <Bookmark className="h-5 w-5 text-amber-400 fill-amber-400" />
            <h3 className="font-display text-xl font-bold text-white">
              Saved Verses &amp; Products ({savedShers.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {savedShers.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Bookmark className="mx-auto h-8 w-8 text-slate-600 mb-2" />
              <p className="text-sm">You haven’t saved any verses yet.</p>
              <p className="text-xs text-slate-500 mt-1">
                Click the bookmark icon on any Sher or product to save it here for later.
              </p>
            </div>
          ) : (
            savedShers.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-white/10 bg-[#121822] p-4 space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-amber-200">{item.poet}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-mono">{item.date}</span>
                    <button
                      onClick={() => onRemoveSave(item.id)}
                      className="text-slate-400 hover:text-rose-400 transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <p className="font-urdu text-base text-slate-100" dir="rtl">
                  {item.urdu}
                </p>
                <p className="text-xs text-slate-400 italic">
                  "{item.english}"
                </p>

                {/* Paired product quick bar */}
                <div className="flex items-center justify-between border-t border-white/5 pt-2.5">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.pairedProduct.imageUrl}
                      alt={item.pairedProduct.title}
                      className="h-10 w-10 rounded object-cover border border-white/10"
                    />
                    <div>
                      <h5 className="text-xs font-semibold text-slate-200 line-clamp-1">
                        {item.pairedProduct.title}
                      </h5>
                      <span className="font-mono text-xs text-emerald-400 font-bold">
                        {item.pairedProduct.price}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenProductModal(item.pairedProduct);
                      }}
                      className="rounded bg-white/5 px-2.5 py-1 text-xs text-slate-300 hover:bg-white/10 transition-colors"
                    >
                      Details
                    </button>
                    <a
                      href={item.pairedProduct.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 rounded bg-amber-500 px-2.5 py-1 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors"
                    >
                      <span>Buy</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
