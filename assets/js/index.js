import { LOGIN_DEMO_URL } from './data.js';

document.getElementById('btn-enter').addEventListener('click', async (e) => { 
  e.preventDefault();
  try {
    const response = await fetch(LOGIN_DEMO_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error(`Falha no login. ${response.message}`);
    }
    const data = await response.json();
    sessionStorage.setItem('organizationCnes', data.cnes);    
    sessionStorage.setItem('message', data.message);
    window.location.href = 'home.html';      
  } catch (error) {
    alert('Erro: '+error.message);
  }
});