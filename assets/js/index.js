document.getElementById('btn-enter').addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://saturn-api.vercel.app/auth/demo", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ email, password }),
        // credentials: 'include' // Inclui cookies na requisição
      });
      if (!response.ok) {
        throw new Error(`Falha no login. ${response.message}`);
      }
      const data = await response.json();
      sessionStorage.setItem('organizationCnes', data.cnes);    
      sessionStorage.setItem('message', data.message);    
      alert(data.message);
      // Redireciona para a página home após login bem-sucedido
      window.location.href = 'home2.html';      
    } catch (error) {
      alert('Erro: '+error.message);
    }
  });