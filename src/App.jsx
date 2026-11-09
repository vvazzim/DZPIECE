import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBarWithFilters } from './components/SearchBarWithFilters';
import { PartsMap } from './components/PartsMap';
import { PartsList } from './components/PartsList';
import { PartsouqCondensedTable } from './components/PartsouqCondensedTable';
import { SellerModal } from './components/SellerModal';
import { PartDetailModal } from './components/PartDetailModal';
import { InstallModal } from './components/InstallModal';
import { PARTS_CATALOG } from './data/autoData';
import { Store, PlusCircle, Wrench, ShieldCheck, Sparkles, MapPin, TrendingDown, CheckCircle2, AlertTriangle } from 'lucide-react';

export function App() {
  const [lang, setLang] = useState('fr'); // 'fr' or 'ar'
  const [userMode, setUserMode] = useState('buyer'); // 'buyer' or 'seller'
  const [viewMode, setViewMode] = useState('split'); // 'split', 'list', 'map'
  
  // Search & Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedQuality, setSelectedQuality] = useState('all');
  const [selectedHub, setSelectedHub] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('price-asc');

  // Dynamic Parts inventory (Scraped real stock + Curated PartSouq-style OEM Catalog)
  const [parts, setParts] = useState(() => {
    try {
      const saved = localStorage.getItem('pieces_auto_parts_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length >= PARTS_CATALOG.length) return parsed;
      }
      return PARTS_CATALOG;
    } catch (e) {
      return PARTS_CATALOG;
    }
  });

  const [selectedPart, setSelectedPart] = useState(parts[0] || null);
  const [detailModalPart, setDetailModalPart] = useState(null);
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // PWA Homescreen Install State
  const [isInstallOpen, setIsInstallOpen] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice && choice.outcome === 'accepted') {
        setShowInstallBanner(false);
        setIsInstallOpen(false);
      }
      setDeferredPrompt(null);
    } else {
      setIsInstallOpen(true);
    }
  };

  // Persist parts changes
  useEffect(() => {
    try {
      localStorage.setItem('pieces_auto_parts_v2', JSON.stringify(parts));
    } catch (e) {}
  }, [parts]);

  // Sync RTL
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Adjust default view on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && viewMode === 'split') {
        setViewMode('list');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Show Toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Anti-scam voting handler
  const handleVote = (partId, isLike) => {
    let removed = false;
    setParts((prevParts) => {
      const updated = prevParts
        .map((p) => {
          if (p.id === partId) {
            const nextUpvotes = isLike ? (p.upvotes || 0) + 1 : (p.upvotes || 0);
            const nextDownvotes = !isLike ? (p.downvotes || 0) + 1 : (p.downvotes || 0);
            return {
              ...p,
              upvotes: nextUpvotes,
              downvotes: nextDownvotes
            };
          }
          return p;
        })
        .filter((p) => {
          // If downvotes reach 2 or more, automatically delete/ban the scammer!
          if ((p.downvotes || 0) >= 2) {
            removed = true;
            return false;
          }
          return true;
        });
      return updated;
    });

    if (removed) {
      showToast(
        lang === 'ar'
          ? '⚠️ تم حذف العرض تلقائياً بعد تصويت المجتمع على أنه احتيال'
          : '⚠️ Annonce supprimée automatiquement suite aux signalements d\'arnaque de la communauté.'
      );
      if (selectedPart && selectedPart.id === partId) setSelectedPart(null);
      if (detailModalPart && detailModalPart.id === partId) setDetailModalPart(null);
    } else {
      showToast(
        isLike
          ? (lang === 'ar' ? '👍 شكراً لتقييمك الإيجابي' : '👍 Merci pour votre vote de confiance !')
          : (lang === 'ar' ? '👎 تم تسجيل بلاغك ضد هذا البائع' : '👎 Signalement enregistré contre cette offre.')
      );
    }
  };

  // Direct Scammer Deletion
  const handleDeleteScammer = (partId) => {
    setParts((prev) => prev.filter((p) => p.id !== partId));
    if (selectedPart && selectedPart.id === partId) setSelectedPart(null);
    if (detailModalPart && detailModalPart.id === partId) setDetailModalPart(null);
    showToast(
      lang === 'ar'
        ? '🗑️ تم حذف الإعلان المشبوه من نتائجك بنجاح'
        : '🗑️ Offre frauduleuse supprimée définitivement de vos résultats.'
    );
  };

  // Normalize phonetic terms & Darija automotive slang
  const normalizeQuery = (text) => {
    return text
      .toLowerCase()
      .replace(/[\u064B-\u065F]/g, '')
      .replace(/é|è|ê|ë/g, 'e')
      .replace(/à|â|ä/g, 'a')
      .replace(/ï|î/g, 'i')
      .replace(/ô|ö/g, 'o')
      .replace(/ù|û|ü/g, 'u')
      .replace(/ç/g, 'c')
      .replace(/debrayage|dibriyaj|dépbrayage|dibriyage/g, 'embrayage')
      .replace(/la chaine|lachaine|courroi|chaine de distribution/g, 'distribution')
      .replace(/plaquet|plakette|plakete|plaquette de frein/g, 'plaquettes')
      .replace(/amourtiseur|amourtisour|l'amortisseur/g, 'amortisseur')
      .replace(/parchok|parechoc|pare choc/g, 'pare-chocs')
      .replace(/optik|far |phare avant/g, 'optique');
  };

  // Filter & Sort Logic
  const filteredParts = useMemo(() => {
    const normalizedTerm = normalizeQuery(searchTerm.trim());

    return parts
      .filter((p) => {
        // Search text matching (against title, arabic name, brand, model, ref, store, tags)
        const searchable = normalizeQuery(
          `${p.name} ${p.name_ar || ''} ${p.brand} ${p.model} ${p.part_brand} ${p.reference || ''} ${p.store_name} ${p.commune} ${p.compatible_models.join(' ')}`
        );

        let matchesSearch = true;
        if (normalizedTerm !== '') {
          const tokens = normalizedTerm.split(/\s+/);
          matchesSearch = tokens.every((token) => searchable.includes(token));
        }

        // Brand filter
        const matchesBrand = selectedBrand === '' || p.brand === selectedBrand;

        // Model filter
        const matchesModel = selectedModel === '' || p.model === selectedModel;

        // Category filter
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;

        // Quality filter
        const matchesQuality = selectedQuality === 'all' || p.quality === selectedQuality;

        // Hub filter
        const matchesHub = selectedHub === 'all' || p.hub_id === selectedHub;

        // Price range filter
        let matchesPrice = true;
        if (priceRange === 'under5k') matchesPrice = p.price_dzd < 5000;
        else if (priceRange === '5k-20k') matchesPrice = p.price_dzd >= 5000 && p.price_dzd <= 20000;
        else if (priceRange === 'above20k') matchesPrice = p.price_dzd > 20000;

        // In Stock filter
        const matchesStock = !inStockOnly || p.in_stock;

        return (
          matchesSearch &&
          matchesBrand &&
          matchesModel &&
          matchesCategory &&
          matchesQuality &&
          matchesHub &&
          matchesPrice &&
          matchesStock
        );
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price_dzd - b.price_dzd;
        if (sortBy === 'distance-asc') return a.distance_km - b.distance_km;
        if (sortBy === 'rating-desc') return b.rating - a.rating;
        return 0;
      });
  }, [
    parts,
    searchTerm,
    selectedBrand,
    selectedModel,
    selectedCategory,
    selectedQuality,
    selectedHub,
    priceRange,
    inStockOnly,
    sortBy
  ]);

  // Dynamic statistics
  const minPrice = filteredParts.length > 0 ? Math.min(...filteredParts.map(p => p.price_dzd)) : 0;
  const avgPrice = filteredParts.length > 0 ? Math.round(filteredParts.reduce((acc, p) => acc + p.price_dzd, 0) / filteredParts.length) : 0;

  // Add Part from Seller Modal
  const handleAddPart = (newPart) => {
    setParts((prev) => [newPart, ...prev]);
    setSelectedPart(newPart);
    showToast(
      lang === 'ar'
        ? '✅ تم نشر قطعتك بنجاح على الخريطة'
        : '✅ Votre pièce a été publiée avec succès sur la carte !'
    );
  };

  const handleShowOnMap = (part) => {
    setSelectedPart(part);
    if (window.innerWidth < 1024) {
      setViewMode('map');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans select-none antialiased">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100000] bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-700 text-xs font-black animate-in fade-in slide-in-from-top-2 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Top Header */}
      <Header
        lang={lang}
        setLang={setLang}
        userMode={userMode}
        setUserMode={setUserMode}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenSellerModal={() => setIsSellerModalOpen(true)}
        totalResults={filteredParts.length}
      />

      {/* Seller Mode Banner (if Seller Mode is active) */}
      {userMode === 'seller' && (
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-4 py-2.5 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs font-black">
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 shrink-0" />
              <span>
                {lang === 'ar'
                  ? 'فضاء البائعين ولاكاس: انشر قطع الغيار المتوفرة لديك أو وصول الحاويات والكابا مجاناً'
                  : 'Espace Professionnels & Casses : Déclarez vos stocks, pièces rares ou arrivages de casse pour être contacté en direct.'}
              </span>
            </div>
            <button
              onClick={() => setIsSellerModalOpen(true)}
              className="px-3 py-1.5 bg-slate-950 text-white rounded-xl text-xs font-black active:scale-95 transition shrink-0"
            >
              {lang === 'ar' ? '+ نشر قطعة جديدة' : '+ Publier Stock'}
            </button>
          </div>
        </div>
      )}

      {/* High Performance Search Bar & 1-Click Car Selector */}
      <SearchBarWithFilters
        lang={lang}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedQuality={selectedQuality}
        setSelectedQuality={setSelectedQuality}
        selectedHub={selectedHub}
        setSelectedHub={setSelectedHub}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        inStockOnly={inStockOnly}
        setInStockOnly={setInStockOnly}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalResults={filteredParts.length}
      />

      {/* Price Barometer Strip */}
      <div className="bg-slate-900 text-white py-2 px-4 border-b border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-bold text-autoblue-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{filteredParts.length} {lang === 'ar' ? 'قطعة مفهرسة' : 'pièces répertoriées'}</span>
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            {filteredParts.length > 0 && (
              <span className="hidden sm:inline text-slate-300">
                {lang === 'ar' ? 'يبدأ السعر من:' : 'Dès'} <strong className="text-emerald-400 font-black">{minPrice.toLocaleString()} DA</strong>
              </span>
            )}
            {filteredParts.length > 0 && (
              <span className="hidden md:inline text-slate-400">
                ({lang === 'ar' ? 'متوسط السعر:' : 'Moyenne :'} {avgPrice.toLocaleString()} DA)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'توفير حتى 65% في لاكاس' : 'Jusqu\'à -65% en Casse'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4">
        
        {/* Split View (Desktop default: List on left 45%, Map on right 55%) */}
        {viewMode === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            {/* Left Column: Results List */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                  {lang === 'ar' ? 'عروض قطع الغيار' : 'Offres disponibles'}
                </span>
                <span className="text-xs font-bold text-slate-600">
                  {filteredParts.length} {lang === 'ar' ? 'عرض' : 'résultats'}
                </span>
              </div>

              <PartsList
                lang={lang}
                parts={filteredParts}
                selectedPart={selectedPart}
                onSelectPart={setSelectedPart}
                onOpenDetail={(p) => setDetailModalPart(p)}
                onShowOnMap={handleShowOnMap}
                onVote={handleVote}
                onDeleteScammer={handleDeleteScammer}
              />
            </div>

            {/* Right Column: Interactive Map */}
            <div className="lg:col-span-7 sticky top-[175px] h-[calc(100vh-200px)] min-h-[500px]">
              <PartsMap
                lang={lang}
                parts={filteredParts}
                selectedPart={selectedPart}
                onSelectPart={setSelectedPart}
                onVote={handleVote}
                onDeletePart={handleDeleteScammer}
              />
            </div>
          </div>
        )}

        {/* Condensed PartSouq-style OEM Table View */}
        {viewMode === 'table' && (
          <div className="space-y-3">
            <PartsouqCondensedTable
              lang={lang}
              parts={filteredParts}
              selectedPart={selectedPart}
              onSelectPart={setSelectedPart}
              onOpenDetail={(p) => setDetailModalPart(p)}
              onShowOnMap={handleShowOnMap}
            />
          </div>
        )}

        {/* Full List View */}
        {viewMode === 'list' && (
          <div className="max-w-3xl mx-auto space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                {lang === 'ar' ? 'قائمة قطع الغيار' : 'Liste complète des pièces'}
              </span>
              <span className="text-xs font-bold text-slate-600">
                {filteredParts.length} {lang === 'ar' ? 'عرض' : 'résultats'}
              </span>
            </div>

            <PartsList
              lang={lang}
              parts={filteredParts}
              selectedPart={selectedPart}
              onSelectPart={setSelectedPart}
              onOpenDetail={(p) => setDetailModalPart(p)}
              onShowOnMap={handleShowOnMap}
              onVote={handleVote}
              onDeleteScammer={handleDeleteScammer}
            />
          </div>
        )}

        {/* Full Map View */}
        {viewMode === 'map' && (
          <div className="h-[calc(100vh-170px)] min-h-[480px]">
            <PartsMap
              lang={lang}
              parts={filteredParts}
              selectedPart={selectedPart}
              onSelectPart={setSelectedPart}
              onVote={handleVote}
              onDeletePart={handleDeleteScammer}
            />
          </div>
        )}

      </main>

      {/* Floating PWA Install Bar for Mobile & First Visit */}
      {showInstallBanner && (
        <div className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] left-3 right-3 max-w-sm mx-auto z-40 bg-slate-950 text-white p-2.5 sm:p-3 rounded-2xl shadow-2xl flex items-center justify-between border border-slate-800 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
              <img src="/favicon.svg" alt="DZPIECE" className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black text-white leading-tight truncate">DZPIECE</p>
              <p className="text-[10px] text-slate-400 font-semibold truncate">
                {lang === 'ar' ? 'تثبيت التطبيق على هاتفك' : 'Épingler l\'appli sur l\'accueil'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleNativeInstall}
              className="px-2.5 py-1.5 bg-gradient-to-r from-autoblue-600 to-autoblue-500 hover:from-autoblue-500 hover:to-autoblue-400 active:scale-95 text-white font-black text-[11px] rounded-xl shadow-xs transition"
            >
              {lang === 'ar' ? 'تثبيت' : 'Installer'}
            </button>
            <button
              type="button"
              onClick={() => setShowInstallBanner(false)}
              className="text-slate-400 hover:text-white p-1 text-sm font-bold"
              title="Fermer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <SellerModal
        lang={lang}
        isOpen={isSellerModalOpen}
        onClose={() => setIsSellerModalOpen(false)}
        onAddPart={handleAddPart}
      />

      <PartDetailModal
        lang={lang}
        part={detailModalPart}
        onClose={() => setDetailModalPart(null)}
        onShowOnMap={handleShowOnMap}
        onVote={handleVote}
        onDeleteScammer={handleDeleteScammer}
      />

      <InstallModal
        lang={lang}
        isOpen={isInstallOpen}
        onClose={() => setIsInstallOpen(false)}
        onNativeInstall={handleNativeInstall}
        canNativeInstall={!!deferredPrompt}
      />

    </div>
  );
}

export default App;
