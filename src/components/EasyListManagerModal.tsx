import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Star, 
  Download, 
  Upload, 
  RotateCcw,
  Sparkles,
  BookOpen,
  Link,
  Flame,
  ArrowRight
} from 'lucide-react';
import { SherItem, MoodCategory, ProductCategory, ProductPlatform } from '../types';

interface EasyListManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  shayariList: SherItem[];
  onAddSher: (newItem: SherItem) => void;
  onUpdateSher: (updatedItem: SherItem) => void;
  onDeleteSher: (id: string) => void;
  onSetFeatured: (id: string) => void;
  onResetDefaults: () => void;
  onImportList: (items: SherItem[]) => void;
}

const PRESET_IMAGES = [
  { label: 'Gilded Poetry Hardcover Book', url: '/src/assets/images/book_urdu_poetry_hardcover_1790952244711.jpg' },
  { label: 'Vintage Brass Calligraphy Pen & Journal', url: '/src/assets/images/calligraphy_fountain_pen_journal_1790952260615.jpg' },
  { label: 'Artisanal Amber Attar Fragrance', url: '/src/assets/images/artisanal_attar_perfume_bottle_1790952274723.jpg' },
  { label: 'Sunset Ambient Reading Lamp', url: '/src/assets/images/ambient_mood_sunset_lamp_1790952287394.jpg' }
];

const POPULAR_POETS = [
  'Mirza Ghalib',
  'Faiz Ahmad Faiz',
  'Allama Iqbal',
  'Jaun Elia',
  'Ahmad Faraz',
  'Parveen Shakir',
  'Sahir Ludhianvi',
  'Rahat Indori'
];

