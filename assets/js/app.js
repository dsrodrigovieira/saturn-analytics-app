const API_URL = 'http://localhost:3000';

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
    console.log(data.message);
  } catch (error) {
    alert('Acesso negado! Por favor, faça login.');
    window.location.href = 'index.html';
  }
}

// Verifica a autenticação ao carregar a página home
if (window.location.pathname.includes('home.html')) {
  checkAuth();
}

document.getElementById('btn-login').addEventListener('click', async (e) => {
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
    
    alert(data.message);

    // Redireciona para a página home após login bem-sucedido
    window.location.href = 'home.html';    
    console.log('Token:', data.token);
  } catch (error) {
    alert('Erro: '+error.message);
  }
});

document.getElementById('btn-register').addEventListener('click', async (e) => {
  e.preventDefault();

  const name = document.getElementById('new-name').value;
  const lastname = document.getElementById('new-lastname').value;
  const username = document.getElementById('new-username').value;
  const email = document.getElementById('new-email').value;
  const password = document.getElementById('new-password').value;
  const password_check = document.getElementById('new-password2').value;

  // CRIANDO LOGICA PARA GERAR USERNAME E INSERT DE NOVO USUARIO

  if (password != password_check) {
    alert("Senha não confere");
  } else {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, username, email, password }),
        credentials: 'include', // Inclui cookies na requisição
      });
  
      if (!response.ok) {
        throw new Error(`Falha no cadastro. ${response.message}`);
      }
  
      const data = await response.json();
      
      alert(data.message);
  
      // Redireciona para a página home após login bem-sucedido
      window.location.href = 'index.html';    
      //console.log('Token:', data.token);
    } catch (error) {
      alert('Erro: '+error.message);
    }

  }


});
