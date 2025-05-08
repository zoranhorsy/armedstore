# 📚 Documentation API Backend - Armed Store

## 🔑 Authentification

Toutes les routes protégées nécessitent un token JWT dans le header `Authorization` :
```
Authorization: Bearer <votre_token>
```

### Routes d'authentification

#### `POST /api/auth/register`
Crée un nouveau compte admin.

**Body:**
```json
{
  "email": "admin@armed.store",
  "password": "votre_mot_de_passe"
}
```

**Réponse (201):**
```json
{
  "user": {
    "id": 1,
    "email": "admin@armed.store",
    "role": "admin"
  },
  "token": "jwt_token_ici"
}
```

#### `POST /api/auth/login`
Connecte un admin existant.

**Body:**
```json
{
  "email": "admin@armed.store",
  "password": "votre_mot_de_passe"
}
```

**Réponse (200):**
```json
{
  "user": {
    "id": 1,
    "email": "admin@armed.store",
    "role": "admin"
  },
  "token": "jwt_token_ici"
}
```

#### `GET /api/auth/me`
Vérifie le token et retourne les infos de l'utilisateur connecté.

**Headers:**
```
Authorization: Bearer <votre_token>
```

**Réponse (200):**
```json
{
  "user": {
    "id": 1,
    "email": "admin@armed.store",
    "role": "admin"
  }
}
```

## 🎵 Produits

### Routes publiques

#### `GET /api/products`
Récupère la liste de tous les produits.

**Réponse (200):**
```json
[
  {
    "id": 1,
    "title": "Nom du produit",
    "slug": "nom-du-produit",
    "type": "beat",
    "price": "29.99",
    "stock": 1,
    "is_exclusive": false,
    "is_active": true,
    "audio_preview_url": "https://example.com/preview.mp3",
    "cover_url": "https://example.com/cover.jpg",
    "download_url": "https://example.com/download.zip",
    "created_at": "2024-03-08T23:10:22.916Z"
  }
]
```

#### `GET /api/products/:id`
Récupère les détails d'un produit spécifique.

**Réponse (200):**
```json
{
  "id": 1,
  "title": "Nom du produit",
  "slug": "nom-du-produit",
  "type": "beat",
  "price": "29.99",
  "stock": 1,
  "is_exclusive": false,
  "is_active": true,
  "audio_preview_url": "https://example.com/preview.mp3",
  "cover_url": "https://example.com/cover.jpg",
  "download_url": "https://example.com/download.zip",
  "created_at": "2024-03-08T23:10:22.916Z"
}
```

### Routes admin (protégées)

#### `POST /api/products`
Crée un nouveau produit.

**Headers:**
```
Authorization: Bearer <votre_token>
```

**Body:**
```json
{
  "title": "Nom du produit",
  "slug": "nom-du-produit",
  "type": "beat",
  "price": 29.99,
  "stock": 1,
  "is_exclusive": false,
  "is_active": true,
  "audio_preview_url": "https://example.com/preview.mp3",
  "cover_url": "https://example.com/cover.jpg",
  "download_url": "https://example.com/download.zip"
}
```

**Réponse (201):**
```json
{
  "id": 1,
  "title": "Nom du produit",
  "slug": "nom-du-produit",
  "type": "beat",
  "price": "29.99",
  "stock": 1,
  "is_exclusive": false,
  "is_active": true,
  "audio_preview_url": "https://example.com/preview.mp3",
  "cover_url": "https://example.com/cover.jpg",
  "download_url": "https://example.com/download.zip",
  "created_at": "2024-03-08T23:10:22.916Z"
}
```

#### `PUT /api/products/:id`
Met à jour un produit existant.

**Headers:**
```
Authorization: Bearer <votre_token>
```

**Body:**
```json
{
  "title": "Nouveau nom",
  "price": 39.99
}
```

**Réponse (200):**
```json
{
  "id": 1,
  "title": "Nouveau nom",
  "slug": "nom-du-produit",
  "type": "beat",
  "price": "39.99",
  "stock": 1,
  "is_exclusive": false,
  "is_active": true,
  "audio_preview_url": "https://example.com/preview.mp3",
  "cover_url": "https://example.com/cover.jpg",
  "download_url": "https://example.com/download.zip",
  "created_at": "2024-03-08T23:10:22.916Z"
}
```

#### `DELETE /api/products/:id`
Supprime un produit.

**Headers:**
```
Authorization: Bearer <votre_token>
```

**Réponse (200):**
```json
{
  "message": "Produit supprimé avec succès"
}
```

## 📄 Licences

### Routes publiques

#### `GET /api/licenses`
Récupère la liste de toutes les licences.

**Réponse (200):**
```json
[
  {
    "id": 1,
    "product_id": 5,
    "name": "Licence Standard",
    "price": "29.99",
    "contract_template_path": "/contracts/standard.pdf",
    "download_url": "https://example.com/download/standard.zip",
    "max_sales": 100,
    "created_at": "2024-03-08T23:10:22.916Z"
  }
]
```

#### `GET /api/licenses/:id`
Récupère les détails d'une licence spécifique.

**Réponse (200):**
```json
{
  "id": 1,
  "product_id": 5,
  "name": "Licence Standard",
  "price": "29.99",
  "contract_template_path": "/contracts/standard.pdf",
  "download_url": "https://example.com/download/standard.zip",
  "max_sales": 100,
  "created_at": "2024-03-08T23:10:22.916Z"
}
```

### Routes admin (protégées)

#### `POST /api/licenses`
Crée une nouvelle licence.

**Headers:**
```
Authorization: Bearer <votre_token>
```

