// backend/src/utils/db.js

import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

// Test de la connexion
pool.connect((err, client, release) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err.stack)
  } else {
    console.log('Connexion à PostgreSQL établie avec succès')
    release()
  }
})

// Gestion des erreurs de connexion
pool.on('error', (err) => {
  console.error('Erreur inattendue sur le client PostgreSQL:', err)
  process.exit(-1)
})

export const query = async (text, params) => {
  const client = await pool.connect()
  try {
    return await client.query(text, params)
  } finally {
    client.release()
  }
}

// Fonction pour obtenir un client de la pool pour les transactions
query.getClient = () => pool.connect()

export default query