/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  Filter, 
  BookOpen, 
  PlusCircle, 
  ExternalLink,
  Flame,
  Bookmark,
  TrendingUp,
  Gift
} from 'lucide-react';
import { Navbar, ArtTheme } from './components/Navbar';
import { TopMovingShowcase } from './components/TopMovingShowcase';
import { DailySherHero } from './components/DailySherHero';
import { BuyingServiceBanner } from './components/BuyingServiceBanner';
import { WelcomeSurpriseModal } from './components/WelcomeSurpriseModal';
import { SherCard } from './components/SherCard';
import { EasyListManagerModal } from './components/EasyListManagerModal';
import { SocialCardModal } from './components/SocialCardModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SavedItemsModal } from './components/SavedItemsModal';
import { AffiliateDisclaimer } from './components/AffiliateDisclaimer';
import { INITIAL_SHAYARI_LIST } from './data/initialShayari';
import { SherItem, AffiliateProduct, MoodCategory } from './types';
import { toggleAmbientSound } from './utils/audioGenerator';

const STORAGE_KEY = 'sher_souq_items_v1';
const SAVED_STORAGE_KEY = 'sher_souq_saved_ids_v1';
const THEME_STORAGE_KEY = 'sher_souq_theme_v1';

export default function App() {
  // Master Shayari & Affiliate List state with localStorage persistence
  const [shayariList, setShayariList] = useState<SherItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_SHAYARI_LIST;
  });

  // Saved / Bookmarked IDs
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Artistic Theme state ('parchment' is clean high-contrast ivory & charcoal)
  const [currentTheme, setCurrentTheme] = useState<ArtTheme>(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'indigo' || stored === 'emerald' || stored === 'parchment') {
        return stored as ArtTheme;
      }
    } catch {
      // ignore
    }
    return 'parchment';
  });

  // Save to localStorage whenever shayariList changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(shayariList));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }, [shayariList]);

  // Save bookmarks
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedIds));
    } catch (e) {
      console.warn('Failed to save bookmarks:', e);
    }
  }, [savedIds]);

  // Save theme
  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
      if (currentTheme === 'parchment') {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {
      console.warn('Failed to save theme:', e);
    }
  }, [currentTheme]);

  // UI state
  const [activeSection, setActiveSection] = useState('daily');
  const [ambientPlaying, setAmbientPlaying] = useState(false);
  const [selectedMood, setSelectedMood] = useState<'all' | MoodCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyBooks, setOnlyBooks] = useState(false);

  // Modals state
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);
  const [isEasyListOpen, setIsEasyListOpen] = useState(false);
  const [isCardStudioOpen, setIsCardStudioOpen] = useState(false);
  const [cardStudioSher, setCardStudioSher] = useState<SherItem | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<AffiliateProduct | null>(null);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  // Open Welcome Surprise on initial mount
  useEffect(() => {
    const hasSeenSurprise = sessionStorage.getItem('sher_surprise_shown_session');
    if (!hasSeenSurprise) {
      const timer = setTimeout(() => {
        setIsSurpriseOpen(true);
        sessionStorage.setItem('sher_surprise_shown_session', 'true');
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  // Determine today's featured sher
  const featuredSher = useMemo(() => {
    const featured = shayariList.find((s) => s.isFeaturedToday);
    return featured || shayariList[0];
  }, [shayariList]);

  // Filtered Shers for the collection grid
  const filteredShers = useMemo(() => {
    return shayariList.filter((item) => {
      if (selectedMood !== 'all' && item.category !== selectedMood) {
        return false;
      }
      if (onlyBooks && item.pairedProduct.category !== 'book') {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchPoet = item.poet.toLowerCase().includes(query);
        const matchUrdu = item.urdu.toLowerCase().includes(query);
        const matchHindi = item.hindi.toLowerCase().includes(query);
        const matchEng = item.english.toLowerCase().includes(query);
        const matchProd = item.pairedProduct.title.toLowerCase().includes(query);
        const matchHook = item.pairedProduct.influencerHook.toLowerCase().includes(query);
        return matchPoet || matchUrdu || matchHindi || matchEng || matchProd || matchHook;
      }
      return true;
    });
  }, [shayariList, selectedMood, onlyBooks, searchQuery]);

  const handleToggleAmbient = () => {
    const nextState = toggleAmbientSound((playing) => {
      setAmbientPlaying(playing);
    });
    setAmbientPlaying(nextState);
  };

  const handleToggleSave = (sherId: string) => {
    setSavedIds((prev) =>
      prev.includes(sherId) ? prev.filter((id) => id !== sherId) : [...prev, sherId]
    );
  };

  const savedShers = useMemo(() => {
    return shayariList.filter((s) => savedIds.includes(s.id));
  }, [shayariList, savedIds]);

  const handleAddSher = (newItem: SherItem) => {
    setShayariList((prev) => {
      let updated = [...prev];
      if (newItem.isFeaturedToday) {
        updated = updated.map((s) => ({ ...s, isFeaturedToday: false }));
      }
      return [newItem, ...updated];
    });
  };

  const handleUpdateSher = (updatedItem: SherItem) => {
    setShayariList((prev) =>
      prev.map((s) => {
        if (s.id === updatedItem.id) {
          return updatedItem;
        }
        if (updatedItem.isFeaturedToday) {
          return { ...s, isFeaturedToday: false };
        }
        return s;
      })
    );
  };

  const handleDeleteSher = (id: string) => {
    setShayariList((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSetFeatured = (id: string) => {
    setShayariList((prev) =>
      prev.map((s) => ({
        ...s,
        isFeaturedToday: s.id === id,
      }))
    );
  };

  const handleResetDefaults = () => {
    setShayariList(INITIAL_SHAYARI_LIST);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SHAYARI_LIST));
    } catch {
      // ignore
    }
  };

  const handleImportList = (items: SherItem[]) => {
    setShayariList(items);
  };

  const handleOpenCardStudio = (sher?: SherItem) => {
    setCardStudioSher(sher || featuredSher);
    setIsCardStudioOpen(true);
  };

  const handleOpenProductModal = (product: AffiliateProduct) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  // High-contrast clean color styles (no blurry textures)
  const themeClass = useMemo(() => {
    if (currentTheme === 'indigo') {
      return 'bg-[#0B1120] text-slate-100';
    }
    if (currentTheme === 'emerald') {
      return 'bg-[#061510] text-slate-100';
    }
    // 'parchment' - pure clean warm pearl ivory with jet-charcoal text
    return 'bg-[#FAF7F2] text-slate-900';
  }, [currentTheme]);

  return (
    <div className={`min-h-screen relative flex flex-col font-sans transition-colors duration-200 ${themeClass}`}>
      <div className="relative z-10 flex-1 flex flex-col">
        
        {/* SHURU TOP MAI SLOW SPOTLIGHT CAROUSEL (1-by-1 item with clear text and buying service) */}
        <TopMovingShowcase
          shers={shayariList}
          onOpenProduct={handleOpenProductModal}
          onOpenSher={(sher) => {
            setCardStudioSher(sher);
            setIsCardStudioOpen(true);
          }}
        />

        {/* Top Bar Navigation */}
        <Navbar
          onOpenEasyList={() => setIsEasyListOpen(true)}
          onOpenCardStudio={() => handleOpenCardStudio(featuredSher)}
          onOpenSurprise={() => setIsSurpriseOpen(true)}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          ambientPlaying={ambientPlaying}
          onToggleAmbient={handleToggleAmbient}
          savedCount={savedIds.length}
          onOpenSaved={() => setIsSavedModalOpen(true)}
          currentTheme={currentTheme}
          onSelectTheme={setCurrentTheme}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {/* HERO: Animated Sher of the Day with In Front Affiliate Card */}
          {featuredSher && (
            <DailySherHero
              sher={featuredSher}
              onOpenCardStudio={handleOpenCardStudio}
              onOpenProductModal={handleOpenProductModal}
              onToggleSave={handleToggleSave}
              isSaved={savedIds.includes(featuredSher.id)}
            />
          )}

          {/* BUYING SERVICE & PROMPT DELIVERY TRUST BANNER */}
          <BuyingServiceBanner
            onOpenSurprise={() => setIsSurpriseOpen(true)}
          />

          {/* CLEAN CONCEPT STRIP (Simple, concise sentences) */}
          <section className="border-y border-amber-200 dark:border-slate-800 bg-amber-50/50 dark:bg-slate-900/60 py-5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-center md:text-left items-center">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-600 text-white font-bold">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wide text-slate-900 dark:text-white">
                      Rozana Ka Naya Sher
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Urdu, Hindi aur English translation ke saath.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-center md:justify-start border-t md:border-t-0 md:border-l border-amber-200 dark:border-slate-800 pt-3 md:pt-0 md:pl-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-600 text-white font-bold">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wide text-slate-900 dark:text-white">
                      Asli Kitabein &amp; Amazon Buying
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Amazon Prime fast delivery aur COD available.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-center md:justify-start border-t md:border-t-0 md:border-l border-amber-200 dark:border-slate-800 pt-3 md:pt-0 md:pl-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-600 text-white font-bold">
                    <Gift className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wide text-slate-900 dark:text-white">
                      35% Discount Code
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Code: <strong className="text-amber-800 dark:text-amber-300 font-mono">SURPRISE35</strong> use karein.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FEED SECTION: "Daily Collection & Thematic Souq" */}
          <section id="sher-feed" className="py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* Header & Filter Controls */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                    Daily Shayari Archive
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                    Shayari &amp; Companion Kitabein
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    Har sher ke saath matching poetry book ya stationery find.
                  </p>
                </div>

                {/* Search Bar & Book Toggle */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative min-w-[220px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Poet ya Kitab search karein..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-amber-600 focus:outline-none"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-black dark:hover:text-white"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => setOnlyBooks(!onlyBooks)}
                    className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-all ${
                      onlyBooks
                        ? 'border-amber-600 bg-amber-600 text-white'
                        : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Only Books</span>
                  </button>
                </div>
              </div>

              {/* Interactive Segmented Mood Tabs */}
              <div className="flex flex-wrap items-center gap-2 py-4 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 mr-2 flex items-center gap-1">
                  <Filter className="h-3 w-3 text-amber-700 dark:text-amber-400" />
                  Category:
                </span>
                {[
                  { id: 'all', label: 'Sabhi Shers' },
                  { id: 'ishq', label: 'Ishq (Love)' },
                  { id: 'dard', label: 'Dard (Melancholy)' },
                  { id: 'josh', label: 'Josh (Ambition)' },
                  { id: 'zindagi', label: 'Zindagi (Life)' },
                  { id: 'sufi', label: 'Sufi (Mystic)' }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMood(m.id as 'all' | MoodCategory)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                      selectedMood === m.id
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {/* Grid of Shers */}
              {filteredShers.length === 0 ? (
                <div className="py-16 text-center text-slate-500">
                  <BookOpen className="mx-auto h-8 w-8 text-slate-400 mb-2" />
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Koi sher nahi mila</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Search filter change karein ya naya sher add karein.
                  </p>
                  <button
                    onClick={() => setIsEasyListOpen(true)}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700 transition-colors"
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>+ Naya Sher Add Karein</span>
                  </button>
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredShers.map((sher) => (
                    <SherCard
                      key={sher.id}
                      sher={sher}
                      onOpenCardStudio={handleOpenCardStudio}
                      onOpenProductModal={handleOpenProductModal}
                      onToggleSave={handleToggleSave}
                      isSaved={savedIds.includes(sher.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* CURATED FINDS / BOOKS SHOWCASE SECTION */}
          <section id="affiliate-picks" className="py-12 border-t border-slate-200 dark:border-slate-800 bg-amber-50/40 dark:bg-slate-900/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1 font-urdu" dir="rtl">
                    <TrendingUp className="h-3.5 w-3.5" />
                    اردو شعری کتب و ادبی اسٹور (Curated Books Catalog)
                  </span>
                  <h2 className="font-urdu text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5" dir="rtl">
                    منتخب اردو کتب اور دیوان
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-0.5 font-urdu" dir="rtl">
                    دیوانِ غالب، کلیاتِ اقبال، رومانوی شعری کتب اور خطاطی کے فاؤنٹین پین گھر بیٹھے کیش آن ڈلیوری کے ساتھ منگوائیں۔
                  </p>
                </div>

                <button
                  onClick={() => setIsEasyListOpen(true)}
                  className="flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-amber-700 transition-colors w-fit shadow-md"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span className="font-urdu text-xs font-bold">+ نئی کتاب یا پروڈکٹ لسٹ کریں</span>
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {shayariList.map((item) => {
                  const prod = item.pairedProduct;
                  return (
                    <div
                      key={prod.id}
                      className="flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-amber-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md hover:shadow-xl hover:border-amber-500 transition-all"
                    >
                      <div>
                        {/* Image */}
                        <div
                          onClick={() => handleOpenProductModal(prod)}
                          className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden bg-slate-100"
                        >
                          <img
                            src={prod.imageUrl}
                            alt={prod.title}
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                          {prod.discountPercent && (
                            <span className="absolute top-2 left-2 rounded bg-amber-600 px-2 py-0.5 text-[10px] font-extrabold text-white font-mono shadow-xs">
                              {prod.discountPercent}
                            </span>
                          )}
                          <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-[10px] text-white font-mono">
                            {prod.affiliatePlatform}
                          </span>
                        </div>

                        {/* Content in URDU */}
                        <div className="p-4 space-y-2">
                          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                            <span className="uppercase tracking-wider font-bold text-amber-800 dark:text-amber-400">
                              {prod.category}
                            </span>
                            <span className="font-mono font-bold text-slate-700 dark:text-slate-300">★ {prod.rating}</span>
                          </div>

                          <h4
                            onClick={() => handleOpenProductModal(prod)}
                            className="text-sm font-bold text-slate-900 dark:text-white hover:text-amber-600 cursor-pointer line-clamp-1 font-urdu text-right"
                            dir="rtl"
                          >
                            {prod.title}
                          </h4>

                          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 font-urdu text-right leading-relaxed" dir="rtl">
                            "{prod.influencerHook}"
                          </p>
                        </div>
                      </div>

                      {/* Bottom Action & Price */}
                      <div className="p-4 pt-0 space-y-2.5">
                        <div className="flex items-baseline justify-between border-t border-slate-100 dark:border-slate-700 pt-2.5">
                          <div className="flex items-baseline gap-1.5 font-mono">
                            <span className="text-base font-extrabold text-slate-900 dark:text-white">
                              {prod.price}
                            </span>
                            {prod.originalPrice && (
                              <span className="text-xs text-slate-400 line-through">
                                {prod.originalPrice}
                              </span>
                            )}
                          </div>

                          {prod.couponCode && (
                            <span className="rounded border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 text-[10px] font-mono font-bold text-amber-900 dark:text-amber-300">
                              {prod.couponCode}
                            </span>
                          )}
                        </div>

                        <a
                          href={prod.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 py-2.5 text-xs font-bold text-white transition-all shadow-md active:scale-95"
                        >
                          <span className="font-urdu text-sm font-bold">🛒 یہ کتاب منگوائیں</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER & FTC AFFILIATE DISCLAIMER */}
        <AffiliateDisclaimer />

        {/* WELCOME SURPRISE MODAL (Automatic on open or on click) */}
        <WelcomeSurpriseModal
          isOpen={isSurpriseOpen}
          onClose={() => setIsSurpriseOpen(false)}
          onOpenProductModal={handleOpenProductModal}
          featuredProduct={featuredSher?.pairedProduct}
        />

        {/* EASY LIST MANAGER MODAL */}
        <EasyListManagerModal
          isOpen={isEasyListOpen}
          onClose={() => setIsEasyListOpen(false)}
          shayariList={shayariList}
          onAddSher={handleAddSher}
          onUpdateSher={handleUpdateSher}
          onDeleteSher={handleDeleteSher}
          onSetFeatured={handleSetFeatured}
          onResetDefaults={handleResetDefaults}
          onImportList={handleImportList}
        />

        {/* SOCIAL CARD STUDIO MODAL */}
        <SocialCardModal
          isOpen={isCardStudioOpen}
          onClose={() => setIsCardStudioOpen(false)}
          sher={cardStudioSher}
        />

        {/* INFLUENCER PRODUCT DETAIL MODAL */}
        <ProductDetailModal
          isOpen={isProductModalOpen}
          onClose={() => setIsProductModalOpen(false)}
          product={selectedProduct}
        />

        {/* SAVED ITEMS MODAL */}
        <SavedItemsModal
          isOpen={isSavedModalOpen}
          onClose={() => setIsSavedModalOpen(false)}
          savedShers={savedShers}
          onRemoveSave={handleToggleSave}
          onOpenProductModal={handleOpenProductModal}
        />
      </div>
    </div>
  );
}
