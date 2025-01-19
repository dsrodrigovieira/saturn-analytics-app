import { AUTH_VALIDATION_URL } from './data.js';

async function checkAuth() {
  try {
    const response = await fetch(AUTH_VALIDATION_URL, { credentials: 'include' });
    if (!response.ok) {
      throw new Error('Não autenticado');
    }    
  } catch (error) {
    alert('Acesso negado! Por favor, faça login.');
    window.location.href = 'index.html';
  }
}

// Verifica a autenticação ao carregar a página home
if (window.location.pathname.includes('home.html')) {
  checkAuth();
}
