import jwt from 'jsonwebtoken';
import { query } from '../utils/db.js';

// Vérifier le token JWT
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token manquant' });
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Token invalide' });
    }
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Vérifier si l'utilisateur est admin
export const isAdmin = async (req, res, next) => {
  try {
    const result = await query(
      'SELECT role FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0 || result.rows[0].role !== 'admin') {
      return res.status(403).json({ error: 'Accès non autorisé' });
    }

    next();
  } catch (error) {
    console.error('Erreur lors de la vérification du rôle:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}; 