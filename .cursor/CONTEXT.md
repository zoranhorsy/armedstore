# 📄 CONTEXT.md — Projet Armed

## 🎯 Objectif du projet

Créer une plateforme e-commerce développée avec Vue.js, dédiée à **armed**, compositeur et sound designer. L'objectif est de centraliser l'identité artistique du projet et de proposer une expérience commerciale claire, fluide et esthétique autour de :

* La vente d'instrumentales (avec système de licences, contrats, exclusivités)
* La vente de produits numériques (drumkits, sample packs, bundles)
* La présentation des placements de prod avec intégration vers Spotify/Apple Music

---

## 👤 Public cible

* Artistes indépendants (rappeurs, chanteurs)
* Beatmakers et producteurs
* Labels ou collectifs à la recherche d'une DA forte
* Amateurs de sonorités singulières et artistiques

---

## 🧱 Stack technique

* **Frontend** : Vue.js 3 + Composition API + `<script setup>`
* **State management** : Pinia
* **Routing** : Vue Router
* **Backend** : Express.js (API REST)
* **Base de données** : PostgreSQL (Railway)
* **Stockage fichiers** : Dossier `uploads` backend
* **Authentification** : JWT, bcrypt (système custom)
* **Déploiement** : Vercel (frontend), Railway (backend + DB)
* **Paiement** : Stripe
* **Contrats PDF** : Génération via `pdf-lib` ou lib similaire

---

## 🔀 Structure des routes/pages (frontend)

### Pages publiques

* `/` : Accueil (DA, produits mis en avant, liens placements)
* `/store` : Catalogue (filtrage par catégorie, type, BPM, etc.)
* `/product/:id` : Fiche produit (instru, kit, pack)
* `/cart` : Panier
* `/checkout` : Paiement
* `/success` : Confirmation d'achat
* `/placements` : Liste des placements (Spotify, Apple Music...)
* `/login` : Accès admin

### Pages admin

* `/admin` : Dashboard
* `/admin/products` : Liste des produits
* `/admin/products/new` : Création d'un produit
* `/admin/orders` : Suivi des commandes
* `/admin/stats` : Statistiques (optionnel)

---

## 🗃 Structure de la base de données (principaux modèles)

### `users`

* id, email, password\_hash, role

### `products`

* id, title, slug, type, price, stock, is\_exclusive, is\_active, audio\_preview\_url, cover\_url, download\_url, created\_at

### `licenses`

* id, product\_id, name, price, contract\_template\_path, download\_url, max\_sales

### `orders`

* id, user\_id, total\_price, created\_at, status

### `order_items`

* id, order\_id, product\_id, license\_id, contract\_path, download\_path

---

## 🛒 Fonctionnalités e-commerce

### Beats

* Vente par licence (MP3, WAV, Trackout, Exclusive)
* Prix, limites d'usage, contenu différencié
* Contrat PDF généré automatiquement et téléchargeable
* Retrait automatique si "Exclusive" vendue

### Drumkits (ex : "édition limitée")

* Limite à 50 exemplaires par kit
* Stock décrémenté automatiquement

### Sample packs & Bundles

* Téléchargement direct
* Possibilité de grouper produits

### Admin

* Upload de fichiers, visuels, audio preview
* Configuration des licences et produits
* Gestion des commandes, contrats, stocks

---

## 🎧 Audio

* Player audio **personnalisé** pour les instrus (pas d'embed)
* Design intégré à la DA, sobre et efficace

---

## 🎨 Direction artistique

* **Nom de scène** : `armed` (minuscules, stylisé)
* **Typo** : Geist
* **Style** : minimaliste, tech, artistique, très propre
* **Fond** : blanc `#F3F3F3` en dégradé doux vers gris
* **Texte** : noir tirant très légèrement vers le bleu foncé
* **Accentuation** : bleu marine à tester ou noir simple
* **Inspiration** : iOS (légèrement), sans excès de rondeur, beaucoup d'espace

---

## 📌 Spécificités importantes

* Tout fichier acheté = téléchargement automatique + contrat PDF généré
* Possibilité de retirer automatiquement un produit "exclusive" vendu
* Plateforme orientée DA artistique + efficacité commerciale
