// Funções para autenticação
async function register(nome, email, senha) {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, email, senha })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', data.token);
      return { success: true };
    } else {
      return { success: false, message: data.msg };
    }
  } catch (error) {
    return { success: false, message: 'Erro de conexão' };
  }
}

async function login(email, senha) {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, senha })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('downloadsRestantes', data.downloadsRestantes);
      return { success: true, downloadsRestantes: data.downloadsRestantes };
    } else {
      return { success: false, message: data.msg };
    }
  } catch (error) {
    return { success: false, message: 'Erro de conexão' };
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('downloadsRestantes');
  window.location.href = '/';
}

function isAuthenticated() {
  return localStorage.getItem('token') !== null;
}

function getToken() {
  return localStorage.getItem('token');
}

async function getUserInfo() {
  try {
    const token = getToken();
    if (!token) return null;
    
    const response = await fetch('/api/auth/user', {
      method: 'GET',
      headers: {
        'x-auth-token': token
      }
    });
    
    if (response.ok) {
      return await response.json();
    } else {
      logout();
      return null;
    }
  } catch (error) {
    console.error('Erro ao obter informações do usuário:', error);
    return null;
  }
}