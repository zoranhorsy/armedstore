import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { query } from '../utils/db.js'

export const register = async (req, res) => {
  try {
    const { email, password } = req.body

    // Vérifier si l'email existe déjà
    const userExists = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )

    if (userExists.rows.length > 0) {
      return res.status(400).json({
        error: 'Cet email est déjà utilisé'
      })
    }

    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Créer l'utilisateur
    const result = await query(
      'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role',
      [email, hashedPassword, 'admin']
    )

    // Générer le token JWT
    const token = jwt.sign(
      { id: result.rows[0].id, role: result.rows[0].role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    res.status(201).json({
      user: {
        id: result.rows[0].id,
        email: result.rows[0].email,
        role: result.rows[0].role
      },
      token
    })
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error)
    res.status(500).json({
      error: 'Erreur lors de l\'inscription'
    })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Vérifier si l'utilisateur existe
    const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: 'Email ou mot de passe incorrect'
      })
    }

    const user = result.rows[0]

    // Vérifier si c'est un admin
    if (user.role !== 'admin') {
      return res.status(403).json({
        error: 'Accès non autorisé'
      })
    }

    // Vérifier le mot de passe
    const validPassword = await bcrypt.compare(password, user.password_hash)
    if (!validPassword) {
      return res.status(401).json({
        error: 'Email ou mot de passe incorrect'
      })
    }

    // Générer le token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      },
      token
    })
  } catch (error) {
    console.error('Erreur lors de la connexion:', error)
    res.status(500).json({
      error: 'Erreur lors de la connexion'
    })
  }
} 