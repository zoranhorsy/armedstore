import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { query } from './utils/db.js';
import { initDatabase } from './utils/initDb.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import licenseRoutes from './routes/licenseRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

console.log('DATABASE_URL:', process.env.DATABASE_URL);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/licenses', licenseRoutes);
app.use('/api/orders', orderRoutes);

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.get('/test-db', async (req, res) => {
  try {
    const result = await query('SELECT NOW() as time');
    res.json({ success: true, time: result.rows[0].time });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Une erreur est survenue' });
});

const PORT = process.env.PORT || 3000;

// Initialiser la base de données avant de démarrer le serveur
initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  });
