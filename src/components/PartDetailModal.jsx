import React from 'react';
import { X, Phone, MessageCircle, MapPin, ShieldCheck, CheckCircle2, Car, Store, ExternalLink, ThumbsUp, ThumbsDown, Trash2 } from 'lucide-react';

export function PartDetailModal({ lang, part, onClose, onShowOnMap, onVote, onDeleteScammer }) {
  const isAr = lang === 'ar';
  if (!part) return null;

  const isOEM = part.quality === 'oem';
  const isCasse = part.quality === 'casse';
  const isReported = (part.downvotes || 0) > 0;

  return (
    <div className="fixed inset-0 z-[99999] bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto space-y-4">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
              <span
                className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                  isOEM
                    ? 'bg-emerald-100 text-emerald-800'
                    : isCasse
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-sky-100 text-sky-800'
                }`}
              >
                {isOEM ? '🟢 Origine OEM' : isCasse ? '🟠 Casse / Occasion' : '🔵 Neuf Adaptable'}
              </span>
              <span className="text-xs font-extrabold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                {part.part_brand}
              </span>
            </div>
            <h3 className="font-black text-lg text-slate-900 leading-tight">
              {part.name}
            </h3>
            {part.name_ar && (
              <p className="text-xs font-bold text-slate-500 mt-0.5" dir="rtl">
                {part.name_ar}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Price Tag */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {isAr ? 'السعر المقترح' : 'Prix affiché'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-autoblue-600 tracking-tight">
                {part.price_dzd.toLocaleString()}
              </span>
              <span className="text-sm font-black text-slate-900">DA</span>
            </div>
          </div>

          {part.price_comparison_note && (
            <div className="text-right max-w-[170px]">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200 inline-block">
                💡 {part.price_comparison_note}
              </span>
            </div>
          )}
        </div>

        {/* Anti-Scam Community Voting Box */}
        <div className="bg-slate-100 p-2.5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-black text-slate-800">
              {isAr ? 'تقييم مصداقية البائع' : 'Confiance & Anti-Arnaque'}
            </p>
            <p className="text-[10px] text-slate-500">
              {isReported ? '⚠️ Offre signalée par la communauté' : 'Prix conforme et vérifié'}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onVote && onVote(part.id, true)}
              className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 rounded-xl text-xs font-black flex items-center gap-1 active:scale-95 transition"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{part.upvotes || 0}</span>
            </button>

            <button
              type="button"
              onClick={() => onVote && onVote(part.id, false)}
              className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-300 rounded-xl text-xs font-black flex items-center gap-1 active:scale-95 transition"
              title="Signaler arnaque"
            >
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>{part.downvotes || 0}</span>
            </button>
          </div>
        </div>

        {/* Specs Table */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500 font-bold">{isAr ? 'المرجع المصنعي' : 'Référence'}</span>
            <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
              {part.reference || 'N/A'}
            </span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500 font-bold">{isAr ? 'حالة القطعة' : 'État matériel'}</span>
            <span className="font-bold text-slate-800">{part.condition}</span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500 font-bold">{isAr ? 'الضمان' : 'Garantie'}</span>
            <span className="font-bold text-emerald-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{part.warranty}</span>
            </span>
          </div>

          <div>
            <span className="text-slate-500 font-bold block mb-1">
              {isAr ? 'المركبات المتوافقة' : 'Véhicules compatibles'} :
            </span>
            <div className="flex flex-wrap gap-1">
              {part.compatible_models.map((cm, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg text-[11px]"
                >
                  🚗 {cm}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Store Card */}
        <div className="bg-slate-900 text-white p-3.5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-autoblue-400" />
              <span className="font-black text-sm">{part.store_name}</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-autoblue-300">
              {part.store_type}
            </span>
          </div>

          <p className="text-xs text-slate-300 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span>{part.address}</span>
          </p>

          <p className="text-[11px] text-slate-400">
            📍 Situé à <strong>{part.commune}</strong> (~{part.distance_km} km de votre position)
          </p>
        </div>

        {/* Delete button if scam */}
        {isReported && (
          <button
            type="button"
            onClick={() => {
              if (onDeleteScammer) onDeleteScammer(part.id);
              onClose();
            }}
            className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95"
          >
            <Trash2 className="w-4 h-4" />
            <span>{isAr ? 'حذف هذا العرض نهائياً (احتيال)' : 'Supprimer définitivement cette arnaque'}</span>
          </button>
        )}

        {/* Direct Action CTAs */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <a
            href={`tel:${part.phone.replace(/\s/g, '')}`}
            className="py-3 bg-autoblue-600 hover:bg-autoblue-700 active:scale-95 text-white font-black text-xs rounded-2xl shadow-md flex items-center justify-center gap-1.5 transition"
          >
            <Phone className="w-4 h-4" />
            <span>{isAr ? 'اتصال مباشر' : 'Appeler direct'}</span>
          </a>

          <a
            href={`https://wa.me/${part.whatsapp}?text=Salam%20disponible%20${encodeURIComponent(part.name)}`}
            target="_blank"
            rel="noreferrer"
            className="py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs rounded-2xl shadow-md flex items-center justify-center gap-1.5 transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        </div>

        <button
          onClick={() => {
            onShowOnMap(part);
            onClose();
          }}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
        >
          <MapPin className="w-4 h-4 text-autoblue-600" />
          <span>{isAr ? 'عرض الموقع على الخريطة' : 'Localiser sur la carte interactive'}</span>
        </button>

      </div>
    </div>
  );
}
