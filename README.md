# 🎵 armed - Plateforme e-commerce musicale

Plateforme e-commerce développée avec Vue.js et Express.js, dédiée à **armed**, compositeur et sound designer.

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