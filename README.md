# 🎵 Armed Store

Plateforme e-commerce musicale pour la vente de beats et placements.

## 🚀 Setup Global

### Prérequis
- Node.js (v18+)
- PostgreSQL
- Compte GitHub
- Compte Railway
- Compte Vercel

### Structure du Projet
```
armedstore/
├── frontend/          # Application Vue.js
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # API Express.js
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middlewares/
│   │   └── utils/
│   └── package.json
└── uploads/          # Stockage temporaire des fichiers
```

### Déploiement

#### Backend (Railway)
1. Créer un nouveau projet sur Railway
2. Connecter le repo GitHub
3. Configurer le service :
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Variables d'environnement :
   ```
   DATABASE_URL=postgresql://...
   JWT_SECRET=votre_clé_jwt
   NODE_ENV=production
   ```

#### Frontend (Vercel)
1. Créer un nouveau projet sur Vercel
2. Connecter le repo GitHub
3. Configurer le projet :
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Variables d'environnement :
   ```
   VITE_API_URL=https://votre-backend.railway.app
   ```

### Base de Données (Railway)
- PostgreSQL hébergé sur Railway
- URL de connexion fournie dans les variables d'environnement Railway
- Schéma de base de données à implémenter

### Sécurité
- JWT pour l'authentification
- Variables d'environnement pour les secrets
- CORS configuré pour le frontend
- Stripe pour les paiements (à configurer)

### Développement Local
1. Cloner le repo :
   ```bash
   git clone https://github.com/zoranhorsy/armedstore.git
   cd armedstore
   ```

2. Backend :
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Configurer les variables
   npm run dev
   ```

3. Frontend :
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### URLs de Production
- Frontend : https://armedstore.vercel.app
- Backend : https://postgres-armed-production.up.railway.app
- Base de données : PostgreSQL sur Railway

### Prochaines Étapes
1. Implémentation des routes d'authentification
2. Configuration de Stripe
3. Développement des composants frontend
4. Mise en place des fonctionnalités e-commerce

## 🎯 Objectif

Centraliser l'identité artistique du projet et proposer une expérience commerciale claire, fluide et esthétique autour de :
- La vente d'instrumentales (avec système de licences, contrats, exclusivités)
- La vente de produits numériques (drumkits, sample packs, bundles)
- La présentation des placements de prod avec intégration vers Spotify/Apple Music

## 🧱 Stack technique

- **Frontend** : Vue.js 3 + Composition API + `<script setup>`
- **State management** : Pinia
- **Routing** : Vue Router
- **Backend** : Express.js (API REST)
- **Base de données** : PostgreSQL (Railway)
- **Stockage fichiers** : Dossier `uploads` backend
- **Authentification** : JWT, bcrypt
- **Déploiement** : Vercel (frontend), Railway (backend + DB)
- **Paiement** : Stripe
- **Contrats PDF** : Génération via `pdf-lib`

## 📁 Structure du projet

```
armedstore/
├── frontend/          # Application Vue.js
└── backend/           # API Express.js
```

## 🚀 Installation

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

## 📝 License

Tous droits réservés © armed 