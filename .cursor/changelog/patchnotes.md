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
