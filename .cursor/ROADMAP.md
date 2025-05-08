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
* [ ] Configurer Vercel pour héberger le frontend
* [x] Créer base PostgreSQL sur Railway
* [x] Générer clefs JWT, clés Stripe et ajouter au `.env`

### 🏗 Frontend (Vue.js)

* [x] Créer projet Vue 3 avec Vite (`npm create vite@latest`)
* [x] Ajouter et configurer Pinia (`npm i pinia`)
* [x] Ajouter et configurer Vue Router (`npm i vue-router`)
* [ ] Créer structure de dossiers `components/`, `pages/`, `stores/`, `composables/`, `assets/`
* [ ] Ajouter typographie Geist via Google Fonts (ou auto-hébergée)
* [ ] Créer layout global avec Header / Footer / Slot principal
* [ ] Créer fichier de configuration design system (couleurs, typo)
* [ ] Définir variables CSS ou fichier `theme.ts` si utile
* [ ] Créer composants :

  * [ ] `BaseButton.vue`
  * [ ] `BaseInput.vue`
  * [ ] `ProductCard.vue`
  * [ ] `AudioPlayer.vue`
  * [ ] `SectionContainer.vue`

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
* [ ] Créer fonction de connexion PostgreSQL
* [x] Créer middleware global de gestion d'erreurs
* [ ] Créer routes d'authentification admin (login, register, JWT)
* [x] Vérifier connexion et réponse JSON sur route `/ping`

---

## Phase 2 — Frontend public (UI & pages utilisateur)

* [ ] `/` Accueil

  * [ ] Hero avec branding `armed`, DA visuelle et texte
  * [ ] Grille responsive de 3 produits en avant
  * [ ] Call-to-action vers `/store`
  * [ ] Bouton / lien vers page `/placements`

* [ ] `/store` Catalogue

  * [ ] Récupération des produits via API REST
  * [ ] Filtres par type de produit, tags, etc.
  * [ ] Grille responsive de cards produits
  * [ ] Affichage "En rupture" si stock épuisé

* [ ] `/product/:id`

  * [ ] Récupération des infos produit
  * [ ] Affichage de l'image, description, type, prix
  * [ ] Choix de licence (si beat) avec radio ou select
  * [ ] Intégration player audio custom
  * [ ] Bouton "Ajouter au panier"

* [ ] `/cart`

  * [ ] Affichage produits + type + licence
  * [ ] Calcul total dynamique
  * [ ] Bouton "Supprimer" produit du panier
  * [ ] CTA vers `/checkout`

* [ ] `/checkout`

  * [ ] Formulaire email requis
  * [ ] Stripe Checkout intégré (avec backend session)
  * [ ] Redirection vers `/success` après paiement

* [ ] `/success`

  * [ ] Message personnalisé de remerciement
  * [ ] Lien(s) de téléchargement audio et contrat PDF

* [ ] `/placements`

  * [ ] Composants placements : titre, lien, embed Spotify/Youtube/Apple Music
  * [ ] Layout artistique, propre à ta DA

---

## Phase 3 — Backend e-commerce (routes + logique)

* [ ] Créer modèles SQL ou Prisma pour :

  * [ ] `users` (id, email, password_hash, role)
  * [ ] `products` (id, title, slug, type, price, stock, is_exclusive...)
  * [ ] `licenses` (id, product_id, name, price, contract_path, max_sales)
  * [ ] `orders` (id, user_id, total, status, created_at)
  * [ ] `order_items` (id, order_id, product_id, license_id...)

* [ ] Créer routes REST :

  * [ ] `GET /api/products`
  * [ ] `GET /api/products/:id`
  * [ ] `POST /api/products` (admin)
  * [ ] `PUT /api/products/:id`
  * [ ] `DELETE /api/products/:id`
  * [ ] `POST /api/licenses`
  * [ ] `POST /api/orders`
  * [ ] `POST /api/auth/login`

* [ ] Stripe webhook `POST /api/stripe/webhook`

* [ ] Génération PDF via `pdf-lib` + stockage temporaire/local

* [ ] Récupération liens PDF + audio via `/success`

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

* [ ] Player audio personnalisé (`AudioPlayer.vue`)

  * [ ] Play / Pause / Barre lecture stylée
  * [ ] Intégration dans la fiche produit

* [ ] DA / UI

  * [ ] Palette de fond blanc `#F3F3F3` vers gris clair
  * [ ] Texte noir bleuté très foncé
  * [ ] Accentuation bleu marine ou noir
  * [ ] Typo Geist sur tout le site

* [ ] Responsive

  * [ ] Grilles adaptables
  * [ ] Navigation mobile propre
  * [ ] Footer sticky ou minimal

* [ ] QA & tests manuels

  * [ ] Test achat avec Stripe test mode
  * [ ] Vérif génération contrat + lien audio
  * [ ] Tests navigation mobile / tablette / desktop
  * [ ] Contrôle console / logs / erreurs 404

---

## Phase 6 — Lancement

* [ ] Réserver nom de domaine (type : `armed.store` ou `byarmed.com`)
* [ ] Ajouter CNAME dans Vercel
* [ ] Basculer Railway + Vercel en mode production
* [ ] Test final en condition réelle
* [ ] Créer visuel/story/post lancement
* [ ] Annoncer sortie sur Instagram, site, etc. 🎉
