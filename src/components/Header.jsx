import React from 'react';
import { Wrench, MapPin, PlusCircle, Globe, Car, Store, ShoppingBag, Layers, Map as MapIcon, List } from 'lucide-react';

export function Header({
  lang,
  setLang,
  userMode,
  setUserMode,
  viewMode,
  setViewMode,
  onOpenSellerModal,
  totalResults
}) {
  const isAr = lang === 'ar';

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-xl border-b border-slate-800">
      
      {/* Top Banner: Brand, Mode Switcher, Language & Actions */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        
        {/* Left: Brand & Algerian Flag Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-autoblue-500 to-autoblue-700 flex items-center justify-center text-white shadow-md shadow-autoblue-500/30">
            <Wrench className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-black text-2xl tracking-tight text-white flex items-center">
                <span>DZ</span>
                <span className="text-autoblue-400">PIECE</span>
              </h1>
              <span className="text-xs px-1.5 py-0.5 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-800 font-extrabold">
                DZ 🇩🇿
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-bold tracking-wide">
              {isAr ? 'ديزاد بياس · خريطة ومقارن قطع الغيار بالجزائر' : 'DZPIECE · Carte & Comparateur Pièces Auto'}
            </p>
          </div>
        </div>

        {/* Center: Mode Switcher (Acheteur vs Vendeur / Casse) */}
        <div className="hidden md:flex items-center bg-slate-800/90 p-1 rounded-2xl border border-slate-700">
          <button
            onClick={() => setUserMode('buyer')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              userMode === 'buyer'
                ? 'bg-autoblue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isAr ? 'باحث عن قطعة (مشتري)' : 'Trouver une pièce (Acheteur)'}</span>
          </button>
          
          <button
            onClick={() => setUserMode('seller')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              userMode === 'seller'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>{isAr ? 'فضاء المحلات ولاكاس (بائع)' : 'Espace Magasin & Casse'}</span>
          </button>
        </div>

        {/* Right: View Toggles & Add Part CTA */}
        <div className="flex items-center gap-2">
          
          {/* List / Map Switcher for Mobile & Desktop */}
          <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setViewMode('split')}
              className={`p-1.5 rounded-lg text-xs font-bold transition hidden lg:flex items-center gap-1 ${
                viewMode === 'split' ? 'bg-autoblue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Vue combinée (Carte + Liste)"
            >
              <Layers className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                viewMode === 'list' ? 'bg-autoblue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Vue Liste"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">{isAr ? 'قائمة' : 'Liste'}</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                viewMode === 'map' ? 'bg-autoblue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Vue Carte"
            >
              <MapIcon className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">{isAr ? 'خريطة' : 'Carte'}</span>
            </button>
          </div>

          {/* Language Switch */}
          <button
            onClick={() => setLang(isAr ? 'fr' : 'ar')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1 border border-slate-700 active:scale-95 transition"
            title="Langue / اللغة"
          >
            <Globe className="w-3.5 h-3.5 text-autoblue-400" />
            <span>{isAr ? 'FR' : 'عربي'}</span>
          </button>

          {/* Primary CTA: + Déposer une pièce */}
          <button
            onClick={onOpenSellerModal}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 active:scale-95 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">{isAr ? 'إضافة قطعة أو وصول لاكاس' : '+ Publier Pièce'}</span>
            <span className="sm:hidden">{isAr ? '+ إضافة' : '+ Pièce'}</span>
          </button>

        </div>
      </div>

      {/* Mobile sub-bar: Profile switch (Acheteur / Vendeur) */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800 bg-slate-950/80 px-2 py-1.5 text-xs">
        <button
          onClick={() => setUserMode('buyer')}
          className={`flex-1 py-1 rounded-lg font-bold flex items-center justify-center gap-1.5 transition ${
            userMode === 'buyer' ? 'bg-autoblue-600 text-white' : 'text-slate-400'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{isAr ? 'وضع المشتري' : 'Mode Acheteur'}</span>
        </button>
        <button
          onClick={() => setUserMode('seller')}
          className={`flex-1 py-1 rounded-lg font-bold flex items-center justify-center gap-1.5 transition ${
            userMode === 'seller' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'
          }`}
        >
          <Store className="w-3.5 h-3.5" />
          <span>{isAr ? 'وضع بائع ولاكاس' : 'Mode Magasin / Casse'}</span>
        </button>
      </div>

    </header>
  );
}
