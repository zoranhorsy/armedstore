import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = 'http://localhost:3000';
let authToken = null;
let testUser = null;

// Fonction utilitaire pour les tests
const test = async (name, fn) => {
  try {
    console.log(`\n🧪 Test: ${name}`);
    await fn();
    console.log('✅ Succès');
  } catch (error) {
    console.error('❌ Échec:', error.response?.data || error.message);
    throw error; // Propager l'erreur pour arrêter la suite des tests
  }
};

// Tests de base
const testPing = async () => {
  const response = await axios.get(`${API_URL}/ping`);
  if (response.data.message !== 'pong') {
    throw new Error('Réponse ping invalide');
  }
};

const testDatabase = async () => {
  const response = await axios.get(`${API_URL}/test-db`);
  if (!response.data.success || !response.data.time) {
    throw new Error('Réponse test-db invalide');
  }
};

// Tests d'authentification
const testRegister = async () => {
  testUser = {
    email: `test-${Date.now()}@example.com`,
    password: 'Test123!'
  };

  console.log('📧 Création utilisateur test:', testUser.email);

  const response = await axios.post(`${API_URL}/api/auth/register`, testUser);
  if (!response.data.token || !response.data.user) {
    throw new Error('Réponse register invalide');
  }

  console.log('👤 Utilisateur créé:', response.data.user);

  // Test avec email déjà utilisé
  try {
    await axios.post(`${API_URL}/api/auth/register`, testUser);
    throw new Error('L\'inscription avec un email existant devrait échouer');
  } catch (error) {
    if (error.response?.status !== 400) {
      throw new Error('Mauvais code d\'erreur pour email existant');
    }
  }
};

const testLogin = async () => {
  if (!testUser) {
    throw new Error('testUser non défini');
  }

  console.log('🔑 Tentative de connexion avec:', testUser.email);

  // Test avec identifiants valides
  const response = await axios.post(`${API_URL}/api/auth/login`, testUser);
  if (!response.data.token || !response.data.user) {
    throw new Error('Réponse login invalide');
  }

  authToken = response.data.token;
  console.log('🔐 Token obtenu:', authToken.substring(0, 20) + '...');

  // Test avec email invalide
  try {
    await axios.post(`${API_URL}/api/auth/login`, {
      email: 'invalid@example.com',
      password: testUser.password
    });
    throw new Error('Le login avec un email invalide devrait échouer');
  } catch (error) {
    if (error.response?.status !== 401) {
      throw new Error('Mauvais code d\'erreur pour email invalide');
    }
  }

  // Test avec mot de passe invalide
  try {
    await axios.post(`${API_URL}/api/auth/login`, {
      email: testUser.email,
      password: 'wrongpassword'
    });
    throw new Error('Le login avec un mot de passe invalide devrait échouer');
  } catch (error) {
    if (error.response?.status !== 401) {
      throw new Error('Mauvais code d\'erreur pour mot de passe invalide');
    }
  }
};

const testMe = async () => {
  if (!authToken) {
    throw new Error('authToken non défini');
  }

  console.log('🔍 Test de /me avec token:', authToken.substring(0, 20) + '...');

  // Test avec token valide
  const response = await axios.get(`${API_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${authToken}` }
  });
  if (!response.data.user) {
    throw new Error('Réponse me invalide');
  }

  console.log('👤 Données utilisateur récupérées:', response.data.user);

  // Test sans token
  try {
    await axios.get(`${API_URL}/api/auth/me`);
    throw new Error('La requête sans token devrait échouer');
  } catch (error) {
    if (error.response?.status !== 401) {
      throw new Error('Mauvais code d\'erreur pour requête sans token');
    }
  }

  // Test avec token invalide
  try {
    await axios.get(`${API_URL}/api/auth/me`, {
      headers: { Authorization: 'Bearer invalid-token' }
    });
    throw new Error('La requête avec un token invalide devrait échouer');
  } catch (error) {
    if (error.response?.status !== 401) {
      throw new Error('Mauvais code d\'erreur pour token invalide');
    }
  }
};

// Exécution des tests
const runTests = async () => {
  console.log('🚀 Démarrage des tests...\n');

  try {
    // Tests de base
    await test('Ping', testPing);
    await test('Test Database', testDatabase);

    // Tests d'authentification
    await test('Register', testRegister);
    await test('Login', testLogin);
    await test('Me', testMe);

    console.log('\n✨ Tests terminés avec succès !');
  } catch (error) {
    console.error('\n❌ Tests interrompus suite à une erreur');
    process.exit(1);
  }
};

runTests(); 