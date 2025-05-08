import { query } from '../utils/db.js';

// Récupérer tous les produits
export const getProducts = async (req, res) => {
  try {
    const result = await query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
};

// Récupérer un produit par son ID
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM products WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du produit' });
  }
};

// Créer un nouveau produit
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      slug,
      type,
      price,
      stock,
      is_exclusive,
      is_active,
      audio_preview_url,
      cover_url,
      download_url
    } = req.body;

    const result = await query(
      `INSERT INTO products (
        title, slug, type, price, stock, is_exclusive, is_active,
        audio_preview_url, cover_url, download_url
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        title,
        slug,
        type,
        price,
        stock,
        is_exclusive,
        is_active,
        audio_preview_url,
        cover_url,
        download_url
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la création du produit:', error);
    res.status(500).json({ error: 'Erreur lors de la création du produit' });
  }
};

// Mettre à jour un produit
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Vérifier si le produit existe
    const productExists = await query('SELECT * FROM products WHERE id = $1', [id]);
    if (productExists.rows.length === 0) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }

    // Construire la requête dynamiquement en fonction des champs fournis
    const fields = [];
    const values = [];
    let paramCount = 1;

    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'Aucune mise à jour fournie' });
    }

    values.push(id);
    const result = await query(
      `UPDATE products SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du produit' });
  }
};

// Supprimer un produit
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }

    res.json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression du produit' });
  }
}; 