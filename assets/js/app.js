require('dotenv').config();
const API_URL = process.env.API_BASE_URL;

async function checkAuth() {
  try {
    const response = await fetch(`${API_URL}/auth/validate`, { credentials: 'include' });
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

document.getElementById('form-btn').addEventListener('click', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  try {
    const response = await fetch(`${API_URL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // Inclui cookies na requisição
    });
    if (!response.ok) {
      throw new Error(`Falha no login. ${response.message}`);
    }
    const data = await response.json();
    sessionStorage.setItem('organizationCnes', data.cnes);    
    alert(data.message);
    // Redireciona para a página home após login bem-sucedido
    window.location.href = 'home.html';      
  } catch (error) {
    alert('Erro: '+error.message);
  }
});

document.getElementById('btn-register').addEventListener('click', async (e) => {
  alert("Em desenvolvimento!");
  // e.preventDefault();
  // const name = document.getElementById('new-name').value;
  // const lastname = document.getElementById('new-lastname').value;
  // const username = document.getElementById('new-username').value;
  // const email = document.getElementById('new-email').value;
  // const password = document.getElementById('new-password').value;
  // const password_check = document.getElementById('new-password2').value;
  // // CRIANDO LOGICA PARA GERAR USERNAME E INSERT DE NOVO USUARIO
  // if (password != password_check) {
  //   alert("Senha não confere");
  // } else {
  //   try {
  //     const response = await fetch(`${API_URL}/register`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ fullname, username, email, password }),
  //       credentials: 'include', // Inclui cookies na requisição
  //     });  
  //     if (!response.ok) {
  //       throw new Error(`Falha no cadastro. ${response.message}`);
  //     }  
  //     const data = await response.json();      
  //     alert(data.message);  
  //     // Redireciona para a página home após login bem-sucedido
  //     window.location.href = 'index.html'; 
  //   } catch (error) {
  //     alert('Erro: '+error.message);
  //   }
  // }
});
