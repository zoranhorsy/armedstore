import { query } from './db.js';

export const initDatabase = async () => {
  try {
    // Créer la table users si elle n'existe pas
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Créer la table products si elle n'existe pas
    await query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        type VARCHAR(50) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        stock INTEGER DEFAULT 0,
        is_exclusive BOOLEAN DEFAULT false,
        is_active BOOLEAN DEFAULT true,
        audio_preview_url TEXT,
        cover_url TEXT,
        download_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Créer la table licenses si elle n'existe pas
    await query(`
      CREATE TABLE IF NOT EXISTS licenses (
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id),
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        contract_template_path TEXT,
        download_url TEXT,
        max_sales INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Créer la table orders si elle n'existe pas
    await query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        total_price DECIMAL(10,2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Créer la table order_items si elle n'existe pas
    await query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id),
        license_id INTEGER REFERENCES licenses(id),
        quantity INTEGER NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Base de données initialisée avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la base de données:', error);
    throw error;
  }
}; 