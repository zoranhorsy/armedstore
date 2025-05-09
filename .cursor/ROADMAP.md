# 📜 ROADMAP — Projet Armed (détaillée)

Roadmap ultra détaillée pour le développement complet de la plateforme e-commerce musicale "armed" en Vue.js / Express.js

---

## Phase 1 — Initialisation du projet

### 🔧 Setup global

* [x] Créer repository Git pour le frontend
* [x] Créer repository Git pour le backend
* [x] Initialiser README.md dans chaque repo avec objectifs
* [x] Ajouter `.gitignore` (.env, node_modules, dist, etc.)
* [x] Configurer Railway pour backend + PostgreSQL
* [x] Configurer Vercel pour héberger le frontend
* [x] Créer base PostgreSQL sur Railway
* [x] Générer clé JWT
* [ ] Configurer Stripe (clés et webhook)

### 🏗 Frontend (Vue.js)

* [x] Créer projet Vue 3 avec Vite (`npm create vite@latest`)
* [x] Ajouter et configurer Pinia (`npm i pinia`)
* [x] Ajouter et configurer Vue Router (`npm i vue-router`)
* [x] Créer structure de dossiers `components/`, `pages/`, `stores/`, `composables/`, `assets/`
* [x] Ajouter typographie Geist via Google Fonts (ou auto-hébergée)
* [x] Créer layout global avec Header / Footer / Slot principal
* [x] Créer fichier de configuration design system (couleurs, typo)
* [x] Définir variables CSS ou fichier `theme.ts` si utile
* [x] Créer composants :

  * [x] `BaseButton.vue`
  * [x] `BaseInput.vue`
  * [x] `ProductCard.vue`
  * [x] `AudioPlayer.vue`
  * [x] `SectionContainer.vue`

### 🧪 Backend (Express.js)

* [x] Créer projet Node.js avec `npm init`
* [x] Installer Express et dépendances (`express`, `cors`, `dotenv`, `pg`, `jsonwebtoken`, `bcrypt`, etc.)
* [x] Créer architecture dossier :

  * [x] `/routes`
  * [x] `/controllers`
  * [x] `/models`
  * [x] `/middlewares`
  * [x] `/utils`
* [x] Configurer parsing JSON et middleware CORS
* [x] Créer fonction de connexion PostgreSQL
* [x] Créer middleware global de gestion d'erreurs
* [x] Créer routes d'authentification admin (login, register, JWT)
* [x] Vérifier connexion et réponse JSON sur route `/ping`

### 🧪 Tests des endpoints

* [x] Tests de base
  * [x] `GET /ping` - Vérifier réponse "pong"
  * [x] `GET /test-db` - Vérifier connexion DB et timestamp

* [x] Tests d'authentification
  * [x] `POST /api/auth/register` - Créer un admin
    * [x] Test avec email valide
    * [x] Test avec email déjà utilisé
    * [x] Test avec mot de passe invalide
  * [x] `POST /api/auth/login` - Connexion admin
    * [x] Test avec identifiants valides
    * [x] Test avec email invalide
    * [x] Test avec mot de passe invalide
  * [x] `GET /api/auth/me` - Vérifier token
    * [x] Test avec token valide
    * [x] Test sans token
    * [x] Test avec token invalide

* [x] Tests des produits
  * [x] `GET /api/products` - Liste des produits
  * [x] `GET /api/products/:id` - Détails d'un produit
  * [x] `POST /api/products` - Créer un produit (admin)
  * [x] `PUT /api/products/:id` - Modifier un produit (admin)
  * [x] `DELETE /api/products/:id` - Supprimer un produit (admin)

* [x] Tests des licences
  * [x] `GET /api/licenses` - Liste des licences
  * [x] `GET /api/licenses/:id` - Détails d'une licence
  * [x] `POST /api/licenses` - Créer une licence (admin)
  * [x] `PUT /api/licenses/:id` - Modifier une licence (admin)
  * [x] `DELETE /api/licenses/:id` - Supprimer une licence (admin)

* [x] Tests des commandes
  * [x] `GET /api/orders` - Liste des commandes (admin)
  * [x] `GET /api/orders/:id` - Détails d'une commande
  * [x] `POST /api/orders` - Créer une commande
  * [x] `PUT /api/orders/:id` - Mettre à jour le statut (admin)
  * [x] `GET /api/orders/:id/download` - Télécharger les fichiers

* [x] Tests TypeScript
  * [x] Validation des types dans les composants Vue
  * [x] Correction des erreurs de typage dans les stores Pinia
  * [x] Mise à jour des interfaces et types

---

## Phase 2 — Frontend public (UI & pages utilisateur)

