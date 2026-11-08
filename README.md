# 🚗 DZPIECE (ديزاد بياس)
*Carte Interactive & Comparateur de Pièces Détachées Automobiles en Algérie*

---

## 🌟 À Propos
**DZPIECE** est la plateforme web et mobile dédiée à la recherche, la comparaison des prix en Dinars (DZD) et la géolocalisation des pièces détachées automobiles à Alger et en Algérie.

L'application agrège plus de **200 références de pièces réelles** issues des plateformes spécialisées (Dizness.com, Ouedkniss) et des hauts lieux de la pièce automobile :
* **Oued Smar** : Hub national des grossistes et magasins de pièces neuves.
* **Baraki & Les Eucalyptus** : Sanctuaire de la casse auto, moteurs d'occasion et carrosserie.
* **Birkhadem & Saoula** : Spécialistes des marques françaises et du groupe VAG (Volkswagen, Seat, Audi, Skoda).
* **Jolie Vue / Kouba**, **Bab Ezzouar**, **Boufarik / Blida**.

---

## 🛠️ Fonctionnalités Clés
* **3 Catégories de Pièces Normalisées** :
  * 🟢 **Neuf Origine (OEM)** : Certifié constructeur avec référence d'origine.
  * 🔵 **Neuf Adaptable** : Grandes marques de première monte (*Valeo, Bosch, LuK, Sachs, Purflux, Dayco, Monroe*).
  * 🟠 **La Casse / Occasion Garantie (*لاكاس*)** : Pièces démontées de véhicules accidentés ou importées d'Europe (*Caba* / conteneur) avec garantie d'essai de 15 jours à 1 mois.
* **Recherche Intelligente & Tolérante (Phonétique & Darija)** :
  * Comprend les termes locaux : *"lachaine"*, *"debrayage"*, *"plaket"*, *"amourtiseur"*, *"parchok"*, *"far"*, *"casse"*.
* **Sélecteur Visuel 1-Clic de Voitures** :
  * Renault Symbol, Clio 4, Dacia Sandero, Peugeot 208, Peugeot 301, Hyundai Accent, Golf 7, Seat Ibiza, Kia Picanto, Toyota Hilux.
* **Carte Leaflet Interactive d'Alger** :
  * Repères calibrés affichant **directement le prix en Dinars (DA)** sur la carte.
  * Zoom maximal (zoom 16) automatique dès qu'un produit est sélectionné dans la liste.
  * Vue Satellite et Vue Plan en 1 clic.
* **Système Anti-Arnaque Communautaire** :
  * Votes 👍 Recommandé et 👎 Signaler Arnaque.
  * Suppression automatique des annonces frauduleuses si signalées par la communauté.
* **Contact Direct Vendeur** :
  * Bouton **📞 Appel direct** et **💬 WhatsApp** avec message pré-rempli.
* **Espace Vendeurs & Casses** :
  * Formulaire dédié permettant aux professionnels de publier leurs stocks et arrivages de conteneurs.

---

## 🚀 Déploiement sur Render

### Configuration du Web Service Render :
* **Name** : `DZPIECE`
* **Runtime** : `Node`
* **Branch** : `main`
* **Build Command** : `npm install && npm run build`
* **Start Command** : `node server.js`
* **Environment Variable** :
  * `NODE_ENV` = `production`
  * `PORT` = `10000`

---

## 💻 Développement Local
```bash
npm install
npm run dev
# L'application tourne sur http://localhost:5174/
```
