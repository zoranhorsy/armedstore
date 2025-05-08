import { query } from '../utils/db.js';

// Récupérer toutes les licences
export const getLicenses = async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM licenses ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des licences:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Récupérer une licence par ID
export const getLicense = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(
      'SELECT * FROM licenses WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Licence non trouvée' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération de la licence:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Créer une nouvelle licence
export const createLicense = async (req, res) => {
  try {
    const {
      product_id,
      name,
      price,
      contract_template_path,
      download_url,
      max_sales
    } = req.body;

    // Vérifier si le produit existe
    const productCheck = await query(
      'SELECT id FROM products WHERE id = $1',
      [product_id]
    );

    if (productCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }

    const result = await query(
      `INSERT INTO licenses 
       (product_id, name, price, contract_template_path, download_url, max_sales) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [product_id, name, price, contract_template_path, download_url, max_sales]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la création de la licence:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Mettre à jour une licence
export const updateLicense = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      price,
      contract_template_path,
      download_url,
      max_sales
    } = req.body;

    // Vérifier si la licence existe
    const licenseCheck = await query(
      'SELECT id FROM licenses WHERE id = $1',
      [id]
    );

    if (licenseCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Licence non trouvée' });
    }

    // Construire la requête de mise à jour dynamiquement
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramCount}`);
      values.push(name);
      paramCount++;
    }
    if (price !== undefined) {
      updates.push(`price = $${paramCount}`);
      values.push(price);
      paramCount++;
    }
    if (contract_template_path !== undefined) {
      updates.push(`contract_template_path = $${paramCount}`);
      values.push(contract_template_path);
      paramCount++;
    }
    if (download_url !== undefined) {
      updates.push(`download_url = $${paramCount}`);
      values.push(download_url);
      paramCount++;
    }
    if (max_sales !== undefined) {
      updates.push(`max_sales = $${paramCount}`);
      values.push(max_sales);
      paramCount++;
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'Aucune donnée à mettre à jour' });
    }

    values.push(id);
    const result = await query(
      `UPDATE licenses 
       SET ${updates.join(', ')} 
       WHERE id = $${paramCount} 
       RETURNING *`,
      values
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la licence:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Supprimer une licence
export const deleteLicense = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si la licence existe
    const licenseCheck = await query(
      'SELECT id FROM licenses WHERE id = $1',
      [id]
    );

    if (licenseCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Licence non trouvée' });
    }

    await query('DELETE FROM licenses WHERE id = $1', [id]);
    res.json({ message: 'Licence supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la licence:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}; 