import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Configuration
dotenv.config({ path: join(dirname(fileURLToPath(import.meta.url)), '../.env') });

const API_URL = 'http://localhost:3000/api';
let adminToken;
let testProduct;
let testLicense;
let testOrder;

// Fonction utilitaire pour les tests
const test = async (name, fn) => {
  console.log(`\n🧪 Test: ${name}`);
  try {
    await fn();
    console.log('✅ Test réussi');
  } catch (error) {
    console.error('❌ Test échoué:', error.response?.data || error.message);
    process.exit(1);
  }
};

// Test de connexion admin
const testAdminLogin = async () => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email: process.env.ADMIN_EMAIL || 'admin@armed.store',
    password: process.env.ADMIN_PASSWORD || 'admin123!'
  });
  adminToken = response.data.token;
  console.log('🔑 Token admin récupéré');
};

// Test de création d'un produit
const testCreateProduct = async () => {
  const timestamp = Date.now();
  const response = await axios.post(
    `${API_URL}/products`,
    {
      title: `Test Beat ${timestamp}`,
      slug: `test-beat-${timestamp}`,
      type: 'beat',
      price: 29.99,
      stock: 1,
      is_exclusive: false,
      is_active: true,
      audio_preview_url: 'https://example.com/preview.mp3',
      cover_url: 'https://example.com/cover.jpg',
      download_url: 'https://example.com/download.zip'
    },
    {
      headers: { Authorization: `Bearer ${adminToken}` }
    }
  );
  testProduct = response.data;
  console.log('🎵 Produit de test créé');
};

// Test de création d'une licence
const testCreateLicense = async () => {
  const response = await axios.post(
    `${API_URL}/licenses`,
    {
      product_id: testProduct.id,
      name: 'Licence Standard',
      price: 29.99,
      contract_template_path: '/contracts/standard.pdf',
      download_url: 'https://example.com/download/standard.zip',
      max_sales: 100
    },
    {
      headers: { Authorization: `Bearer ${adminToken}` }
    }
  );
  testLicense = response.data;
  console.log('📄 Licence de test créée');
};

// Test de création d'une commande
const testCreateOrder = async () => {
  const response = await axios.post(
    `${API_URL}/orders`,
    {
      email: 'client@example.com',
      items: [
        {
          product_id: testProduct.id,
          license_id: testLicense.id,
          quantity: 1
        }
      ]
    }
  );
  testOrder = response.data;
  console.log('🛒 Commande créée:', testOrder);
};

// Test de récupération de la liste des commandes
const testGetOrders = async () => {
  const response = await axios.get(`${API_URL}/orders`, {
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  console.log('📋 Liste des commandes:', response.data);
};

// Test de récupération des détails d'une commande
const testGetOrder = async () => {
  const response = await axios.get(`${API_URL}/orders/${testOrder.id}`, {
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  console.log('📄 Détails de la commande:', response.data);
};

// Test de mise à jour du statut d'une commande
const testUpdateOrderStatus = async () => {
  const response = await axios.put(
    `${API_URL}/orders/${testOrder.id}`,
    {
      status: 'completed'
    },
    {
      headers: { Authorization: `Bearer ${adminToken}` }
    }
  );
  console.log('📝 Commande mise à jour:', response.data);
};

// Test de téléchargement des fichiers
const testDownloadFiles = async () => {
  const response = await axios.get(`${API_URL}/orders/${testOrder.id}/download`, {
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  console.log('📦 Liens de téléchargement:', response.data);
};

// Test de suppression d'une commande
const testDeleteOrder = async () => {
  await axios.delete(`${API_URL}/orders/${testOrder.id}`, {
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  console.log('🗑️ Commande supprimée');
};

// Exécution des tests
const runTests = async () => {
  try {
    await test('Login Admin', testAdminLogin);
    await test('Créer Produit Test', testCreateProduct);
    await test('Créer Licence Test', testCreateLicense);
    await test('Créer Commande', testCreateOrder);
    await test('Récupérer Liste Commandes', testGetOrders);
    await test('Récupérer Détails Commande', testGetOrder);
    await test('Mettre à Jour Statut Commande', testUpdateOrderStatus);
    await test('Télécharger Fichiers', testDownloadFiles);
    await test('Supprimer Commande', testDeleteOrder);

    console.log('\n✨ Tous les tests sont passés avec succès !');
  } catch (error) {
    console.error('\n❌ Erreur lors de l\'exécution des tests:', error);
    process.exit(1);
  }
};

runTests(); 