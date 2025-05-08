import express from 'express';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

// Routes publiques
router.get('/', getProducts);
router.get('/:id', getProduct);

// Routes protégées (admin uniquement)
router.post('/', verifyToken, isAdmin, createProduct);
router.put('/:id', verifyToken, isAdmin, updateProduct);
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

export default router; 