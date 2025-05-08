# 📝 Patch Notes - Projet Armed

## Phase 1 - Initialisation (2024-03-21)

### 🔧 Setup Global
- Création de la structure de base du projet avec dossiers `frontend/` et `backend/`
- Initialisation du README.md principal avec documentation complète
- Configuration du `.gitignore` pour exclure les fichiers sensibles et dépendances

### 🏗 Frontend
- Création du projet Vue.js 3 avec Vite et TypeScript
- Installation et configuration de Pinia pour le state management
- Installation et configuration de Vue Router pour la navigation
- Installation de @vueuse/core pour les utilitaires Vue

### 🧪 Backend
- Initialisation du projet Node.js avec `npm init`
- Installation des dépendances principales :
  - express (API REST)
  - cors (Cross-Origin Resource Sharing)
  - dotenv (Variables d'environnement)
  - pg (PostgreSQL)
  - jsonwebtoken (Authentification)
  - bcrypt (Hachage des mots de passe)
  - stripe (Paiements)
  - pdf-lib (Génération de contrats)
- Création de l'architecture de dossiers :
  - `/routes` : Routes API
  - `/controllers` : Logique métier
  - `/models` : Modèles de données
  - `/middlewares` : Middlewares Express
  - `/utils` : Utilitaires
- Configuration du serveur Express de base avec :
  - Middleware CORS
  - Parsing JSON
  - Gestion d'erreurs globale
  - Route de test `/ping`

### 📦 Dépendances
- Ajout de nodemon pour le développement backend
- Configuration des scripts npm pour le développement

### ⏭️ Prochaines étapes
1. Configuration de Railway pour le backend + PostgreSQL
2. Configuration de Vercel pour le frontend
3. Mise en place de la structure frontend (composants, pages, stores)
4. Configuration de la base de données PostgreSQL

## Phase 1 - Initialisation (2024-05-08)

### 🧪 Backend
- Configuration et test de la connexion PostgreSQL Railway depuis le backend
- Correction du chargement des variables d'environnement (`dotenv`) pour garantir la lecture du `.env` avant toute utilisation
- Ajout d'une route `/test-db` pour valider la connexion à la base distante
- Résolution des erreurs de connexion (ECONNREFUSED, password authentication failed) par vérification de l'URL proxy, du mot de passe Railway et de l'ordre d'import
- `.env` backend prêt à accueillir les clés JWT et Stripe

## Phase 1 - Déploiement (2024-05-08)

### 🚀 Infrastructure
- Déploiement du backend Express.js sur Railway
  - Configuration du service avec Node.js
  - Connexion à la base PostgreSQL
  - Configuration des variables d'environnement
- Déploiement du frontend Vue.js sur Vercel
  - Configuration du projet avec Vite
  - Mise en place des variables d'environnement
  - Configuration de l'URL de l'API backend

### 🔧 Configuration
- Mise en place du monorepo sur GitHub
- Configuration des environnements de production
- Liaison frontend-backend via variables d'environnement

### ⏭️ Prochaines étapes
1. Génération des clés JWT et Stripe
2. Mise en place de la structure frontend
3. Développement des composants de base
4. Implémentation de l'authentification

## Phase 1 - Sécurité (2024-05-08)

### 🔐 Authentification
- Génération d'une clé JWT sécurisée
- Configuration de la variable d'environnement JWT_SECRET
- Préparation pour l'implémentation de l'authentification

### ⏭️ Prochaines étapes
1. Implémentation des routes d'authentification
2. Configuration de Stripe (à faire plus tard)
3. Mise en place de la structure frontend
4. Développement des composants de base
