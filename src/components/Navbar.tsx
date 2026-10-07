import React from 'react';
import { Volume2, VolumeX, PlusCircle, Bookmark, Sparkles, Gift, Palette } from 'lucide-react';

export type ArtTheme = 'parchment' | 'indigo' | 'emerald';

interface NavbarProps {
  onOpenEasyList: () => void;
  onOpenCardStudio: () => void;
  onOpenSurprise: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  ambientPlaying: boolean;
  onToggleAmbient: () => void;
  savedCount: number;
  onOpenSaved: () => void;
  currentTheme: ArtTheme;
  onSelectTheme: (theme: ArtTheme) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEasyList,
  onOpenCardStudio,
  onOpenSurprise,
  activeSection,
  setActiveSection,
  ambientPlaying,
  onToggleAmbient,
  savedCount,
  onOpenSaved,
  currentTheme,
  onSelectTheme,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-900/20 bg-[#f9f5ec]/90 dark:bg-[#111620]/90 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark: نِساء | www.nisa.com */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveSection('daily');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <span className="font-urdu text-2xl sm:text-3xl font-black text-amber-950 dark:text-amber-300 leading-none">
            نِساء
          </span>
          <span className="rounded-lg border border-amber-300/60 dark:border-amber-700/60 bg-amber-100/80 dark:bg-amber-950/60 px-2 py-0.5 font-mono text-xs font-black text-amber-900 dark:text-amber-300 shadow-xs">
            www.nisa.com
          </span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-300">
          <button
            onClick={() => {
              setActiveSection('daily');
              const el = document.getElementById('daily-sher');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`transition-colors hover:text-amber-700 dark:hover:text-amber-300 ${
              activeSection === 'daily' ? 'text-amber-800 dark:text-amber-300 underline underline-offset-8 decoration-amber-500/60 font-semibold' : ''
            }`}
          >
            Today’s Sher
          </button>
          <button
            onClick={() => {
              setActiveSection('feed');
              const el = document.getElementById('sher-feed');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`transition-colors hover:text-amber-700 dark:hover:text-amber-300 ${
              activeSection === 'feed' ? 'text-amber-800 dark:text-amber-300 underline underline-offset-8 decoration-amber-500/60 font-semibold' : ''
            }`}
          >
            Daily Collection
          </button>
          <button
            onClick={() => {
              setActiveSection('products');
              const el = document.getElementById('affiliate-picks');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`transition-colors hover:text-amber-700 dark:hover:text-amber-300 ${
              activeSection === 'products' ? 'text-amber-800 dark:text-amber-300 underline underline-offset-8 decoration-amber-500/60 font-semibold' : ''
            }`}
          >
            Books &amp; Souq
          </button>
          <button
            onClick={onOpenCardStudio}
            className="flex items-center gap-1.5 transition-colors hover:text-amber-700 dark:hover:text-amber-300"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            <span>Card Studio</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions & clean controls */}
        <div className="flex items-center gap-2.5">
          {/* Welcome Surprise Trigger Pill */}
          <button
            onClick={onOpenSurprise}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 dark:from-amber-500 dark:to-amber-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:brightness-105 active:scale-95 transition-all animate-pulse"
            title="Open Welcome Surprise Gift"
          >
            <Gift className="h-3.5 w-3.5 text-amber-200" />
            <span className="hidden sm:inline">Surprise Gift</span>
            <span className="sm:hidden">Gift</span>
          </button>

          {/* Artistic Theme Switcher */}
          <div className="flex items-center rounded-lg border border-amber-900/15 dark:border-white/10 bg-black/5 dark:bg-white/5 p-0.5 text-xs">
            <button
              onClick={() => onSelectTheme('parchment')}
              title="Artistic Ivory Parchment"
              className={`px-2 py-1 rounded text-[11px] font-semibold transition-all ${
                currentTheme === 'parchment'
                  ? 'bg-amber-100 text-amber-900 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Art Ivory
            </button>
            <button
              onClick={() => onSelectTheme('indigo')}
              title="Artistic Indigo Lapis"
              className={`px-2 py-1 rounded text-[11px] font-semibold transition-all ${
                currentTheme === 'indigo'
                  ? 'bg-[#1b2537] text-amber-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Lapis
            </button>
            <button
              onClick={() => onSelectTheme('emerald')}
              title="Artistic Mughal Emerald"
              className={`px-2 py-1 rounded text-[11px] font-semibold transition-all ${
                currentTheme === 'emerald'
                  ? 'bg-[#112d21] text-emerald-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Jade
            </button>
          </div>

          {/* Ambient sound toggle */}
          <button
            onClick={onToggleAmbient}
            title={ambientPlaying ? 'Mute ambient sitar' : 'Play ambient poetry salon audio'}
            aria-label={ambientPlaying ? 'Mute ambient sound' : 'Enable ambient sound'}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
              ambientPlaying
                ? 'border-amber-600/40 bg-amber-500/15 text-amber-800 dark:text-amber-300'
                : 'border-amber-900/15 dark:border-white/10 bg-black/5 dark:bg-white/5 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {ambientPlaying ? (
              <>
                <Volume2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />
                <span className="hidden md:inline">Salon Audio</span>
              </>
            ) : (
              <>
                <VolumeX className="h-3.5 w-3.5 text-slate-500" />
                <span className="hidden md:inline">Audio</span>
              </>
            )}
          </button>

          {/* Bookmarks counter */}
          <button
            onClick={onOpenSaved}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-amber-900/15 dark:border-white/10 bg-black/5 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Saved Shers & Products"
            aria-label="View Saved Items"
          >
            <Bookmark className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            <span className="font-mono tabular-nums">{savedCount}</span>
          </button>

          {/* Easy List Manager Trigger */}
          <button
            onClick={onOpenEasyList}
            className="flex items-center gap-1.5 rounded-lg border border-amber-800/30 bg-amber-900/10 dark:bg-white/10 px-3 py-1.5 text-xs font-bold text-amber-900 dark:text-amber-200 hover:bg-amber-900/20 transition-all active:scale-[0.98] whitespace-nowrap"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Easy List</span>
          </button>
        </div>
      </div>
    </header>
  );
};
