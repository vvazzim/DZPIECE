import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Layers, Navigation, Phone, ExternalLink, ShieldCheck, MapPin, Sparkles, ThumbsUp, ThumbsDown, AlertTriangle } from 'lucide-react';

export function PartsMap({
  lang,
  parts,
  selectedPart,
  onSelectPart,
  onVote,
  onDeletePart,
  centerCoords = { lat: 36.7025, lng: 3.1610 },
  zoom = 12
}) {
  const isAr = lang === 'ar';
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersLayerRef = useRef(null);
  const markersByIdRef = useRef({});

  const [mapStyle, setMapStyle] = useState('osm'); // 'osm' or 'satellite'

  // Global handler for popup buttons
  useEffect(() => {
    window.__votePart = (partId, isLike) => {
      if (onVote) onVote(partId, isLike);
    };
    window.__deleteScammer = (partId) => {
      if (onDeletePart) onDeletePart(partId);
    };
    return () => {
      delete window.__votePart;
      delete window.__deleteScammer;
    };
  }, [onVote, onDeletePart]);

  // Map Tile Config
  const getTileConfig = (style) => {
    if (style === 'satellite') {
      return {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: '&copy; Esri World Imagery'
      };
    }
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors'
    };
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [centerCoords.lat, centerCoords.lng],
        zoom: zoom,
        zoomControl: false,
        attributionControl: false
      });

      const config = getTileConfig(mapStyle);
      tileLayerRef.current = L.tileLayer(config.url, {
        attribution: config.attribution,
        maxZoom: 19
      }).addTo(map);

      L.control.zoom({ position: 'topright' }).addTo(map);

      // Create group for markers
      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;

      setTimeout(() => {
        map.invalidateSize();
      }, 200);
    }
  }, []);

  // Update Tile Style
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    mapInstanceRef.current.removeLayer(tileLayerRef.current);

    const config = getTileConfig(mapStyle);
    tileLayerRef.current = L.tileLayer(config.url, {
      attribution: config.attribution,
      maxZoom: 19
    }).addTo(mapInstanceRef.current);
  }, [mapStyle]);

  // Update Markers when parts or selectedPart change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();
    markersByIdRef.current = {};

    parts.forEach((part) => {
      const isSelected = selectedPart && selectedPart.id === part.id;

      // Color scheme based on quality
      const isOEM = part.quality === 'oem';
      const isCasse = part.quality === 'casse';
      const bgColor = isOEM ? '#10b981' : isCasse ? '#f97316' : '#0284c7';
      const labelText = isOEM ? 'OEM' : isCasse ? 'CASSE' : 'NEUF';

      // Perfectly sized compact pin (92px width x 32px height)
      const pinHtml = `
        <div style="position:relative; width:94px; height:32px; cursor:pointer;">
          <div style="
            background: ${bgColor};
            color: #ffffff;
            height: 25px;
            padding: 0 6px;
            border-radius: 12px;
            font-weight: 900;
            font-size: 11px;
            box-shadow: 0 3px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            border: 2px solid ${isSelected ? '#ffffff' : 'rgba(255,255,255,0.85)'};
            box-shadow: ${isSelected ? '0 0 0 3px #0284c7' : '0 2px 5px rgba(0,0,0,0.25)'};
            white-space: nowrap;
            overflow: hidden;
          ">
            <span style="background:rgba(0,0,0,0.28); padding:1px 4px; border-radius:4px; font-size:8px; font-weight:800; letter-spacing:0.3px;">
              ${labelText}
            </span>
            <span style="letter-spacing:-0.2px;">${part.price_dzd.toLocaleString()} DA</span>
          </div>
          <!-- Arrow pointer -->
          <div style="
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 6px solid ${bgColor};
            margin: -1px auto 0 auto;
          "></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'auto-part-map-pin',
        html: pinHtml,
        iconSize: [94, 32],
        iconAnchor: [47, 32]
      });

      const marker = L.marker([part.lat, part.lng], {
        icon: customIcon,
        zIndexOffset: isSelected ? 1000 : 100
      });

      // Popup Content with Direct Actions + Anti-Scam Buttons
      const popupHtml = `
        <div style="font-family:system-ui, sans-serif; padding:12px; min-width:250px; max-width:290px;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
            <span style="font-size:10px; font-weight:800; background:${bgColor}; color:white; padding:2px 6px; border-radius:6px;">
              ${isOEM ? 'ORIGINE OEM' : isCasse ? 'LA CASSE (OCCASION)' : 'NEUF ADAPTABLE'}
            </span>
            <span style="font-size:10px; font-weight:800; color:#059669;">
              📍 ${part.commune}
            </span>
          </div>

          <h4 style="font-size:13px; font-weight:900; margin:0 0 4px 0; color:#0f172a; line-height:1.2;">
            ${part.name}
          </h4>

          <p style="font-size:11px; color:#64748b; margin:0 0 8px 0; font-weight:600;">
            ${part.store_name} (~${part.distance_km} km)
          </p>

          <div style="display:flex; align-items:baseline; justify-content:space-between; border-top:1px solid #e2e8f0; padding-top:6px; margin-bottom:8px;">
            <span style="font-size:11px; font-weight:700; color:#64748b;">Prix :</span>
            <span style="font-size:18px; font-weight:900; color:#0284c7;">
              ${part.price_dzd.toLocaleString()} DA
            </span>
          </div>

          <!-- Direct Calls & WhatsApp -->
          <div style="display:flex; gap:6px; margin-bottom:8px;">
            <a href="tel:${part.phone.replace(/\\s/g, '')}" style="
              flex:1;
              background:#0284c7;
              color:white;
              text-align:center;
              padding:6px;
              border-radius:8px;
              font-size:11px;
              font-weight:800;
              text-decoration:none;
              display:flex;
              align-items:center;
              justify-content:center;
              gap:4px;
            ">
              📞 Appeler
            </a>

            <a href="https://wa.me/${part.whatsapp}?text=Salam%20disponible%20${encodeURIComponent(part.name)}" target="_blank" rel="noreferrer" style="
              flex:1;
              background:#10b981;
              color:white;
              text-align:center;
              padding:6px;
              border-radius:8px;
              font-size:11px;
              font-weight:800;
              text-decoration:none;
              display:flex;
              align-items:center;
              justify-content:center;
              gap:4px;
            ">
              💬 WhatsApp
            </a>
          </div>

          <!-- Anti-Scam / Community Trust Rating -->
          <div style="display:flex; align-items:center; justify-content:space-between; border-top:1px dashed #e2e8f0; padding-top:6px; font-size:10px;">
            <span style="color:#64748b; font-weight:700;">Avis communauté:</span>
            <div style="display:flex; gap:6px;">
              <button onclick="window.__votePart('${part.id}', true)" style="
                background:#ecfdf5;
                color:#059669;
                border:1px solid #a7f3d0;
                padding:3px 7px;
                border-radius:6px;
                cursor:pointer;
                font-weight:800;
              ">
                👍 Recommandé (${part.upvotes || 0})
              </button>
              <button onclick="window.__votePart('${part.id}', false)" style="
                background:#fef2f2;
                color:#dc2626;
                border:1px solid #fecaca;
                padding:3px 7px;
                border-radius:6px;
                cursor:pointer;
                font-weight:800;
              " title="Signaler arnaqueur / faux prix">
                👎 Arnaque (${part.downvotes || 0})
              </button>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        onSelectPart(part);
      });

      markersLayerRef.current.addLayer(marker);
      markersByIdRef.current[part.id] = marker;
    });

    // When clicking a part on the list: ZOOM IN TO MAX (zoom 16) & OPEN POPUP AUTOMATICALLY
    if (selectedPart && mapInstanceRef.current) {
      mapInstanceRef.current.setView([selectedPart.lat, selectedPart.lng], 16, {
        animate: true,
        duration: 0.8
      });

      const marker = markersByIdRef.current[selectedPart.id];
      if (marker) {
        setTimeout(() => {
          marker.openPopup();
        }, 300);
      }
    }
  }, [parts, selectedPart]);

  // Recenter Map
  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([36.7025, 3.1610], 12);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[400px] overflow-hidden bg-slate-100 rounded-2xl border border-slate-200 shadow-inner">
      
      {/* Floating Controls Overlay */}
      <div className="absolute top-3 right-3 z-[400] flex flex-col gap-2">
        {/* Toggle Satellite / Plan */}
        <button
          onClick={() => setMapStyle(mapStyle === 'osm' ? 'satellite' : 'osm')}
          className="bg-white/95 backdrop-blur-md p-2 rounded-xl shadow-lg border border-slate-200 text-slate-800 hover:bg-slate-50 active:scale-95 transition text-xs font-black flex items-center gap-1.5"
          title={mapStyle === 'osm' ? 'Vue Satellite' : 'Vue Plan'}
        >
          <Layers className="w-4 h-4 text-autoblue-600" />
          <span>{mapStyle === 'osm' ? '🛰️ Satellite' : '🗺️ Plan'}</span>
        </button>

        {/* Recenter button */}
        <button
          onClick={handleRecenter}
          className="bg-white/95 backdrop-blur-md p-2 rounded-xl shadow-lg border border-slate-200 text-slate-800 hover:bg-slate-50 active:scale-95 transition text-xs font-bold flex items-center gap-1.5"
          title="Centrer sur Alger"
        >
          <Navigation className="w-4 h-4 text-slate-600" />
          <span>{isAr ? 'المركز' : 'Alger'}</span>
        </button>
      </div>

      {/* Legend Badge Bottom-Left */}
      <div className="absolute bottom-3 left-3 z-[400] bg-slate-900/90 backdrop-blur-md text-white p-2.5 rounded-2xl shadow-xl border border-slate-700 text-[11px] font-bold space-y-1">
        <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
          {isAr ? 'دليل الألوان:' : 'Repères carte:'}
        </p>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>OEM Origine</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
            <span>Adaptable</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>La Casse</span>
          </span>
        </div>
      </div>

      {/* Actual Map Container */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[420px]" />

    </div>
  );
}
