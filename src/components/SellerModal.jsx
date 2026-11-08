import React, { useState } from 'react';
import { X, Store, MapPin, CheckCircle2, ShieldCheck, Tag, Car, Phone, Navigation } from 'lucide-react';
import { BRANDS, MODELS_BY_BRAND, PART_CATEGORIES, HUBS_ALGER } from '../data/autoData';

export function SellerModal({ lang, isOpen, onClose, onAddPart }) {
  const isAr = lang === 'ar';

  const [name, setName] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [brand, setBrand] = useState('renault');
  const [model, setModel] = useState('symbol');
  const [category, setCategory] = useState('freinage');
  const [quality, setQuality] = useState('adaptable');
  const [partBrand, setPartBrand] = useState('Valeo');
  const [reference, setReference] = useState('');
  const [priceDzd, setPriceDzd] = useState('');
  const [warranty, setWarranty] = useState('Garantie essai 15 jours');
  const [storeName, setStoreName] = useState('');
  const [commune, setCommune] = useState('Oued Smar');
  const [phone, setPhone] = useState('0550 00 11 22');
  const [whatsapp, setWhatsapp] = useState('213550001122');
  
  // GPS position
  const [gpsCoords, setGpsCoords] = useState({ lat: 36.7025, lng: 3.1610 });
  const [isGpsLoading, setIsGpsLoading] = useState(false);
  const [gpsSuccess, setGpsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCaptureGps = () => {
    if (!navigator.geolocation) {
      alert(isAr ? 'الموقع الجغرافي غير مدعوم' : 'Géolocalisation non supportée');
      return;
    }
    setIsGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsGpsLoading(false);
        setGpsCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setGpsSuccess(true);
      },
      () => {
        setIsGpsLoading(false);
        alert(isAr ? 'تعذر جلب الموقع الجغرافي' : 'Impossible de récupérer la position GPS');
      },
      { enableHighAccuracy: true }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !priceDzd || !storeName.trim()) {
      alert(isAr ? 'يرجى ملء جميع الحقول الإلزامية' : 'Veuillez remplir les champs obligatoires');
      return;
    }

    const newPart = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      name_ar: nameAr.trim() || name.trim(),
      category,
      brand,
      model,
      compatible_models: [`${brand.toUpperCase()} ${model.toUpperCase()}`],
      quality,
      part_brand: partBrand || 'Origine / Adaptable',
      reference: reference || 'REF-DZ',
      price_dzd: parseInt(priceDzd, 10),
      warranty,
      in_stock: true,
      condition: quality === 'casse' ? 'Occasion Casse vérifiée' : 'Neuf sous blister',
      store_name: storeName.trim(),
      store_type: quality === 'casse' ? 'Casse Auto' : 'Magasin Pièces',
      commune,
      hub_id: 'oued-smar',
      phone: phone.trim(),
      whatsapp: whatsapp.replace(/\D/g, ''),
      address: `${storeName}, ${commune}`,
      lat: gpsCoords.lat,
      lng: gpsCoords.lng,
      distance_km: 2.5,
      rating: 5.0,
      reviews_count: 1,
      updated_at: 'À l\'instant'
    };

    onAddPart(newPart);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-amber-100 text-amber-800 rounded-2xl shadow-xs">
              <Store className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base leading-tight">
                {isAr ? 'إضافة قطعة أو وصول لاكاس جديد' : 'Publier une Pièce / Arrivage Casse'}
              </h3>
              <p className="text-[11px] text-slate-400 font-bold">
                {isAr ? 'خاص بالمحلات وتجار لاكاس في الجزائر' : 'Pour magasins de pièces, grossistes et casses auto'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          
          {/* Quick OEM Template Selector (PartSouq Style) */}
          <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1.5 flex items-center gap-1">
              <span>⚡</span>
              <span>{isAr ? 'اختيار سريع لقطعة نموذجية (PartSouq Catalogue) :' : 'Remplissage rapide par pièce type :'}</span>
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {[
                { label: 'Kit Distribution', fr: 'Kit de Distribution complet (Courroie + Galet + Pompe à eau)', ar: 'طقم سير التوزيع كامل مع مضخة الماء (لاشين)', cat: 'moteur', brand: 'Gates / INA', war: 'Garantie 50 000 km' },
                { label: 'Kit Embrayage', fr: 'Kit d\'Embrayage complet (Disque + Plateau + Butée)', ar: 'طقم ديبراياج كامل مع البوتي', cat: 'embrayage', brand: 'Valeo / LuK', war: 'Garantie 6 mois' },
                { label: 'Plaquettes Avant', fr: 'Jeu de Plaquettes de frein avant haute endurance', ar: 'طقم بلاكيط فرامل أمامي أصلي', cat: 'freinage', brand: 'Brembo / Ferodo', war: 'Certifié équilibrage' },
                { label: 'Disques de Frein', fr: 'Paire de Disques de frein avant ventilés', ar: 'زوج ديسك فرامل أمامي مهوى', cat: 'freinage', brand: 'Brembo / Bosch', war: 'Garantie sans voilage' },
                { label: 'Amortisseurs Avant', fr: 'Amortisseurs avant à gaz renforcés', ar: 'مساعد الصدمات الأمامي غاز', cat: 'suspension', brand: 'Sachs / Monroe', war: 'Garantie 40 000 km' },
                { label: 'Turbo Garret', fr: 'Turbo complet avec capsule de régulation', ar: 'تيربو كامل مع صمام التحكم', cat: 'moteur', brand: 'Garrett Motion', war: 'Garantie 1 an' },
                { label: 'Vanne EGR', fr: 'Vanne EGR électrique avec refroidisseur', ar: 'صمام إي جي آر كهربائي مع المبرد', cat: 'moteur', brand: 'Valeo Origine', war: 'Garantie 1 an' },
                { label: 'Alternateur 120A', fr: 'Alternateur 120A régulateur intégré', ar: 'دينامو شحن 120 أمبير', cat: 'electricite', brand: 'Valeo / Bosch', war: 'Garantie 6 mois' },
                { label: 'Injecteur dCi/TDI', fr: 'Injecteur Common Rail piezo-électrique', ar: 'حاقن مازوت ديزل أصلي', cat: 'moteur', brand: 'Delphi / Bosch', war: 'Garantie avec fiche banc' },
                { label: 'Crémaillère', fr: 'Crémaillère de direction assistée avec biellettes', ar: 'كريمايار الاتجاه الهيدروليكي', cat: 'suspension', brand: 'Origine Constructeur', war: 'Garantie 1 an' }
              ].map((tpl, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setName(tpl.fr);
                    setNameAr(tpl.ar);
                    setCategory(tpl.cat);
                    setPartBrand(tpl.brand);
                    setWarranty(tpl.war);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-autoblue-50 border border-slate-200 hover:border-autoblue-400 text-slate-700 hover:text-autoblue-800 text-[11px] font-bold whitespace-nowrap transition active:scale-95 shrink-0 shadow-2xs"
                >
                  + {tpl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Part Name */}
          <div>
            <label className="block font-black text-slate-700 mb-1">
              {isAr ? 'اسم القطعة (بالفرنسية أو الدارجة) *' : 'Nom de la pièce *'}
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Kit Embrayage, Plaquettes avant, Pare-choc..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border-2 border-slate-200 focus:border-autoblue-600 rounded-xl font-bold text-slate-800 outline-none transition"
            />
          </div>

          {/* Vehicle Compatibility (Brand & Model) */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-black text-slate-700 mb-1">
                {isAr ? 'الماركة *' : 'Marque véhicule *'}
              </label>
              <select
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                  const models = MODELS_BY_BRAND[e.target.value] || [];
                  if (models.length > 0) setModel(models[0].id);
                }}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 outline-none"
              >
                {BRANDS.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-black text-slate-700 mb-1">
                {isAr ? 'الموديل *' : 'Modèle *'}
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 outline-none"
              >
                {(MODELS_BY_BRAND[brand] || []).map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quality State (OEM / Adaptable / Casse) */}
          <div>
            <label className="block font-black text-slate-700 mb-1">
              {isAr ? 'حالة القطعة *' : 'État de la pièce *'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setQuality('oem')}
                className={`py-2 px-1 rounded-xl text-center font-black border transition ${
                  quality === 'oem'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-500/20'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                🟢 OEM Origine
              </button>
              <button
                type="button"
                onClick={() => setQuality('adaptable')}
                className={`py-2 px-1 rounded-xl text-center font-black border transition ${
                  quality === 'adaptable'
                    ? 'bg-sky-50 border-sky-500 text-sky-800 ring-2 ring-sky-500/20'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                🔵 Adaptable
              </button>
              <button
                type="button"
                onClick={() => setQuality('casse')}
                className={`py-2 px-1 rounded-xl text-center font-black border transition ${
                  quality === 'casse'
                    ? 'bg-amber-50 border-amber-500 text-amber-900 ring-2 ring-amber-500/20'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                🟠 La Casse
              </button>
            </div>
          </div>

          {/* Price & Warranty */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-black text-slate-700 mb-1">
                {isAr ? 'السعر (دج) *' : 'Prix en Dinars (DA) *'}
              </label>
              <input
                type="number"
                required
                placeholder="Ex: 8500"
                value={priceDzd}
                onChange={(e) => setPriceDzd(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-black text-autoblue-600 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block font-black text-slate-700 mb-1">
                {isAr ? 'الضمان الممنوح' : 'Garantie'}
              </label>
              <select
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 outline-none"
              >
                <option value="Garantie essai 15 jours">Essai 15 jours</option>
                <option value="Garantie 1 mois">Garantie 1 mois</option>
                <option value="Garantie 6 mois">Garantie 6 mois</option>
                <option value="Garantie 1 an">Garantie 1 an</option>
                <option value="Sans garantie">Sans garantie</option>
              </select>
            </div>
          </div>

          {/* Store Name & Commune */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-black text-slate-700 mb-1">
                {isAr ? 'اسم المحل أو لاكاس *' : 'Nom Magasin / Casse *'}
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Casse Baraki El-Nadjah"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 outline-none"
              />
            </div>

            <div>
              <label className="block font-black text-slate-700 mb-1">
                {isAr ? 'البلدية / المنطقة *' : 'Commune *'}
              </label>
              <select
                value={commune}
                onChange={(e) => setCommune(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 outline-none"
              >
                <option value="Oued Smar">Oued Smar</option>
                <option value="Baraki">Baraki</option>
                <option value="Birkhadem">Birkhadem</option>
                <option value="Kouba">Kouba</option>
                <option value="Bab Ezzouar">Bab Ezzouar</option>
                <option value="Boufarik">Boufarik</option>
                <option value="Rouiba">Rouiba</option>
              </select>
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-black text-slate-700 mb-1">
                {isAr ? 'رقم الهاتف *' : 'Numéro Téléphone *'}
              </label>
              <input
                type="tel"
                required
                placeholder="0550 12 34 56"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 outline-none"
              />
            </div>

            <div>
              <label className="block font-black text-slate-700 mb-1">
                {isAr ? 'رقم الواتساب' : 'WhatsApp'}
              </label>
              <input
                type="tel"
                placeholder="213550123456"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 outline-none"
              />
            </div>
          </div>

          {/* GPS Position */}
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-autoblue-600" />
              <div>
                <p className="font-extrabold text-slate-800">
                  {isAr ? 'تثبيت موقع المحل على الخريطة' : 'Localisation GPS magasin'}
                </p>
                <p className="text-[10px] text-slate-400">
                  {gpsSuccess ? 'Position GPS certifiée ✅' : 'Position par défaut sur la commune'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCaptureGps}
              disabled={isGpsLoading}
              className="px-2.5 py-1.5 bg-autoblue-600 text-white rounded-lg font-bold text-[11px] active:scale-95 transition"
            >
              {isGpsLoading ? '...' : (isAr ? 'تحديد بـ GPS' : 'Mon GPS')}
            </button>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black rounded-2xl shadow-lg shadow-amber-500/20 active:scale-[0.98] transition text-sm flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{isAr ? 'نشر القطعة على الخريطة فوراً' : 'Publier sur la carte immédiatement'}</span>
          </button>

        </form>

      </div>
    </div>
  );
}
