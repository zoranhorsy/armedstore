import express from 'express'
import { register, login } from '../controllers/authController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Routes publiques
router.post('/register', register)
router.post('/login', login)

// Route protégée pour tester l'authentification
router.get('/me', verifyToken, (req, res) => {
  res.json({ user: req.user })
})

export default router 