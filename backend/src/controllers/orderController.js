import { query } from '../utils/db.js';

// Récupérer toutes les commandes
export const getOrders = async (req, res) => {
  try {
    const result = await query(`
      SELECT o.*, 
        json_agg(
          json_build_object(
            'id', oi.id,
            'product_id', oi.product_id,
            'license_id', oi.license_id,
            'quantity', oi.quantity,
            'price', oi.price,
            'product', json_build_object(
              'title', p.title,
              'type', p.type
            ),
            'license', json_build_object(
              'name', l.name
            )
          )
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      LEFT JOIN licenses l ON oi.license_id = l.id
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des commandes' });
  }
};

// Récupérer une commande spécifique
export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(`
      SELECT o.*, 
        json_agg(
          json_build_object(
            'id', oi.id,
            'product_id', oi.product_id,
            'license_id', oi.license_id,
            'quantity', oi.quantity,
            'price', oi.price,
            'product', json_build_object(
              'title', p.title,
              'type', p.type
            ),
            'license', json_build_object(
              'name', l.name
            )
          )
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      LEFT JOIN licenses l ON oi.license_id = l.id
      WHERE o.id = $1
      GROUP BY o.id
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Commande non trouvée' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération de la commande:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la commande' });
  }
};

// Créer une nouvelle commande
export const createOrder = async (req, res) => {
  const client = await query.getClient();
  
  try {
    await client.query('BEGIN');

    const { email, items } = req.body;
    let total = 0;

    // Vérifier et calculer le total
    for (const item of items) {
      const productResult = await client.query(
        'SELECT price, stock FROM products WHERE id = $1',
        [item.product_id]
      );

      if (productResult.rows.length === 0) {
        throw new Error(`Produit ${item.product_id} non trouvé`);
      }

      const licenseResult = await client.query(
        'SELECT price FROM licenses WHERE id = $1',
        [item.license_id]
      );

      if (licenseResult.rows.length === 0) {
        throw new Error(`Licence ${item.license_id} non trouvée`);
      }

      const productPrice = parseFloat(productResult.rows[0].price);
      const licensePrice = parseFloat(licenseResult.rows[0].price);
      const itemTotal = (productPrice + licensePrice) * item.quantity;
      total += itemTotal;

      // Vérifier le stock
      if (productResult.rows[0].stock < item.quantity) {
        throw new Error(`Stock insuffisant pour le produit ${item.product_id}`);
      }
    }

    // Créer la commande
    const orderResult = await client.query(
      'INSERT INTO orders (email, total_price, status) VALUES ($1, $2, $3) RETURNING *',
      [email, total, 'pending']
    );

    const order = orderResult.rows[0];

    // Créer les items de la commande
    for (const item of items) {
      const productResult = await client.query(
        'SELECT price FROM products WHERE id = $1',
        [item.product_id]
      );
      const licenseResult = await client.query(
        'SELECT price FROM licenses WHERE id = $1',
        [item.license_id]
      );

      const productPrice = parseFloat(productResult.rows[0].price);
      const licensePrice = parseFloat(licenseResult.rows[0].price);
      const itemPrice = (productPrice + licensePrice) * item.quantity;

      await client.query(
        'INSERT INTO order_items (order_id, product_id, license_id, quantity, price) VALUES ($1, $2, $3, $4, $5)',
        [order.id, item.product_id, item.license_id, item.quantity, itemPrice]
      );

      // Mettre à jour le stock
      await client.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2',
        [item.quantity, item.product_id]
      );
    }

    await client.query('COMMIT');
    res.status(201).json(order);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erreur lors de la création de la commande:', error);
    res.status(500).json({ error: error.message || 'Erreur lors de la création de la commande' });
  } finally {
    client.release();
  }
};

// Mettre à jour une commande
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Commande non trouvée' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la commande:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la commande' });
  }
};

// Supprimer une commande
export const deleteOrder = async (req, res) => {
  const client = await query.getClient();
  
  try {
    await client.query('BEGIN');

    const { id } = req.params;

    // Récupérer les items de la commande pour restaurer le stock
    const itemsResult = await client.query(
      'SELECT product_id, quantity FROM order_items WHERE order_id = $1',
      [id]
    );

    // Restaurer le stock pour chaque produit
    for (const item of itemsResult.rows) {
      await client.query(
        'UPDATE products SET stock = stock + $1 WHERE id = $2',
        [item.quantity, item.product_id]
      );
    }

    // Supprimer les items de la commande
    await client.query('DELETE FROM order_items WHERE order_id = $1', [id]);

    // Supprimer la commande
    const result = await client.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      throw new Error('Commande non trouvée');
    }

    await client.query('COMMIT');
    res.json({ message: 'Commande supprimée avec succès' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erreur lors de la suppression de la commande:', error);
    res.status(500).json({ error: error.message || 'Erreur lors de la suppression de la commande' });
  } finally {
    client.release();
  }
};

// Télécharger les fichiers d'une commande
export const downloadOrderFiles = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(`
      SELECT 
        p.download_url as product_download_url,
        l.download_url as license_download_url,
        l.contract_template_path
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      JOIN licenses l ON oi.license_id = l.id
      WHERE oi.order_id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Fichiers non trouvés' });
    }

    res.json({
      files: result.rows.map(row => ({
        product_download_url: row.product_download_url,
        license_download_url: row.license_download_url,
        contract_template_path: row.contract_template_path
      }))
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des fichiers:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des fichiers' });
  }
}; 