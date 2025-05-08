import express from 'express';
import { verifyToken, isAdmin } from '../middlewares/auth.js';
import * as licenseController from '../controllers/licenseController.js';

const router = express.Router();

// Routes publiques
router.get('/', licenseController.getLicenses);
router.get('/:id', licenseController.getLicense);

// Routes protégées (admin uniquement)
router.post('/', verifyToken, isAdmin, licenseController.createLicense);
router.put('/:id', verifyToken, isAdmin, licenseController.updateLicense);
router.delete('/:id', verifyToken, isAdmin, licenseController.deleteLicense);

export default router; 