* [x] `/` Accueil

  * [x] Hero avec branding `armed`, DA visuelle et texte
  * [x] Grille responsive de 3 produits en avant
  * [x] Call-to-action vers `/store`
  * [x] Bouton / lien vers page `/placements`

* [x] `/store` Catalogue

  * [x] Récupération des produits via API REST
  * [x] Filtres par type de produit, tags, etc.
  * [x] Grille responsive de cards produits
  * [x] Affichage "En rupture" si stock épuisé

* [x] `/product/:id`

  * [x] Récupération des infos produit
  * [x] Affichage de l'image, description, type, prix
  * [x] Choix de licence (si beat) avec radio ou select
  * [x] Intégration player audio custom
  * [x] Bouton "Ajouter au panier"

* [x] `/cart`

  * [x] Affichage produits + type + licence
  * [x] Calcul total dynamique
  * [x] Bouton "Supprimer" produit du panier
  * [x] CTA vers `/checkout`

* [x] `/checkout`

  * [x] Formulaire email requis
  * [x] Stripe Checkout intégré (avec backend session)
  * [x] Redirection vers `/success` après paiement

* [x] `/success`

  * [x] Message personnalisé de remerciement
  * [x] Lien(s) de téléchargement audio et contrat PDF

* [ ] `/placements`

  * [x] Composants placements : titre, lien, embed Spotify/Youtube/Apple Music
  * [x] Layout artistique, propre à ta DA

### 📝 Patch Notes - Frontend v0.2.0

#### Pages principales
- ✅ Implémentation complète de la page d'accueil avec hero et produits en avant
- ✅ Création du catalogue avec système de filtrage
- ✅ Page de détail produit avec player audio et sélection de licence
- ✅ Panier avec calcul dynamique des totaux
- ✅ Intégration du paiement Stripe
- ✅ Page de succès avec téléchargements

#### Stores Pinia
- ✅ Store de gestion des produits avec requêtes API
- ✅ Store de gestion du panier avec calcul des totaux et gestion des types TypeScript
- ✅ Store de gestion des commandes et paiements
- ✅ Correction des erreurs TypeScript dans les composants

#### Prochaines étapes
- [ ] Implémentation de la page des placements
- [ ] Finalisation des composants de base (BaseButton, BaseInput, AudioPlayer)
- [ ] Tests unitaires et d'intégration
- [ ] Optimisation des performances
- [ ] Documentation des types TypeScript

### 📝 Patch Notes - Backend v0.1.0

#### Configuration initiale
- ✅ Mise en place de l'architecture Express.js
- ✅ Configuration de la base de données PostgreSQL sur Railway
- ✅ Implémentation du système d'authentification JWT
- ✅ Création des routes d'authentification (register, login, me)

#### Prochaines étapes
- [ ] Implémentation des routes de gestion des produits
- [ ] Configuration de Stripe pour les paiements
- [ ] Mise en place du système de génération de contrats PDF
- [ ] Tests des endpoints d'authentification

---

## Phase 3 — Backend e-commerce (routes + logique)

### 🗄️ Base de données

* [ ] Créer et configurer les modèles SQL :
  * [ ] `users`
    * [ ] `id` (UUID, PK)
    * [ ] `email` (VARCHAR, UNIQUE)
    * [ ] `password_hash` (VARCHAR)
    * [ ] `role` (ENUM: 'admin', 'user')
    * [ ] `created_at` (TIMESTAMP)
    * [ ] `updated_at` (TIMESTAMP)

  * [ ] `products`
    * [ ] `id` (UUID, PK)
    * [ ] `title` (VARCHAR)
    * [ ] `slug` (VARCHAR, UNIQUE)
    * [ ] `type` (ENUM: 'beat', 'sample', 'loop')
    * [ ] `description` (TEXT)
    * [ ] `price` (DECIMAL)
    * [ ] `stock` (INTEGER)
    * [ ] `is_exclusive` (BOOLEAN)
    * [ ] `audio_url` (VARCHAR)
    * [ ] `image_url` (VARCHAR)
    * [ ] `tags` (ARRAY)
    * [ ] `created_at` (TIMESTAMP)
    * [ ] `updated_at` (TIMESTAMP)

  * [ ] `licenses`
    * [ ] `id` (UUID, PK)
    * [ ] `product_id` (UUID, FK)
    * [ ] `name` (VARCHAR)
    * [ ] `price` (DECIMAL)
    * [ ] `contract_path` (VARCHAR)
    * [ ] `max_sales` (INTEGER)
    * [ ] `created_at` (TIMESTAMP)
    * [ ] `updated_at` (TIMESTAMP)

  * [ ] `orders`
    * [ ] `id` (UUID, PK)
    * [ ] `user_id` (UUID, FK)
    * [ ] `total` (DECIMAL)
    * [ ] `status` (ENUM: 'pending', 'paid', 'failed')
    * [ ] `stripe_session_id` (VARCHAR)
    * [ ] `created_at` (TIMESTAMP)
    * [ ] `updated_at` (TIMESTAMP)

  * [ ] `order_items`
    * [ ] `id` (UUID, PK)
    * [ ] `order_id` (UUID, FK)
    * [ ] `product_id` (UUID, FK)
    * [ ] `license_id` (UUID, FK, NULLABLE)
    * [ ] `quantity` (INTEGER)
    * [ ] `price` (DECIMAL)
    * [ ] `created_at` (TIMESTAMP)

