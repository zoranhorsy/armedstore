import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pool from './utils/db.js';

console.log('DATABASE_URL:', process.env.DATABASE_URL);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0].now });
  } catch (err) {
    console.error('Erreur DB:', err); // log complet
    res.status(500).json({
      success: false,
      error: err.message || String(err),
      details: err // Ajoute tout l'objet erreur pour debug
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
