import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = 'http://localhost:3000';
let authToken = null;
let testProduct = null;

// Fonction utilitaire pour les tests
const test = async (name, fn) => {
  try {
    console.log(`\n🧪 Test: ${name}`);
    await fn();
    console.log('✅ Succès');
  } catch (error) {
    console.error('❌ Échec:', error.response?.data || error.message);
    throw error;
  }
};

// Authentification admin
const loginAsAdmin = async () => {
  const adminUser = {
    email: process.env.ADMIN_EMAIL || 'admin@armed.store',
    password: process.env.ADMIN_PASSWORD || 'admin123!'
  };

  console.log('🔑 Connexion admin...');
  const response = await axios.post(`${API_URL}/api/auth/login`, adminUser);
  authToken = response.data.token;
  console.log('🔐 Token admin obtenu');
};

// Tests des produits
const testCreateProduct = async () => {
  testProduct = {
    title: `Test Product ${Date.now()}`,
    slug: `test-product-${Date.now()}`,
    type: 'beat',
    price: 29.99,
    stock: 1,
    is_exclusive: false,
    is_active: true,
    audio_preview_url: 'https://example.com/preview.mp3',
    cover_url: 'https://example.com/cover.jpg',
    download_url: 'https://example.com/download.zip'
  };

  console.log('📦 Création produit test:', testProduct.title);

  const response = await axios.post(
    `${API_URL}/api/products`,
    testProduct,
    {
      headers: { Authorization: `Bearer ${authToken}` }
    }
  );

  if (!response.data.id) {
    throw new Error('Réponse create product invalide');
  }

  testProduct.id = response.data.id;
  console.log('✨ Produit créé:', response.data);
};

const testGetProducts = async () => {
  console.log('🔍 Récupération liste des produits...');
  const response = await axios.get(`${API_URL}/api/products`);
  
  if (!Array.isArray(response.data)) {
    throw new Error('La réponse doit être un tableau');
  }

  console.log(`📋 ${response.data.length} produits trouvés`);
};

const testGetProduct = async () => {
  if (!testProduct?.id) {
    throw new Error('testProduct non défini');
  }

  console.log('🔍 Récupération détails produit:', testProduct.id);
  const response = await axios.get(`${API_URL}/api/products/${testProduct.id}`);

  if (response.data.id !== testProduct.id) {
    throw new Error('Mauvais produit récupéré');
  }

  console.log('✨ Détails produit:', response.data);
};

const testUpdateProduct = async () => {
  if (!testProduct?.id) {
    throw new Error('testProduct non défini');
  }

  const updates = {
    title: `Updated Product ${Date.now()}`,
    price: 39.99
  };

  console.log('📝 Mise à jour produit:', testProduct.id);
  const response = await axios.put(
    `${API_URL}/api/products/${testProduct.id}`,
    updates,
    {
      headers: { Authorization: `Bearer ${authToken}` }
    }
  );

  // Vérifier que les champs mis à jour ont bien été modifiés
  const updatedProduct = response.data;
  if (updatedProduct.title !== updates.title) {
    throw new Error(`Le titre n'a pas été mis à jour. Attendu: ${updates.title}, Reçu: ${updatedProduct.title}`);
  }

  // Convertir les prix en nombres pour la comparaison
  const expectedPrice = Number(updates.price);
  const receivedPrice = Number(updatedProduct.price);
  
  if (isNaN(expectedPrice) || isNaN(receivedPrice)) {
    throw new Error(`Format de prix invalide. Attendu: ${updates.price}, Reçu: ${updatedProduct.price}`);
  }

  if (Math.abs(expectedPrice - receivedPrice) > 0.01) {
    throw new Error(`Le prix n'a pas été mis à jour. Attendu: ${expectedPrice}, Reçu: ${receivedPrice}`);
  }

  // Mettre à jour testProduct avec les nouvelles valeurs
  testProduct = { ...testProduct, ...updates };
  console.log('✨ Produit mis à jour:', updatedProduct);
};

const testDeleteProduct = async () => {
  if (!testProduct?.id) {
    throw new Error('testProduct non défini');
  }

  console.log('🗑️ Suppression produit:', testProduct.id);
  await axios.delete(
    `${API_URL}/api/products/${testProduct.id}`,
    {
      headers: { Authorization: `Bearer ${authToken}` }
    }
  );

  // Vérifier que le produit n'existe plus
  try {
    await axios.get(`${API_URL}/api/products/${testProduct.id}`);
    throw new Error('Le produit devrait être supprimé');
  } catch (error) {
    if (error.response?.status !== 404) {
      throw new Error('Mauvais code d\'erreur pour produit supprimé');
    }
  }

  console.log('✨ Produit supprimé avec succès');
};

// Exécution des tests
const runTests = async () => {
  console.log('🚀 Démarrage des tests produits...\n');

  try {
    await test('Login Admin', loginAsAdmin);
    await test('Create Product', testCreateProduct);
    await test('Get Products', testGetProducts);
    await test('Get Product', testGetProduct);
    await test('Update Product', testUpdateProduct);
    await test('Delete Product', testDeleteProduct);

    console.log('\n✨ Tests produits terminés avec succès !');
  } catch (error) {
    console.error('\n❌ Tests interrompus suite à une erreur');
    process.exit(1);
  }
};

runTests(); 