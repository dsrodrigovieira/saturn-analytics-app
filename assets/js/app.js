async function checkAuth() {
  try {
    const response = await fetch("https://saturn-api.vercel.app/auth/validate", { credentials: 'include' });
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
    const response = await fetch("https://saturn-api.vercel.app/auth/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include' // Inclui cookies na requisição
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
});