**Body:**
```json
{
  "product_id": 5,
  "name": "Licence Standard",
  "price": 29.99,
  "contract_template_path": "/contracts/standard.pdf",
  "download_url": "https://example.com/download/standard.zip",
  "max_sales": 100
}
```

**Réponse (201):**
```json
{
  "id": 1,
  "product_id": 5,
  "name": "Licence Standard",
  "price": "29.99",
  "contract_template_path": "/contracts/standard.pdf",
  "download_url": "https://example.com/download/standard.zip",
  "max_sales": 100,
  "created_at": "2024-03-08T23:10:22.916Z"
}
```

#### `PUT /api/licenses/:id`
Met à jour une licence existante.

**Headers:**
```
Authorization: Bearer <votre_token>
```

**Body:**
```json
{
  "name": "Licence Premium",
  "price": 49.99,
  "max_sales": 50
}
```

**Réponse (200):**
```json
{
  "id": 1,
  "product_id": 5,
  "name": "Licence Premium",
  "price": "49.99",
  "contract_template_path": "/contracts/standard.pdf",
  "download_url": "https://example.com/download/standard.zip",
  "max_sales": 50,
  "created_at": "2024-03-08T23:10:22.916Z"
}
```

#### `DELETE /api/licenses/:id`
Supprime une licence.

**Headers:**
```
Authorization: Bearer <votre_token>
```

**Réponse (200):**
```json
{
  "message": "Licence supprimée avec succès"
}
```

## Routes des commandes

### Routes publiques

#### GET /api/orders/:id
Récupère les détails d'une commande spécifique.

**Paramètres :**
- `id` (path) : ID de la commande

**Réponse :**
```json
{
  "id": 1,
  "email": "client@example.com",
  "total_price": 59.98,
  "status": "pending",
  "created_at": "2024-03-20T10:00:00Z",
  "items": [
    {
      "id": 1,
      "product_id": 1,
      "license_id": 1,
      "quantity": 1,
      "price": 59.98,
      "product": {
        "title": "Test Beat",
        "type": "beat"
      },
      "license": {
        "name": "Licence Standard"
      }
    }
  ]
}
```

#### POST /api/orders
Crée une nouvelle commande.

**Corps de la requête :**
```json
{
  "email": "client@example.com",
  "items": [
    {
      "product_id": 1,
      "license_id": 1,
      "quantity": 1
    }
  ]
}
```

**Réponse :**
```json
{
  "id": 1,
  "email": "client@example.com",
  "total_price": 59.98,
  "status": "pending",
  "created_at": "2024-03-20T10:00:00Z"
}
```

### Routes protégées (admin)

#### GET /api/orders
Récupère la liste de toutes les commandes.

**Headers requis :**
- `Authorization: Bearer <token>`

**Réponse :**
```json
[
  {
    "id": 1,
    "email": "client@example.com",
    "total_price": 59.98,
    "status": "pending",
    "created_at": "2024-03-20T10:00:00Z",
    "items": [...]
  }
]
```

#### PUT /api/orders/:id
Met à jour le statut d'une commande.

**Headers requis :**
- `Authorization: Bearer <token>`

**Paramètres :**
- `id` (path) : ID de la commande

**Corps de la requête :**
```json
{
  "status": "completed"
}
```

**Réponse :**
```json
{
  "id": 1,
  "email": "client@example.com",
  "total_price": 59.98,
  "status": "completed",
  "created_at": "2024-03-20T10:00:00Z"
}
```

#### GET /api/orders/:id/download
Récupère les liens de téléchargement pour une commande.

**Headers requis :**
- `Authorization: Bearer <token>`

**Paramètres :**
- `id` (path) : ID de la commande

**Réponse :**
```json
{
  "files": [
    {
      "product_download_url": "https://example.com/download.zip",
      "license_download_url": "https://example.com/download/standard.zip",
      "contract_template_path": "/contracts/standard.pdf"
    }
  ]
}
```

#### DELETE /api/orders/:id
Supprime une commande et restaure le stock des produits.

**Headers requis :**
- `Authorization: Bearer <token>`

**Paramètres :**
- `id` (path) : ID de la commande

**Réponse :**
```json
{
  "message": "Commande supprimée avec succès"
}
```

## 🚀 Routes de test

### `GET /ping`
Vérifie que le serveur répond.

**Réponse (200):**
```json
{
  "message": "pong"
}
```

### `GET /test-db`
Vérifie la connexion à la base de données.

**Réponse (200):**
```json
{
  "success": true,
  "time": "2024-03-08T23:10:22.916Z"
}
```

## ⚠️ Codes d'erreur

- `400` - Requête invalide
- `401` - Non authentifié
- `403` - Non autorisé
- `404` - Ressource non trouvée
- `500` - Erreur serveur

## 🔒 Sécurité

- Toutes les routes admin nécessitent un token JWT valide
- Les mots de passe sont hashés avec bcrypt
- Les tokens JWT expirent après 24h
- Les routes sont protégées contre les injections SQL
- CORS est configuré pour la sécurité

## 🛠️ Développement

Pour tester l'API localement :

1. Installer les dépendances :
```bash
npm install
```

2. Créer un fichier `.env` :
```
DATABASE_URL=postgresql://user:password@localhost:5432/armed
JWT_SECRET=votre_secret_jwt
JWT_EXPIRES_IN=24h
ADMIN_EMAIL=admin@armed.store
ADMIN_PASSWORD=votre_mot_de_passe
```

3. Démarrer le serveur :
```bash
npm run dev
```

4. Exécuter les tests :
```bash
npm run test:auth
npm run test:products
npm run test:licenses
``` 