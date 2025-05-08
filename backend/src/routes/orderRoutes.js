import express from 'express';
import { verifyToken, isAdmin } from '../middlewares/auth.js';
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  downloadOrderFiles
} from '../controllers/orderController.js';

const router = express.Router();

// Routes publiques
router.post('/', createOrder);

// Routes protégées (admin)
router.get('/', verifyToken, isAdmin, getOrders);
router.get('/:id', verifyToken, isAdmin, getOrder);
router.put('/:id', verifyToken, isAdmin, updateOrder);
router.delete('/:id', verifyToken, isAdmin, deleteOrder);
router.get('/:id/download', verifyToken, isAdmin, downloadOrderFiles);

export default router; 