### 🔄 Routes API

* [ ] Routes Produits
  * [ ] `GET /api/products` - Liste des produits
    * [ ] Pagination
    * [ ] Filtres (type, tags, prix)
    * [ ] Tri (date, prix, popularité)
  * [ ] `GET /api/products/:id` - Détails d'un produit
  * [ ] `POST /api/products` - Créer un produit (admin)
    * [ ] Validation des données
    * [ ] Upload audio/image
  * [ ] `PUT /api/products/:id` - Modifier un produit (admin)
  * [ ] `DELETE /api/products/:id` - Supprimer un produit (admin)

* [ ] Routes Licences
  * [ ] `GET /api/licenses` - Liste des licences
  * [ ] `GET /api/licenses/:id` - Détails d'une licence
  * [ ] `POST /api/licenses` - Créer une licence (admin)
  * [ ] `PUT /api/licenses/:id` - Modifier une licence (admin)
  * [ ] `DELETE /api/licenses/:id` - Supprimer une licence (admin)

* [ ] Routes Commandes
  * [ ] `GET /api/orders` - Liste des commandes (admin)
  * [ ] `GET /api/orders/:id` - Détails d'une commande
  * [ ] `POST /api/orders` - Créer une commande
    * [ ] Validation du panier
    * [ ] Création session Stripe
  * [ ] `PUT /api/orders/:id` - Mettre à jour le statut (admin)
  * [ ] `GET /api/orders/:id/download` - Télécharger les fichiers

### 📦 Gestion des Fichiers
* [ ] Configuration du stockage
  * [ ] Setup AWS S3 ou équivalent
  * [ ] Configuration des buckets
  * [ ] Gestion des permissions
* [ ] Upload des fichiers
  * [ ] Upload audio (MP3, WAV)
  * [ ] Upload images (JPG, PNG)
  * [ ] Compression automatique
* [ ] Sécurité
  * [ ] Validation des types de fichiers
  * [ ] Scan antivirus
  * [ ] Protection contre les abus

### 📧 Système d'Emails
* [ ] Configuration
  * [ ] Setup SendGrid ou équivalent
  * [ ] Templates d'emails
  * [ ] Variables dynamiques
* [ ] Types d'emails
  * [ ] Confirmation de commande
  * [ ] Lien de téléchargement
  * [ ] Récupération de mot de passe
  * [ ] Notifications admin

### 🔍 SEO & Analytics
* [ ] Configuration
  * [ ] Setup Google Analytics
  * [ ] Meta tags dynamiques
  * [ ] Sitemap.xml
* [ ] Optimisation
  * [ ] Balises meta par page
  * [ ] Open Graph tags
  * [ ] Schema.org markup
* [ ] Tracking
  * [ ] Events e-commerce
  * [ ] Funnel de conversion
  * [ ] Rapports personnalisés

### 💳 Intégration Stripe

* [ ] Configuration
  * [ ] Installer `stripe` package
  * [ ] Configurer clés API dans `.env`
  * [ ] Créer middleware de vérification webhook

* [ ] Webhook Stripe
  * [ ] `POST /api/stripe/webhook`
    * [ ] Vérification signature
    * [ ] Gestion événements :
      * [ ] `checkout.session.completed`
      * [ ] `payment_intent.succeeded`
      * [ ] `payment_intent.failed`

### 📄 Génération PDF

* [ ] Configuration
  * [ ] Installer `pdf-lib`
  * [ ] Créer templates de contrats
  * [ ] Configurer stockage temporaire

* [ ] Génération
  * [ ] Créer service de génération PDF
  * [ ] Intégrer variables dynamiques
  * [ ] Gérer stockage et accès

### 🔒 Sécurité

* [ ] Middleware d'authentification
  * [ ] Vérification JWT
  * [ ] Gestion des rôles
  * [ ] Rate limiting

* [ ] Validation des données
  * [ ] Sanitization des inputs
  * [ ] Validation des types
  * [ ] Gestion des erreurs

### 📝 Tests

* [ ] Tests unitaires
  * [ ] Routes API
  * [ ] Services
  * [ ] Middleware

* [ ] Tests d'intégration
  * [ ] Flux complet d'achat
  * [ ] Webhook Stripe
  * [ ] Génération PDF

