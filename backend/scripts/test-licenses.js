import 'dotenv/config';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';
let authToken = null;
let testProduct = null;
let testLicense = null;

// Fonction utilitaire pour les tests
const test = async (name, fn) => {
  try {
    console.log(`\n🧪 Test: ${name}`);
    await fn();
    console.log('✅ Test réussi');
  } catch (error) {
    console.error('❌ Test échoué:', error.response?.data || error.message);
    throw error;
  }
};

// Connexion en tant qu'admin
const loginAsAdmin = async () => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email: process.env.ADMIN_EMAIL || 'admin@armed.store',
    password: process.env.ADMIN_PASSWORD || 'admin123!'
  });
  authToken = response.data.token;
  console.log('🔑 Token admin récupéré');
};

// Créer un produit de test
const createTestProduct = async () => {
  const response = await axios.post(
    `${API_URL}/products`,
    {
      title: 'Test Beat',
      slug: 'test-beat',
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
      headers: { Authorization: `Bearer ${authToken}` }
    }
  );
  testProduct = response.data;
  console.log('🎵 Produit de test créé');
};

// Tests des licences
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
      headers: { Authorization: `Bearer ${authToken}` }
    }
  );
  testLicense = response.data;
  console.log('📄 Licence créée:', testLicense);
};

const testGetLicenses = async () => {
  const response = await axios.get(`${API_URL}/licenses`);
  const licenses = response.data;
  console.log('📋 Liste des licences:', licenses);
  if (!Array.isArray(licenses)) {
    throw new Error('La réponse n\'est pas un tableau');
  }
};

const testGetLicense = async () => {
  const response = await axios.get(`${API_URL}/licenses/${testLicense.id}`);
  const license = response.data;
  console.log('📄 Détails de la licence:', license);
  if (license.id !== testLicense.id) {
    throw new Error('ID de licence incorrect');
  }
};

const testUpdateLicense = async () => {
  const response = await axios.put(
    `${API_URL}/licenses/${testLicense.id}`,
    {
      name: 'Licence Premium',
      price: 49.99,
      max_sales: 50
    },
    {
      headers: { Authorization: `Bearer ${authToken}` }
    }
  );
  const updatedLicense = response.data;
  console.log('📄 Licence mise à jour:', updatedLicense);
  
  // Vérifier les mises à jour
  if (updatedLicense.name !== 'Licence Premium') {
    throw new Error('Le nom n\'a pas été mis à jour');
  }
  if (Number(updatedLicense.price) !== 49.99) {
    throw new Error('Le prix n\'a pas été mis à jour');
  }
  if (updatedLicense.max_sales !== 50) {
    throw new Error('Le nombre max de ventes n\'a pas été mis à jour');
  }
  
  testLicense = updatedLicense;
};

const testDeleteLicense = async () => {
  await axios.delete(
    `${API_URL}/licenses/${testLicense.id}`,
    {
      headers: { Authorization: `Bearer ${authToken}` }
    }
  );
  console.log('🗑️ Licence supprimée');
};

// Exécution des tests
const runTests = async () => {
  try {
    await test('Login Admin', loginAsAdmin);
    await test('Créer Produit Test', createTestProduct);
    await test('Créer Licence', testCreateLicense);
    await test('Récupérer Liste Licences', testGetLicenses);
    await test('Récupérer Détails Licence', testGetLicense);
    await test('Mettre à Jour Licence', testUpdateLicense);
    await test('Supprimer Licence', testDeleteLicense);
    
    console.log('\n✨ Tous les tests sont passés avec succès !');
  } catch (error) {
    console.error('\n❌ Tests échoués:', error.message);
    process.exit(1);
  }
};

runTests(); 