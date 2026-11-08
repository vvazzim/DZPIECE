import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  X,
  Filter,
  Car,
  ChevronDown,
  Sparkles,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Tag,
  ArrowUpDown,
  SlidersHorizontal,
  Flame,
  Layers
} from 'lucide-react';
import {
  BRANDS,
  MODELS_BY_BRAND,
  PART_CATEGORIES,
  HUBS_ALGER,
  QUALITY_TYPES,
  TOP_POPULAR_CARS
} from '../data/autoData';
import { BrandLogo } from './BrandLogos';

export function SearchBarWithFilters({
  lang,
  searchTerm,
  setSearchTerm,
  selectedBrand,
  setSelectedBrand,
  selectedModel,
  setSelectedModel,
  selectedCategory,
  setSelectedCategory,
  selectedQuality,
  setSelectedQuality,
  selectedHub,
  setSelectedHub,
  priceRange,
  setPriceRange,
  inStockOnly,
  setInStockOnly,
  sortBy,
  setSortBy,
  totalResults
}) {
  const isAr = lang === 'ar';
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef(null);

  // Available models based on selected brand
  const availableModels = selectedBrand ? MODELS_BY_BRAND[selectedBrand] || [] : [];

  // Popular quick suggestions without emoji clutter
  const popularSuggestions = [
    { title: 'Kit Distribution (La Chaine)', tag: 'distribution' },
    { title: 'Kit d\'Embrayage (Débrayage)', tag: 'embrayage' },
    { title: 'Plaquettes de frein Avant', tag: 'plaquettes' },
    { title: 'Amortisseurs Avant Gaz', tag: 'amortisseurs' },
    { title: 'Optique Phare Avant', tag: 'optique' },
    { title: 'Turbo dCi / TDI', tag: 'turbo' }
  ];

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedCategory('all');
    setSelectedQuality('all');
    setSelectedHub('all');
    setPriceRange('all');
    setInStockOnly(false);
  };

  const handleSelectPopularCar = (car) => {
    if (selectedBrand === car.brand && selectedModel === car.id) {
      setSelectedBrand('');
      setSelectedModel('');
    } else {
      setSelectedBrand(car.brand);
      setSelectedModel(car.id);
    }
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedBrand !== '' ||
    selectedModel !== '' ||
    selectedCategory !== 'all' ||
    selectedQuality !== 'all' ||
    selectedHub !== 'all' ||
    priceRange !== 'all' ||
    inStockOnly;

  return (
    <div className="bg-white border-b border-slate-200/90 sticky top-[53px] md:top-[57px] z-40">
      <div className="max-w-7xl mx-auto px-4 py-2.5 space-y-2.5">
        
        {/* ROW 1: Omnibox Search Bar + Filter Trigger */}
        <div className="flex items-center gap-2">
          
          {/* Main Search Input */}
          <div className="flex-1 relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <Search className="w-4 h-4" />
            </div>
            
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                isAr
                  ? 'بحث: سيمبول لاشين، كليو 4 ديبراياج، بلاكيط، تيربو قولف...'
                  : 'Recherche : Symbol distribution, Clio 4 embrayage, Plaquettes 208, Turbo Golf 7...'
              }
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-slate-800 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none transition"
              dir={isAr ? 'rtl' : 'ltr'}
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold p-1 text-xs"
              >
                ✕
              </button>
            )}

            {/* Live Suggestions Dropdown */}
            {isSearchFocused && !searchTerm && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 p-2.5 z-50 animate-in fade-in duration-150">
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>{isAr ? 'القطع الأكثر طلباً' : 'Recherches fréquentes'}</span>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {popularSuggestions.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onMouseDown={() => setSearchTerm(s.tag)}
                      className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-left flex items-center gap-2 border border-slate-100 transition"
                    >
                      <span className="text-xs font-semibold text-slate-700">{s.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Filter Drawer Toggle Button */}
          <button
            type="button"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`px-3 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shrink-0 ${
              showAdvancedFilters || hasActiveFilters
                ? 'bg-autoblue-600 border-autoblue-600 text-white shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isAr ? 'تصفية' : 'Filtres'}</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            )}
          </button>

          {/* Quick Sort Selector */}
          <div className="hidden md:flex items-center gap-1 bg-slate-50 px-2.5 py-2 rounded-xl border border-slate-200 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer"
            >
              <option value="price-asc">{isAr ? 'السعر: الأرخص أولاً' : 'Prix: Moins cher'}</option>
              <option value="distance-asc">{isAr ? 'الأقرب مسافة' : 'Distance: Proche'}</option>
              <option value="rating-desc">{isAr ? 'الأعلى تقييماً' : 'Mieux noté'}</option>
            </select>
          </div>
        </div>

        {/* ROW 2: 1-CLICK VISUAL CAR SELECTOR - Larger Cards & Icons */}
        <div>
          <div className="flex items-center justify-between mb-1.5 px-0.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Car className="w-4 h-4 text-autoblue-600" />
              <span>{isAr ? 'اختر سيارتك بنقرة واحدة (الأسطول الأكثر طلباً):' : 'Sélectionnez votre véhicule en 1 clic :'}</span>
            </span>
            {(selectedBrand || selectedModel) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedBrand('');
                  setSelectedModel('');
                }}
                className="text-xs font-bold text-autoblue-600 hover:text-red-600 transition"
              >
                {isAr ? 'إلغاء التحديد' : 'Toutes les voitures'}
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
            {TOP_POPULAR_CARS.map((car) => {
              const isSelected = selectedBrand === car.brand && selectedModel === car.id;
              return (
                <button
                  key={car.id}
                  type="button"
                  onClick={() => handleSelectPopularCar(car)}
                  className={`px-3.5 py-2 rounded-2xl border-2 transition-all flex items-center gap-3 shrink-0 active:scale-95 group ${
                    isSelected
                      ? 'border-autoblue-600 bg-autoblue-50/90 text-autoblue-950 shadow-sm ring-2 ring-autoblue-500/20'
                      : 'border-slate-200/90 bg-white hover:border-slate-300 text-slate-800'
                  }`}
                >
                  <BrandLogo
                    brand={car.brand}
                    className={`w-6 h-6 shrink-0 transition-transform group-hover:scale-105 ${
                      isSelected ? 'text-autoblue-600' : 'text-slate-700'
                    }`}
                  />
                  <div className="text-left">
                    <p className={`text-xs sm:text-sm font-black leading-tight ${isSelected ? 'text-autoblue-900' : 'text-slate-900'}`}>
                      {car.name}
                    </p>
                    <p className={`text-[10px] font-bold ${isSelected ? 'text-autoblue-700' : 'text-slate-400'}`}>
                      {car.badge}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ROW 3: Categories Carousel (Horizontal Scroll) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {PART_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-autoblue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{isAr ? cat.name_ar : cat.name_fr}</span>
              </button>
            );
          })}
        </div>

        {/* ROW 4: Advanced Filters Panel with Bold Prominent Labels (État, Budget, Zone) */}
        {(showAdvancedFilters || hasActiveFilters) && (
          <div className="pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-150">
            
            {/* Quality Filter (OEM / Adaptable / Casse) */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black uppercase tracking-wider text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                {isAr ? 'الحالة :' : 'État :'}
              </span>
              {QUALITY_TYPES.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setSelectedQuality(q.id)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-extrabold transition-all border ${
                    selectedQuality === q.id
                      ? q.id === 'oem'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-500/20'
                        : q.id === 'adaptable'
                        ? 'bg-sky-50 border-sky-500 text-sky-800 ring-2 ring-sky-500/20'
                        : q.id === 'casse'
                        ? 'bg-amber-50 border-amber-500 text-amber-900 ring-2 ring-amber-500/20'
                        : 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {isAr ? q.label_ar : q.label_fr}
                </button>
              ))}
            </div>

            {/* Quick Price Range Chips */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black uppercase tracking-wider text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                {isAr ? 'الميزانية :' : 'Budget :'}
              </span>
              {[
                { id: 'all', label: 'Tous' },
                { id: 'under5k', label: '< 5k DA' },
                { id: '5k-20k', label: '5k - 20k' },
                { id: 'above20k', label: '> 20k DA' }
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPriceRange(p.id)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition ${
                    priceRange === p.id
                      ? 'bg-autoblue-50 border-autoblue-500 text-autoblue-700 font-black'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Hub Selector (Oued Smar, Baraki, Birkhadem...) */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black uppercase tracking-wider text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                {isAr ? 'المنطقة :' : 'Zone :'}
              </span>
              <select
                value={selectedHub}
                onChange={(e) => setSelectedHub(e.target.value)}
                className="bg-white border-2 border-slate-200 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-800 outline-none focus:border-autoblue-600 cursor-pointer"
              >
                {HUBS_ALGER.map((h) => (
                  <option key={h.id} value={h.id}>
                    {isAr ? h.name_ar : h.name}
                  </option>
                ))}
              </select>
            </div>

            {/* In Stock & Clear */}
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-autoblue-600 focus:ring-autoblue-500 cursor-pointer"
                />
                <span>{isAr ? 'متوفر حالياً' : 'En stock'}</span>
              </label>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-xs font-bold text-red-600 hover:underline"
                >
                  {isAr ? 'إلغاء الفلاتر' : 'Réinitialiser'}
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
