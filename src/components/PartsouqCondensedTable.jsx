import React, { useState } from 'react';
import {
  Copy,
  Check,
  Phone,
  MessageCircle,
  MapPin,
  ExternalLink,
  Eye,
  Info,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowUpDown
} from 'lucide-react';
import { BrandLogo } from './BrandLogos';

export function PartsouqCondensedTable({
  lang,
  parts,
  selectedPart,
  onSelectPart,
  onOpenDetail,
  onShowOnMap
}) {
  const isAr = lang === 'ar';
  const [copiedRef, setCopiedRef] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'stock', 'order', 'catalog'

  const handleCopyRef = (ref, e) => {
    e.stopPropagation();
    if (!ref) return;
    navigator.clipboard?.writeText(ref);
    setCopiedRef(ref);
    setTimeout(() => setCopiedRef(null), 2000);
  };

  // Filter parts by catalog status
  const displayedParts = parts.filter((p) => {
    if (statusFilter === 'stock') return p.in_stock;
    if (statusFilter === 'order') return !p.in_stock && p.store_name;
    if (statusFilter === 'catalog') return !p.store_name || p.is_catalog_only;
    return true;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      
      {/* Top Bar: Table Stats & Quick Category Tabs */}
      <div className="p-3 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-autoblue-400 shrink-0" />
          <div>
            <h3 className="font-bold text-xs sm:text-sm tracking-tight flex items-center gap-1.5">
              <span>{isAr ? 'كتالوج ومراجع قطع الغيار (PartSouq style)' : 'Catalogue Condensé des Références OEM'}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-autoblue-300 font-mono border border-slate-700">
                {displayedParts.length}
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">
              {isAr ? 'كل القطع برقم المصنع (سواء متوفرة حالياً في المحلات أو كمرجع رسمي في الكتالوج)' : 'Toutes les pièces par référence constructeur (en vente magasin ou répertoire catalogue)'}
            </p>
          </div>
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-1 text-[11px] font-bold">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-2.5 py-1 rounded-lg transition ${
              statusFilter === 'all'
                ? 'bg-slate-800 text-white border border-slate-700 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isAr ? 'الكل' : 'Tous'} ({parts.length})
          </button>
          
          <button
            onClick={() => setStatusFilter('stock')}
            className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 ${
              statusFilter === 'stock'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                : 'text-slate-400 hover:text-emerald-400'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>{isAr ? 'في المحل' : 'En stock'}</span>
          </button>

          <button
            onClick={() => setStatusFilter('order')}
            className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 ${
              statusFilter === 'order'
                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                : 'text-slate-400 hover:text-amber-400'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>{isAr ? 'بالطلب 24h' : 'Sur commande'}</span>
          </button>
        </div>
      </div>

      {/* Condensed Data Table */}
      <div className="overflow-x-auto max-h-[calc(100vh-220px)] overflow-y-auto">
        <table className="w-full text-left text-xs border-collapse">
          
          {/* Table Header */}
          <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] tracking-wider sticky top-0 z-10 border-b border-slate-200 select-none">
            <tr>
              <th className="py-2.5 px-3 whitespace-nowrap">{isAr ? 'رقم القطعة OEM' : 'Réf. Constructeur (OEM)'}</th>
              <th className="py-2.5 px-3 min-w-[200px]">{isAr ? 'اسم القطعة والتوافق' : 'Désignation & Compatibilité'}</th>
              <th className="py-2.5 px-3 whitespace-nowrap">{isAr ? 'المجموعة / النظام' : 'Groupe Schéma'}</th>
              <th className="py-2.5 px-3 whitespace-nowrap">{isAr ? 'الحالة والمصدر' : 'État & Origine'}</th>
              <th className="py-2.5 px-3 whitespace-nowrap">{isAr ? 'التوفر' : 'Disponibilité'}</th>
              <th className="py-2.5 px-3 text-right whitespace-nowrap">{isAr ? 'السعر' : 'Prix (DZD)'}</th>
              <th className="py-2.5 px-3 text-center whitespace-nowrap">{isAr ? 'اتصال / حجز' : 'Action'}</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100">
            {displayedParts.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400 font-semibold">
                  {isAr ? 'لا توجد قطع مطابقة لهذا الفلتر' : 'Aucune pièce ne correspond à ce filtre.'}
                </td>
              </tr>
            ) : (
              displayedParts.map((part) => {
                const isSelected = selectedPart && selectedPart.id === part.id;
                const isCopied = copiedRef === part.reference;

                return (
                  <tr
                    key={part.id}
                    onClick={() => {
                      onSelectPart(part);
                      onShowOnMap(part);
                    }}
                    className={`transition-colors cursor-pointer hover:bg-slate-50/90 ${
                      isSelected ? 'bg-autoblue-50/50 ring-1 ring-autoblue-500/20' : ''
                    }`}
                  >
                    
                    {/* Column 1: OEM Reference with 1-click copy */}
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="bg-slate-100 hover:bg-slate-200 px-1.5 py-0.5 rounded text-[11px] border border-slate-200 text-slate-800">
                          {part.reference || 'REF-STD'}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleCopyRef(part.reference, e)}
                          title="Copier la référence constructeur"
                          className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition"
                        >
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Column 2: Designation, Arabic translation & Compatible vehicle badges */}
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <BrandLogo brand={part.brand} className="w-4 h-4 text-slate-600 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-900 leading-snug">
                            {part.name}
                          </p>
                          {part.name_ar && (
                            <p className="text-[10px] font-semibold text-slate-500" dir="rtl">
                              {part.name_ar}
                            </p>
                          )}
                          <div className="flex items-center gap-1 flex-wrap mt-0.5">
                            {part.compatible_models.slice(0, 2).map((cm, i) => (
                              <span
                                key={i}
                                className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200/60"
                              >
                                {cm}
                              </span>
                            ))}
                            {part.compatible_models.length > 2 && (
                              <span className="text-[9px] text-slate-400 font-semibold">
                                +{part.compatible_models.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Column 3: Schematic Group / Sub-system */}
                    <td className="py-2.5 px-3 text-slate-600 font-medium whitespace-nowrap">
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        {part.category === 'moteur' ? '⚙️ Moteur / Distr.' :
                         part.category === 'freinage' ? '🛑 Freinage' :
                         part.category === 'filtration' ? '🛢️ Filtration' :
                         part.category === 'suspension' ? '🔄 Train / Amort.' :
                         part.category === 'embrayage' ? '🕹️ Embrayage' :
                         part.category === 'carrosserie' ? '💡 Carrosserie' :
                         part.category === 'electricite' ? '🔋 Électricité' : '🔧 Pièce Auto'}
                      </span>
                    </td>

                    {/* Column 4: Quality & Brand of part */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        part.quality === 'oem'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : part.quality === 'casse'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-sky-50 text-sky-800 border border-sky-200'
                      }`}>
                        {part.part_brand}
                      </span>
                    </td>

                    {/* Column 5: Availability */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      {part.in_stock ? (
                        <div className="flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>{isAr ? 'متوفر' : 'En stock'}</span>
                          <span className="text-[10px] font-normal text-slate-500">
                            ({part.commune})
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-amber-700 font-bold text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          <span>{isAr ? '24h بالطلب' : 'Sur commande'}</span>
                        </div>
                      )}
                    </td>

                    {/* Column 6: Price */}
                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <span className="font-black text-slate-900 text-xs sm:text-sm">
                        {part.price_dzd.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 ml-1">DA</span>
                    </td>

                    {/* Column 7: Quick Actions */}
                    <td className="py-2.5 px-3 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1">
                        
                        {/* Call */}
                        {part.phone && (
                          <a
                            href={`tel:${part.phone.replace(/\s/g, '')}`}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                            title="Appeler le vendeur"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {/* WhatsApp */}
                        {part.whatsapp && (
                          <a
                            href={`https://wa.me/${part.whatsapp}?text=Salam%20disponible%20ref%20${encodeURIComponent(part.reference)}%20${encodeURIComponent(part.name)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition border border-emerald-200"
                            title="Vérifier dispo sur WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {/* View on Map */}
                        <button
                          type="button"
                          onClick={() => onShowOnMap(part)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                          title="Localiser sur la carte"
                        >
                          <MapPin className="w-3.5 h-3.5 text-autoblue-600" />
                        </button>

                        {/* Full details */}
                        <button
                          type="button"
                          onClick={() => onOpenDetail(part)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                          title="Fiche technique complète"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>

        </table>
      </div>

      {/* Footer bar: Total & PartSouq-like index tip */}
      <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span>💡 <strong>Astuce :</strong> Cliquez sur n'importe quelle référence pour la copier directement ou envoyer une demande WhatsApp au magasin.</span>
        </div>
        <div className="font-mono text-slate-600">
          Base : <strong>{displayedParts.length}</strong> références condensées
        </div>
      </div>

    </div>
  );
}
