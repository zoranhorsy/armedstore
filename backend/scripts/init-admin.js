import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = 'http://localhost:3000';

const initAdmin = async () => {
  try {
    const adminUser = {
      email: process.env.ADMIN_EMAIL || 'admin@armed.store',
      password: process.env.ADMIN_PASSWORD || 'admin123!'
    };

    console.log('🔧 Initialisation du compte admin...');
    console.log('📧 Email:', adminUser.email);

    const response = await axios.post(`${API_URL}/api/auth/register`, adminUser);
    
    console.log('✅ Compte admin créé avec succès !');
    console.log('👤 Détails:', response.data.user);
    console.log('🔑 Token:', response.data.token);
  } catch (error) {
    if (error.response?.data?.error === 'Cet email est déjà utilisé') {
      console.log('ℹ️ Le compte admin existe déjà');
    } else {
      console.error('❌ Erreur:', error.response?.data || error.message);
    }
  }
};

initAdmin(); 