---

## Phase 4 — Interface admin

* [ ] `/login` : page de connexion admin JWT

* [ ] `/admin` : dashboard overview

* [ ] `/admin/products`

  * [ ] Liste des produits + actions (éditer, supprimer)
  * [ ] Bouton "Nouveau produit"
  * [ ] Formulaire complet de création produit (type, image, fichier, prix, stock, etc.)
  * [ ] Upload fichiers audio / image / zip

* [ ] `/admin/licenses`

  * [ ] Ajout / édition des licences associées à un beat

* [ ] `/admin/orders`

  * [ ] Tableau commandes : email client, total, date, fichier envoyé
  * [ ] Accès au contrat PDF généré

* [ ] `/admin/stats`

  * [ ] Nombre de ventes par produit
  * [ ] Revenus générés par type / période

---

## Phase 5 — DA, Player, Responsive, QA

### 📝 Optimisation TypeScript
* [ ] Documentation des Types
  * [ ] Création d'un fichier `types/index.ts` centralisé
  * [ ] Documentation JSDoc pour chaque interface
  * [ ] Exemples d'utilisation pour chaque type
* [ ] Refactoring des Stores
  * [ ] Optimisation du store `cart.ts`
  * [ ] Typage strict des actions et mutations
  * [ ] Gestion des états de chargement
* [ ] Composants Vue
  * [ ] Props typées avec validation
  * [ ] Emits typés
  * [ ] Composables typés
* [ ] API Integration
  * [ ] Types pour les réponses API
  * [ ] Validation des données reçues
  * [ ] Gestion des erreurs typées

### 🎵 Player audio personnalisé (`AudioPlayer.vue`)

* [ ] Play / Pause / Barre lecture stylée
* [ ] Intégration dans la fiche produit

### 🎨 DA / UI

* [ ] Palette de fond blanc `#F3F3F3` vers gris clair
* [ ] Texte noir bleuté très foncé
* [ ] Accentuation bleu marine ou noir
* [ ] Typo Geist sur tout le site

### 📱 Responsive

* [ ] Grilles adaptables
* [ ] Navigation mobile propre
* [ ] Footer sticky ou minimal

### 🎯 QA & tests manuels

* [ ] Test achat avec Stripe test mode
* [ ] Vérif génération contrat + lien audio
* [ ] Tests navigation mobile / tablette / desktop
* [ ] Contrôle console / logs / erreurs 404

### 🔒 Sécurité
* [ ] Protection contre les attaques
  * [ ] Rate limiting
  * [ ] CORS configuration
  * [ ] XSS protection
* [ ] Validation des données
  * [ ] Sanitization des inputs
  * [ ] Validation des fichiers
  * [ ] Protection CSRF
* [ ] Audit de sécurité
  * [ ] Scan de vulnérabilités
  * [ ] Test de pénétration
  * [ ] Rapport de sécurité

### 📱 PWA & Offline
* [ ] Configuration
  * [ ] Manifest.json
  * [ ] Service Workers
  * [ ] Cache stratégies
* [ ] Fonctionnalités
  * [ ] Installation sur mobile
  * [ ] Mode hors-ligne
  * [ ] Notifications push

## Phase 6 — Lancement

* [ ] Réserver nom de domaine (type : `armed.store` ou `byarmed.com`)
* [ ] Ajouter CNAME dans Vercel
* [ ] Basculer Railway + Vercel en mode production
* [ ] Test final en condition réelle
* [ ] Créer visuel/story/post lancement
* [ ] Annoncer sortie sur Instagram, site, etc. 🎉

### 📝 Patch Notes - Frontend v0.1.0

#### Composants de base
- ✅ Création du système de design avec variables CSS
- ✅ Implémentation de `BaseButton` avec 4 variantes (primary, secondary, outline, text)
- ✅ Implémentation de `BaseInput` avec support des labels et messages d'erreur
- ✅ Implémentation de `ProductCard` pour l'affichage des produits
- ✅ Implémentation de `AudioPlayer` avec contrôles de lecture et barre de progression
- ✅ Implémentation de `SectionContainer` pour la mise en page des sections

#### Layout
- ✅ Création du layout global avec Header et Footer
- ✅ Intégration de la navigation principale
- ✅ Mise en place du système de routing

#### Design System
- ✅ Définition de la palette de couleurs
- ✅ Configuration de la typographie Geist
- ✅ Mise en place des espacements et des rayons de bordure
- ✅ Ajout des transitions et animations de base

#### Prochaines étapes
- [ ] Création des pages principales (Home, Store, Product)
- [ ] Implémentation du store Pinia pour la gestion du panier
- [ ] Intégration de l'API backend
- [ ] Mise en place du système d'authentification
