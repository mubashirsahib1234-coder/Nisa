import React, { useRef, useState, useEffect } from 'react';
import { X, Download, Copy, Check, Sparkles, Image, Palette } from 'lucide-react';
import { SherItem } from '../types';

interface SocialCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  sher: SherItem | null;
}

type CardTheme = 'midnight' | 'emerald' | 'burgundy' | 'parchment';

export const SocialCardModal: React.FC<SocialCardModalProps> = ({
  isOpen,
  onClose,
  sher,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [theme, setTheme] = useState<CardTheme>('midnight');
  const [scriptMode, setScriptMode] = useState<'urdu' | 'hindi' | 'english' | 'bilingual'>('urdu');
  const [includeAffiliateCode, setIncludeAffiliateCode] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen || !sher) return;
    renderCanvas();
  }, [isOpen, sher, theme, scriptMode, includeAffiliateCode]);

  if (!isOpen || !sher) return null;

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High resolution for crisp social sharing (1080x1080 Instagram post format)
    const width = 1080;
    const height = 1080;
    canvas.width = width;
    canvas.height = height;

    // Theme backgrounds & styling
    let bgColor1 = '#090d13';
    let bgColor2 = '#151d28';
    let textColor = '#f1f5f9';
    let accentColor = '#f59e0b';
    let subTextColor = '#94a3b8';
    let borderColor = 'rgba(245, 158, 11, 0.25)';

    if (theme === 'emerald') {
      bgColor1 = '#061a14';
      bgColor2 = '#0d2820';
      textColor = '#ecfdf5';
      accentColor = '#34d399';
      subTextColor = '#a7f3d0';
      borderColor = 'rgba(52, 211, 153, 0.3)';
    } else if (theme === 'burgundy') {
      bgColor1 = '#1f090d';
      bgColor2 = '#2d1217';
      textColor = '#fff1f2';
      accentColor = '#fb7185';
      subTextColor = '#fecdd3';
      borderColor = 'rgba(251, 113, 133, 0.3)';
    } else if (theme === 'parchment') {
      bgColor1 = '#1c1917';
      bgColor2 = '#292524';
      textColor = '#fef3c7';
      accentColor = '#fde68a';
      subTextColor = '#d6d3d1';
      borderColor = 'rgba(253, 230, 138, 0.3)';
    }

    // Gradient background
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, bgColor1);
    grad.addColorStop(1, bgColor2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative border frame
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 4;
    ctx.strokeRect(60, 60, width - 120, height - 120);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.strokeRect(76, 76, width - 152, height - 152);

    // Top Header: Brand & Theme
    ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = accentColor;
    ctx.textAlign = 'center';
    ctx.letterSpacing = '6px';
    ctx.fillText('SHER & SOUQ · DAILY POETRY', width / 2, 130);

    // Large ornamental quotation mark
    ctx.font = 'italic 160px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
    ctx.fillText('“', width / 2, 260);

    // Main Couplet lines
    let primaryLines: string[] = [];
    if (scriptMode === 'urdu') {
      primaryLines = sher.urdu.split('\n');
    } else if (scriptMode === 'hindi') {
      primaryLines = sher.hindi.split('\n');
    } else if (scriptMode === 'english') {
      primaryLines = sher.english.split('\n');
    } else {
      // bilingual: urdu + english
      primaryLines = sher.urdu.split('\n');
    }

    if (scriptMode === 'urdu' || scriptMode === 'bilingual') {
      ctx.font = 'bold 52px "Amiri", "Cormorant Garamond", Georgia, serif';
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      
      const startY = scriptMode === 'bilingual' ? 410 : 470;
      primaryLines.forEach((line, idx) => {
        ctx.fillText(line, width / 2, startY + idx * 85);
      });

      if (scriptMode === 'bilingual') {
        ctx.font = 'italic 28px "Cormorant Garamond", serif';
        ctx.fillStyle = subTextColor;
        const engLines = sher.english.split('\n');
        engLines.forEach((line, idx) => {
          ctx.fillText(`"${line}"`, width / 2, 630 + idx * 45);
        });
      }
    } else if (scriptMode === 'hindi') {
      ctx.font = '600 44px "Cormorant Garamond", serif';
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      primaryLines.forEach((line, idx) => {
        ctx.fillText(line, width / 2, 480 + idx * 75);
      });
    } else {
      ctx.font = 'italic 38px "Cormorant Garamond", serif';
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      primaryLines.forEach((line, idx) => {
        ctx.fillText(`"${line}"`, width / 2, 490 + idx * 70);
      });
    }

    // Divider Line
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 120, 770);
    ctx.lineTo(width / 2 + 120, 770);
    ctx.stroke();

    // Poet Attribution
    ctx.font = 'bold 36px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = accentColor;
    ctx.textAlign = 'center';
    ctx.letterSpacing = '1px';
    ctx.fillText(`— ${sher.poet}`, width / 2, 830);

    // Category
    ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = subTextColor;
    ctx.fillText(`${sher.moodTitle.toUpperCase()} · ${sher.date}`, width / 2, 875);

    // Optional subtle coupon watermark at the bottom
    if (includeAffiliateCode && sher.pairedProduct.couponCode) {
      ctx.font = '600 18px "Plus Jakarta Sans", monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.fillText(
        `Curated Book Pairing: Use Code [${sher.pairedProduct.couponCode}] for ${sher.pairedProduct.discountPercent || 'Special Offer'}`,
        width / 2,
        965
      );
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const imageUri = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Sher_${sher.poet.replace(/\s+/g, '_')}_${sher.date}.png`;
    link.href = imageUri;
    link.click();
  };

  const handleCopyImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob(async (blob) => {
      if (blob && navigator.clipboard && window.ClipboardItem) {
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2200);
        } catch {
          // Fallback to downloading
          handleDownload();
        }
      } else {
        handleDownload();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-auto rounded-2xl border border-white/10 bg-[#0e131b] shadow-2xl overflow-hidden p-6 sm:p-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-5 w-5 text-amber-400" />
            <h3 className="font-display text-xl font-bold text-white">
              Social Card Studio
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Canvas Preview (7 cols) */}
          <div className="md:col-span-7 flex justify-center">
            <div className="relative aspect-square w-full max-w-[360px] rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-black">
              <canvas
                ref={canvasRef}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* Controls (5 cols) */}
          <div className="md:col-span-5 space-y-5">
            {/* Theme Presets */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                <Palette className="h-3.5 w-3.5 text-amber-400" />
                Color Theme
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setTheme('midnight')}
                  className={`rounded-lg border px-3 py-2 text-xs text-left transition-all ${
                    theme === 'midnight'
                      ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-semibold'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  Midnight Ink
                </button>
                <button
                  onClick={() => setTheme('emerald')}
                  className={`rounded-lg border px-3 py-2 text-xs text-left transition-all ${
                    theme === 'emerald'
                      ? 'border-emerald-400 bg-emerald-400/10 text-emerald-300 font-semibold'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  Velvet Emerald
                </button>
                <button
                  onClick={() => setTheme('burgundy')}
                  className={`rounded-lg border px-3 py-2 text-xs text-left transition-all ${
                    theme === 'burgundy'
                      ? 'border-rose-400 bg-rose-400/10 text-rose-300 font-semibold'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  Royal Burgundy
                </button>
                <button
                  onClick={() => setTheme('parchment')}
                  className={`rounded-lg border px-3 py-2 text-xs text-left transition-all ${
                    theme === 'parchment'
                      ? 'border-amber-200 bg-amber-200/10 text-amber-200 font-semibold'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  Warm Parchment
                </button>
              </div>
            </div>

            {/* Script Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Script Format
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setScriptMode('urdu')}
                  className={`rounded-lg border px-2.5 py-1.5 transition-all ${
                    scriptMode === 'urdu'
                      ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-semibold'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  اردو Nastaliq
                </button>
                <button
                  onClick={() => setScriptMode('bilingual')}
                  className={`rounded-lg border px-2.5 py-1.5 transition-all ${
                    scriptMode === 'bilingual'
                      ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-semibold'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  Urdu + Meaning
                </button>
                <button
                  onClick={() => setScriptMode('hindi')}
                  className={`rounded-lg border px-2.5 py-1.5 transition-all ${
                    scriptMode === 'hindi'
                      ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-semibold'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  हिंदी Devanagari
                </button>
                <button
                  onClick={() => setScriptMode('english')}
                  className={`rounded-lg border px-2.5 py-1.5 transition-all ${
                    scriptMode === 'english'
                      ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-semibold'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  English Verse
                </button>
              </div>
            </div>

            {/* Affiliate Watermark Option */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="watermark-check"
                checked={includeAffiliateCode}
                onChange={(e) => setIncludeAffiliateCode(e.target.checked)}
                className="h-4 w-4 rounded border-white/10 bg-[#090d13] text-amber-500 focus:ring-amber-400"
              />
              <label htmlFor="watermark-check" className="text-xs text-slate-300 cursor-pointer">
                Include subtle discount code badge for {sher.pairedProduct.couponCode || 'offer'}
              </label>
            </div>

            {/* Export Actions */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <button
                onClick={handleDownload}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-md hover:from-amber-400 hover:to-amber-500 transition-all active:scale-[0.98]"
              >
                <Download className="h-4 w-4" />
                <span>Download PNG (1080x1080)</span>
              </button>

              <button
                onClick={handleCopyImage}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-white/10 hover:text-white transition-all"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Image for WhatsApp/IG</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
