import React from 'react';
import { PlusCircle, Layers, Map as MapIcon, List, Table, Store } from 'lucide-react';
import { DzPieceEmblem } from './BrandLogos';

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
    <header className="sticky top-0 z-50 bg-slate-950 text-white border-b border-slate-800/90 select-none">
      
      {/* Top Banner: Brand, Actions, View Mode & Language */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex items-center justify-between gap-2">
        
        {/* Left: Minimalist Emblem, Title & Slogan */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-autoblue-500 to-autoblue-700 flex items-center justify-center text-white shadow-sm shadow-autoblue-500/25 shrink-0">
            <DzPieceEmblem className="w-4 h-4 text-white" />
          </div>
          <div className="shrink-0">
            <h1 className="font-black text-lg tracking-tight text-white leading-none flex items-center gap-0.5">
              <span>DZ</span>
              <span className="text-autoblue-400">PIECE</span>
            </h1>
            <p className="text-[9px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">
              {isAr ? 'قطع غيار السيارات' : 'PIÈCES DE RECHANGE'}
            </p>
          </div>
        </div>

        {/* Center/Right Actions: Single Seller Button + Views + Lang + Déposer */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Single Vendeur / Casse Button (No Dual Mode Switcher) */}
          <button
            onClick={onOpenSellerModal}
            className="h-8 px-2.5 sm:px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-bold transition flex items-center gap-1.5 active:scale-95 shrink-0"
            title="Espace réservé aux vendeurs, magasins et casses auto"
          >
            <Store className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="hidden md:inline">{isAr ? 'فضاء البائع ولاكاس' : 'Espace Vendeur'}</span>
            <span className="hidden sm:inline md:hidden">{isAr ? 'بائع' : 'Vendeur'}</span>
          </button>

          {/* View Mode Toggle: Split / OEM Table Condensée (PartSouq) / Cards List / Map */}
          <div className="flex items-center bg-slate-900 p-0.5 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setViewMode('split')}
              className={`h-7 px-2 rounded-lg text-xs font-bold transition hidden xl:flex items-center gap-1 ${
                viewMode === 'split' ? 'bg-autoblue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
              title="Vue combinée (Carte + Fiches)"
            >
              <Layers className="w-3.5 h-3.5" />
            </button>

            {/* PartSouq Condensed Table View */}
            <button
              onClick={() => setViewMode('table')}
              className={`h-7 px-2.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                viewMode === 'table' ? 'bg-autoblue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
              title="Vue Condensée OEM (Tableau PartSouq)"
            >
              <Table className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px] font-bold">OEM</span>
            </button>

            {/* List / Cards View */}
            <button
              onClick={() => setViewMode('list')}
              className={`h-7 px-2 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                viewMode === 'list' ? 'bg-autoblue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
              title="Vue Fiches"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px] font-bold">{isAr ? 'قائمة' : 'Fiches'}</span>
            </button>

            {/* Map View */}
            <button
              onClick={() => setViewMode('map')}
              className={`h-7 px-2 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                viewMode === 'map' ? 'bg-autoblue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
              title="Vue Carte"
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px] font-bold">{isAr ? 'خريطة' : 'Carte'}</span>
            </button>
          </div>

          {/* Minimalist Language Pill */}
          <button
            onClick={() => setLang(isAr ? 'fr' : 'ar')}
            className="h-8 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-800 active:scale-95 transition shrink-0"
            title="Langue / اللغة"
          >
            {isAr ? 'FR' : 'عربي'}
          </button>

          {/* CTA Déposer pièce: On mobile ONLY the Plus icon shows, no duplicate character */}
          <button
            onClick={onOpenSellerModal}
            className="h-8 px-2.5 sm:px-3 rounded-xl bg-gradient-to-r from-autoblue-600 to-autoblue-500 hover:from-autoblue-500 hover:to-autoblue-400 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm shadow-autoblue-600/25 shrink-0"
            title="Publier une pièce ou un arrivage de casse"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.2] shrink-0" />
            <span className="hidden sm:inline">{isAr ? 'نشر قطعة' : 'Déposer pièce'}</span>
          </button>

        </div>
      </div>

    </header>
  );
}
