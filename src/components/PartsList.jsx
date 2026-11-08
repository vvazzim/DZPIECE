import React from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Eye,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Trash2
} from 'lucide-react';

export function PartsList({
  lang,
  parts,
  selectedPart,
  onSelectPart,
  onOpenDetail,
  onShowOnMap,
  onVote,
  onDeleteScammer
}) {
  const isAr = lang === 'ar';

  if (parts.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-sm space-y-3">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl">
          🔍
        </div>
        <h3 className="font-black text-lg text-slate-800">
          {isAr ? 'لم نجد أي قطعة مطابقة لبحثك' : 'Aucune pièce ne correspond à vos filtres'}
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          {isAr
            ? 'جرب البحث بكلمة أبسط مثل (سيمبول، لاشين، ديبراياج) أو اختر "كل الموديلات" و"كل المناطق"'
            : 'Essayez avec un mot-clé plus court (ex: Symbol, Embrayage, Plaquettes) ou élargissez la zone géographique.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {parts.map((part) => {
        const isSelected = selectedPart && selectedPart.id === part.id;
        const isOEM = part.quality === 'oem';
        const isCasse = part.quality === 'casse';
        const isReported = (part.downvotes || 0) > 0;

        return (
          <div
            key={part.id}
            onClick={() => {
              onSelectPart(part);
              onShowOnMap(part);
            }}
            className={`bg-white rounded-2xl border-2 transition-all duration-200 p-4 shadow-sm hover:shadow-md cursor-pointer ${
              isSelected
                ? 'border-autoblue-500 ring-4 ring-autoblue-500/15 bg-autoblue-50/20'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            {/* Top Row: Quality Tag, Hub & Availability */}
            <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
              <div className="flex items-center gap-1.5 flex-wrap">
                {/* State Badge */}
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1 ${
                    isOEM
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : isCasse
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-sky-100 text-sky-800 border border-sky-300'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  <span>{isOEM ? 'Origine OEM' : isCasse ? 'La Casse (Occasion)' : 'Neuf Adaptable'}</span>
                </span>

                {/* Brand of Part */}
                <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                  {part.part_brand}
                </span>

                {/* Reference */}
                {part.reference && (
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
                    Ref: {part.reference}
                  </span>
                )}
              </div>

              {/* In Stock Badge */}
              {part.in_stock ? (
                <span className="text-[11px] font-extrabold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isAr ? 'متوفر حالياً' : 'En stock'}</span>
                </span>
              ) : (
                <span className="text-[11px] font-bold text-amber-600">
                  {isAr ? 'على الطلب (24h)' : 'Sur commande 24h'}
                </span>
              )}
            </div>

            {/* Middle Row: Title & Vehicle Compatibility */}
            <div className="mb-3">
              <h3 className="font-black text-base text-slate-900 hover:text-autoblue-700 transition leading-snug">
                {part.name}
              </h3>
              {part.name_ar && (
                <p className="text-xs font-bold text-slate-500 mt-0.5" dir="rtl">
                  {part.name_ar}
                </p>
              )}

              {/* Compatible Vehicle Tags */}
              <div className="flex items-center gap-1.5 flex-wrap mt-1.5">
                {part.compatible_models.map((cm, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    🚗 {cm}
                  </span>
                ))}
              </div>
            </div>

            {/* Store & Warranty Info Bar */}
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 mb-3 flex items-center justify-between text-xs gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="text-slate-800 font-extrabold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>{part.store_name}</span>
                </div>
                <span className="text-slate-400">•</span>
                <span className="text-autoblue-700 font-black">
                  📍 {part.commune} (~{part.distance_km} km)
                </span>
              </div>

              {/* Warranty notice */}
              {part.warranty && (
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{part.warranty}</span>
                </div>
              )}
            </div>

            {/* Anti-Scam Alert Banner if reported */}
            {isReported && (
              <div
                className="bg-red-50 border border-red-200 p-2 rounded-xl mb-3 flex items-center justify-between text-xs text-red-800 font-bold"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{isAr ? '⚠️ تم الإبلاغ عن هذا العرض كاحتيال أو سعر مضلل' : '⚠️ Signalé comme arnaque ou faux prix'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onDeleteScammer(part.id)}
                  className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[10px] font-black flex items-center gap-1 active:scale-95 transition"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>{isAr ? 'حذف من القائمة' : 'Supprimer'}</span>
                </button>
              </div>
            )}

            {/* Bottom Row: Price + Like/Dislike + Direct Action CTAs */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-3 flex-wrap">
              
              {/* Price in Dinars */}
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-autoblue-600 tracking-tight">
                    {part.price_dzd.toLocaleString()}
                  </span>
                  <span className="text-xs font-black text-slate-900">DA</span>
                </div>
                {part.price_comparison_note && (
                  <p className="text-[10px] text-slate-500 font-bold">
                    {part.price_comparison_note}
                  </p>
                )}
              </div>

              {/* Community Like / Dislike (Anti-Arnaque) & CTAs */}
              <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                
                {/* Like Button */}
                <button
                  type="button"
                  onClick={() => onVote(part.id, true)}
                  className="px-2.5 py-1.5 rounded-xl border border-slate-200 hover:border-emerald-400 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-black text-xs flex items-center gap-1 transition active:scale-95"
                  title="Recommander ce vendeur (prix honnête)"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{part.upvotes || 0}</span>
                </button>

                {/* Dislike (Anti-Scam) Button */}
                <button
                  type="button"
                  onClick={() => onVote(part.id, false)}
                  className="px-2.5 py-1.5 rounded-xl border border-slate-200 hover:border-red-400 bg-slate-50 hover:bg-red-50 text-slate-700 hover:text-red-700 font-black text-xs flex items-center gap-1 transition active:scale-95"
                  title="Signaler arnaque ou faux prix"
                >
                  <ThumbsDown className="w-3.5 h-3.5 text-red-600" />
                  <span>{part.downvotes || 0}</span>
                </button>

                {/* Direct Phone Call */}
                <a
                  href={`tel:${part.phone.replace(/\s/g, '')}`}
                  className="px-3 py-2 bg-autoblue-600 hover:bg-autoblue-700 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition"
                  title="Appeler le vendeur"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isAr ? 'اتصال' : 'Appeler'}</span>
                </a>

                {/* WhatsApp Chat */}
                <a
                  href={`https://wa.me/${part.whatsapp}?text=Salam%20disponible%20${encodeURIComponent(part.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition"
                  title="Discuter sur WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>

                {/* Show on Map (Zoom Max) */}
                <button
                  type="button"
                  onClick={() => onShowOnMap(part)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 rounded-xl transition"
                  title="Zoomer sur la carte au maximum"
                >
                  <MapPin className="w-4 h-4 text-autoblue-600" />
                </button>

                {/* Full Details */}
                <button
                  type="button"
                  onClick={() => onOpenDetail(part)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 rounded-xl transition"
                  title="Voir détails complets"
                >
                  <Eye className="w-4 h-4" />
                </button>

              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}
