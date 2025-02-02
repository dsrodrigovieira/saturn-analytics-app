import { LOGIN_DEMO_URL } from './data.js';

const btn_enter = document.getElementById('btn-enter');
const toast = document.getElementById("toast-wrapper");

btn_enter.addEventListener('click', async (e) => { 
  e.preventDefault();
  btn_enter.innerHTML = `
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  <span class="visually-hidden">Carregando...</span>
  `
  try {
    const response = await fetch(LOGIN_DEMO_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });
    console.log(response);
    if (!response.ok) {
      btn_enter.innerHTML = `Entrar`
      toast.innerHTML = `
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            <strong class="me-auto">Falha no login</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body bg-warning">
            Houve uma falha no login. Por favor, tente novamente.${response.message}
          </div>
        </div>
      `;
      throw new Error(`Falha no login. ${response.message}`);
    }
    const data = await response.json();
    sessionStorage.setItem('cnesEmpresa', data.cnes);    
    sessionStorage.setItem('message', data.message);
    window.location.href = 'home.html';      
  } catch (error) {
    btn_enter.innerHTML = `Entrar`
    toast.innerHTML = content_toast;
  }
});