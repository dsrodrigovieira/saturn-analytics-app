const API_URL = 'http://localhost:3000/auth';

// // Função para verificar se o token está presente e válido no cookie (PRD)
// function checkAuth() {
//   // Obter o cookie "authToken"  
//   const cookies = document.cookie.split(';').reduce((acc, cookie) => {
//     const [key, value] = cookie.split('=');
//     acc[key.trim()] = value;
//     return acc;
//   }, {});
//   // Verificar se o token existe
//   if (!cookies.authToken) {
//     alert('Acesso negado! Por favor, faça login.');
//     window.location.href = 'index.html'; // Redireciona para a página de login
//   }
// }

async function checkAuth() {
  try {
    const response = await fetch('http://localhost:3000/auth/validate', {
      credentials: 'include', // Envia o cookie com a requisição
    });

    if (!response.ok) {
      throw new Error('Não autenticado');
    }

    const data = await response.json();
  } catch (error) {
    alert('Acesso negado! Por favor, faça login.');
    window.location.href = 'index.html';
  }
}

// Verifica a autenticação ao carregar a página home
if (window.location.pathname.includes('home.html')) {
  checkAuth();
}

  // Função para obter um cookie pelo nome
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
    return null;
  }


document.getElementById('form-btn').addEventListener('click', async (e) => {
  e.preventDefault();

  const email = document.getElementById('user-email').value;
  const password = document.getElementById('user-pw').value;

  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // Inclui cookies na requisição
    });

    if (!response.ok) {
      throw new Error(`Falha no login. ${response.message}`);
    }

    const data = await response.json();
    const token = getCookie('authToken');
    sessionStorage.setItem('authToken', token);
    
    alert(data.message);

    // Redireciona para a página home após login bem-sucedido
    window.location.href = 'home.html';      
  } catch (error) {
    alert('Erro: '+error.message);
  }
});