export const EasyListManagerModal: React.FC<EasyListManagerModalProps> = ({
  isOpen,
  onClose,
  shayariList,
  onAddSher,
  onUpdateSher,
  onDeleteSher,
  onSetFeatured,
  onResetDefaults,
  onImportList
}) => {
  const [activeTab, setActiveTab] = useState<'create' | 'list'>('create');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [poet, setPoet] = useState('');
  const [urdu, setUrdu] = useState('');
  const [hindi, setHindi] = useState('');
  const [english, setEnglish] = useState('');
  const [category, setCategory] = useState<MoodCategory>('ishq');
  const [moodTitle, setMoodTitle] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  // Paired Affiliate Product State
  const [productTitle, setProductTitle] = useState('');
  const [productSubtitle, setProductSubtitle] = useState('');
  const [productCategory, setProductCategory] = useState<ProductCategory>('book');
  const [influencerHook, setInfluencerHook] = useState('');
  const [price, setPrice] = useState('$24.99');
  const [originalPrice, setOriginalPrice] = useState('$39.99');
  const [discountPercent, setDiscountPercent] = useState('35% OFF');
  const [couponCode, setCouponCode] = useState('SHER20');
  const [affiliateUrl, setAffiliateUrl] = useState('https://amazon.com?tag=shersouq-20');
  const [affiliatePlatform, setAffiliatePlatform] = useState<ProductPlatform>('Amazon');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [badge, setBadge] = useState('Featured Influencer Pick');

  const [notification, setNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleEditClick = (item: SherItem) => {
    setEditingId(item.id);
    setDate(item.date);
    setPoet(item.poet);
    setUrdu(item.urdu);
    setHindi(item.hindi);
    setEnglish(item.english);
    setCategory(item.category);
    setMoodTitle(item.moodTitle);
    setIsFeatured(!!item.isFeaturedToday);

    const prod = item.pairedProduct;
    setProductTitle(prod.title);
    setProductSubtitle(prod.subtitle);
    setProductCategory(prod.category);
    setInfluencerHook(prod.influencerHook);
    setPrice(prod.price);
    setOriginalPrice(prod.originalPrice || '');
    setDiscountPercent(prod.discountPercent || '');
    setCouponCode(prod.couponCode || '');
    setAffiliateUrl(prod.affiliateUrl);
    setAffiliatePlatform(prod.affiliatePlatform);
    setImageUrl(prod.imageUrl);
    setBadge(prod.badge);

    setActiveTab('create');
  };

  const handleResetForm = () => {
    setEditingId(null);
    setDate(new Date().toISOString().split('T')[0]);
    setPoet('');
    setUrdu('');
    setHindi('');
    setEnglish('');
    setCategory('ishq');
    setMoodTitle('');
    setIsFeatured(false);
    setProductTitle('');
    setProductSubtitle('');
    setProductCategory('book');
    setInfluencerHook('');
    setPrice('$24.99');
    setOriginalPrice('$39.99');
    setDiscountPercent('35% OFF');
    setCouponCode('SHER20');
    setAffiliateUrl('https://amazon.com?tag=shersouq-20');
    setAffiliatePlatform('Amazon');
    setImageUrl(PRESET_IMAGES[0].url);
    setBadge('Featured Influencer Pick');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!urdu.trim() && !english.trim()) {
      showNotify('Please enter at least the couplet in Urdu or English.');
      return;
    }

    if (!productTitle.trim()) {
      showNotify('Please enter a paired affiliate product title.');
      return;
    }

    const item: SherItem = {
      id: editingId || `sher-${Date.now()}`,
      date,
      urdu: urdu.trim(),
      hindi: hindi.trim() || urdu.trim(),
      english: english.trim() || 'A timeless couplet of heartfelt sentiment.',
      poet: poet.trim() || 'Anonymous Poet',
      category,
      moodTitle: moodTitle.trim() || `${poet || 'Urdu'} Reflections`,
      isFeaturedToday: isFeatured,
      likesCount: editingId ? (shayariList.find(s => s.id === editingId)?.likesCount || 120) : Math.floor(Math.random() * 200) + 50,
      sharesCount: editingId ? (shayariList.find(s => s.id === editingId)?.sharesCount || 40) : Math.floor(Math.random() * 80) + 20,
      pairedProduct: {
        id: `prod-${editingId || Date.now()}`,
        title: productTitle.trim(),
        subtitle: productSubtitle.trim() || 'Curated poetry companion',
        category: productCategory,
        influencerHook: influencerHook.trim() || 'Carefully chosen to elevate the mood of this verse.',
        price: price.trim(),
        originalPrice: originalPrice.trim() || undefined,
        discountPercent: discountPercent.trim() || undefined,
        couponCode: couponCode.trim() || undefined,
        rating: 4.9,
        reviewCount: Math.floor(Math.random() * 800) + 350,
        imageUrl: imageUrl.trim(),
        affiliateUrl: affiliateUrl.trim() || '#',
        affiliatePlatform,
        badge: badge.trim() || 'Curated Companion',
        features: [
          'Handpicked pairing for literature lovers',
          'Premium verified craftsmanship',
          'Exclusive discount code included'
        ]
      }
    };

    if (editingId) {
      onUpdateSher(item);
      showNotify('Sher & Affiliate Product successfully updated!');
    } else {
      onAddSher(item);
      showNotify('New Sher & Affiliate Product published to your daily list!');
    }

    handleResetForm();
    setActiveTab('list');
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(shayariList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `sher_souq_data_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotify('JSON list exported successfully!');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed) && parsed.length > 0) {
            onImportList(parsed);
            showNotify(`Successfully imported ${parsed.length} items!`);
          } else {
            showNotify('Invalid JSON format: array of items required.');
          }
        } catch {
          showNotify('Failed to parse JSON file.');
        }
      };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl my-auto rounded-2xl border border-white/10 bg-[#0e131b] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#141a24]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-white">
                Easy List &amp; Affiliate Manager
              </h2>
              <p className="text-xs text-slate-400">
                Quickly add daily shers, connect influencer products, and manage live listings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab switchers */}
            <div className="flex rounded-lg border border-white/10 bg-white/5 p-1 text-xs">
              <button
                onClick={() => {
                  handleResetForm();
                  setActiveTab('create');
                }}
                className={`rounded px-3 py-1 font-medium transition-all ${
                  activeTab === 'create'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {editingId ? 'Edit Entry' : '+ Add New Sher & Ad'}
              </button>
              <button
                onClick={() => setActiveTab('list')}
                className={`rounded px-3 py-1 font-medium transition-all ${
                  activeTab === 'list'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                View All Listed ({shayariList.length})
              </button>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors ml-2"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="bg-amber-500 px-4 py-2 text-center text-xs font-bold text-slate-950">
            {notification}
          </div>
        )}

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 flex-1">
          {activeTab === 'create' ? (
            <form onSubmit={handleSave} className="space-y-8">
              {/* SECTION 1: SHAYARI DETAILS */}
              <div className="rounded-xl border border-white/10 bg-[#121822] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    1. Shayari / Couplet Content
                  </h3>
                  <span className="text-xs text-slate-400">Step 1 of 2</span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Publication Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-[#090d13] px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Poet / Shayar
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mirza Ghalib, Jaun Elia"
                      value={poet}
                      onChange={(e) => setPoet(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-[#090d13] px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Mood / Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as MoodCategory)}
                      className="w-full rounded-lg border border-white/10 bg-[#090d13] px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                    >
                      <option value="ishq">Ishq (Love &amp; Romance)</option>
                      <option value="dard">Dard (Heartbreak &amp; Melancholy)</option>
                      <option value="josh">Josh (Drive, Fire &amp; Ambition)</option>
                      <option value="zindagi">Zindagi (Life &amp; Philosophy)</option>
                      <option value="sufi">Sufi (Spiritual &amp; Transcendence)</option>
                    </select>
                  </div>
                </div>

                {/* Popular poet quick click pills */}
                <div>
                  <span className="text-[11px] text-slate-400 mr-2">Quick Pick Poet:</span>
                  <div className="inline-flex flex-wrap gap-1.5 mt-1">
                    {POPULAR_POETS.map((p) => (
                      <button
                        type="button"
                        key={p}
                        onClick={() => setPoet(p)}
                        className="rounded bg-white/5 px-2 py-0.5 text-[11px] text-slate-300 hover:bg-amber-500/20 hover:text-amber-300 transition-colors"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Mood / Theme Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. On The Silence of Distance, Infinite Yearnings"
                    value={moodTitle}
                    onChange={(e) => setMoodTitle(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#090d13] px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                {/* Urdu Couplet */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center justify-between">
                    <span>Urdu Couplet (Nastaliq / Arabic script)</span>
                    <span className="text-[11px] text-slate-400">Right-to-Left</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے..."
                    value={urdu}
                    onChange={(e) => setUrdu(e.target.value)}
                    dir="rtl"
                    className="w-full rounded-lg border border-white/10 bg-[#090d13] px-3 py-2 font-urdu text-lg text-slate-100 focus:border-amber-400 focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Hindi Couplet */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Hindi Couplet (Devanagari script)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="हज़ारों ख़्वाहिशें ऐसी कि हर ख़्वाहिश पे दम निकले..."
                    value={hindi}
                    onChange={(e) => setHindi(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#090d13] px-3 py-2 text-sm text-slate-100 focus:border-amber-400 focus:outline-none leading-relaxed"
                  />
                </div>

                {/* English Translation */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    English Translation &amp; Poetic Essence
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Thousands of desires, each one worth perishing for..."
                    value={english}
                    onChange={(e) => setEnglish(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#090d13] px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="featured-check"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="h-4 w-4 rounded border-white/10 bg-[#090d13] text-amber-500 focus:ring-amber-400"
                  />
                  <label htmlFor="featured-check" className="text-xs font-medium text-amber-300 cursor-pointer flex items-center gap-1.5">
                    <Flame className="h-3.5 w-3.5" />
                    Feature this as "Today's Sher of the Day" in hero section
                  </label>
                </div>
              </div>

              {/* SECTION 2: PAIRED INFLUENCER AFFILIATE PRODUCT */}
              <div className="rounded-xl border border-amber-500/30 bg-[#141b25] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <Link className="h-4 w-4" />
                    2. In Front Ad / Influencer Affiliate Product Pairing
                  </h3>
                  <span className="text-xs text-emerald-400 font-semibold">High-Conversion Module</span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Product Name / Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Diwan-e-Ghalib Gilded Hardcover Edition"
                      value={productTitle}
                      onChange={(e) => setProductTitle(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-[#090d13] px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Subtitle / Brief Spec
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Archival parchment with Nastaliq calligraphy"
                      value={productSubtitle}
                      onChange={(e) => setProductSubtitle(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-[#090d13] px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Influencer Hook */}
                <div>
                  <label className="block text-xs font-medium text-amber-300 mb-1">
                    Influencer Catch Hook ("Why this pairs with this sher to catch people")
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. If you truly want to savor Ghalib beyond social media reels, this collector's hardcover will become your most prized midnight companion..."
                    value={influencerHook}
                    onChange={(e) => setInfluencerHook(e.target.value)}
                    className="w-full rounded-lg border border-amber-500/30 bg-[#090d13] px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Deal Price
                    </label>
                    <input
                      type="text"
                      placeholder="$28.50"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-[#090d13] px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Original / MRP
                    </label>
                    <input
                      type="text"
                      placeholder="$45.00"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-[#090d13] px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Discount %
                    </label>
                    <input
                      type="text"
                      placeholder="35% OFF"
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-[#090d13] px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Coupon Code
                    </label>
                    <input
                      type="text"
                      placeholder="SHER20"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="w-full rounded-lg border border-white/10 bg-[#090d13] px-3 py-2 text-xs text-amber-300 font-mono font-bold focus:border-amber-400 focus:outline-none uppercase"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Category
                    </label>
                    <select
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value as ProductCategory)}
                      className="w-full rounded-lg border border-white/10 bg-[#090d13] px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                    >
                      <option value="book">Poetry Book / Anthology</option>
                      <option value="stationery">Stationery &amp; Calligraphy Pen</option>
                      <option value="fragrance">Attar &amp; Fragrance</option>
                      <option value="decor">Ambient Lamp &amp; Decor</option>
                      <option value="lifestyle">Lifestyle &amp; Journal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Affiliate Platform
                    </label>
                    <select
                      value={affiliatePlatform}
                      onChange={(e) => setAffiliatePlatform(e.target.value as ProductPlatform)}
                      className="w-full rounded-lg border border-white/10 bg-[#090d13] px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                    >
                      <option value="Amazon">Amazon Associates</option>
                      <option value="Bookshop.org">Bookshop.org</option>
                      <option value="Barnes & Noble">Barnes &amp; Noble</option>
                      <option value="Artisan Direct">Artisan Direct</option>
                      <option value="Curated Partner">Curated Partner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      placeholder="Editor's Choice / Influencer Pick"
                      value={badge}
                      onChange={(e) => setBadge(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-[#090d13] px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Affiliate Link Input */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Affiliate / Product URL (with your referral tag)
                  </label>
                  <input
                    type="url"
                    placeholder="https://amazon.com/dp/B00.../?tag=youraffiliatetag-20"
                    value={affiliateUrl}
                    onChange={(e) => setAffiliateUrl(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#090d13] px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none font-mono"
                    required
                  />
                </div>

                {/* Product Image Preset Picker */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Select High-Res Studio Image Preset:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {PRESET_IMAGES.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => setImageUrl(img.url)}
                        className={`cursor-pointer overflow-hidden rounded-lg border p-1 text-center transition-all ${
                          imageUrl === img.url
                            ? 'border-amber-400 bg-amber-400/10'
                            : 'border-white/10 bg-[#090d13] hover:border-white/30'
                        }`}
                      >
                        <img
                          src={img.url}
                          alt={img.label}
                          className="h-20 w-full object-cover rounded"
                        />
                        <span className="block mt-1 text-[10px] text-slate-300 truncate">
                          {img.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Or enter custom image URL"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-[#090d13] px-3 py-1.5 text-xs text-slate-300 focus:border-amber-400 focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                >
                  Clear Form
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2.5 text-xs font-bold text-slate-950 shadow-lg hover:from-amber-400 hover:to-amber-500 transition-all active:scale-[0.98]"
                  >
                    <Check className="h-4 w-4" />
                    <span>{editingId ? 'Update Listing' : 'Publish to Daily Feed'}</span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* TAB 2: MANAGE EXISTING LIST */
            <div className="space-y-6">
              {/* Management Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="text-xs text-slate-400">
                  Total Active Listings: <span className="font-mono text-white font-bold">{shayariList.length}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleExportJSON}
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:border-white/20 transition-colors"
                    title="Export list to JSON backup"
                  >
                    <Download className="h-3.5 w-3.5 text-amber-400" />
                    <span>Export JSON</span>
                  </button>

                  <label className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:border-white/20 transition-colors cursor-pointer">
                    <Upload className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Import JSON</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportFile}
                      className="hidden"
                    />
                  </label>

                  <button
                    onClick={() => {
                      if (confirm('Reset to original sample Shayari & Affiliate items?')) {
                        onResetDefaults();
                        showNotify('Reset to default curated list.');
                      }
                    }}
                    className="flex items-center gap-1.5 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-300 hover:bg-rose-500/20 transition-colors"
                    title="Reset to default items"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reset Defaults</span>
                  </button>
                </div>
              </div>

              {/* List of items */}
              <div className="space-y-3">
                {shayariList.map((item) => (
                  <div
                    key={item.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border p-4 transition-all ${
                      item.isFeaturedToday
                        ? 'border-amber-500/50 bg-amber-500/[0.04]'
                        : 'border-white/10 bg-[#121720] hover:border-white/20'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs">
                        {item.isFeaturedToday && (
                          <span className="flex items-center gap-1 rounded bg-amber-500 px-1.5 py-0.2 text-[10px] font-bold text-slate-950">
                            <Star className="h-3 w-3 fill-current" />
                            FEATURED TODAY
                          </span>
                        )}
                        <span className="font-semibold text-amber-200">{item.poet}</span>
                        <span className="text-slate-500">·</span>
                        <span className="text-slate-400 font-mono">{item.date}</span>
                        <span className="text-slate-500">·</span>
                        <span className="capitalize text-slate-400">{item.category}</span>
                      </div>

                      <p className="mt-1 font-urdu text-base text-slate-200 truncate" dir="rtl">
                        {item.urdu}
                      </p>

                      <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                        <span className="text-amber-400 font-medium">Paired:</span>
                        <span className="text-slate-300 truncate">{item.pairedProduct.title}</span>
                        <span className="font-mono text-emerald-400 font-semibold">{item.pairedProduct.price}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-white/5">
                      {!item.isFeaturedToday && (
                        <button
                          onClick={() => {
                            onSetFeatured(item.id);
                            showNotify(`Set "${item.poet}" as Sher of the Day!`);
                          }}
                          className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1.5 text-xs font-medium text-amber-300 hover:bg-amber-500/20 transition-colors"
                          title="Set as Hero Sher"
                        >
                          Make Featured
                        </button>
                      )}

                      <button
                        onClick={() => handleEditClick(item)}
                        className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                        title="Edit Sher & Product"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete sher by ${item.poet}?`)) {
                            onDeleteSher(item.id);
                            showNotify('Item deleted.');
                          }
                        }}
                        className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
