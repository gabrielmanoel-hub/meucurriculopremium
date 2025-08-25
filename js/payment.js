// Funções para pagamento com Mercado Pago
async function createPaymentPreference(modelo, valor) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar logado para comprar modelos premium');
      return null;
    }
    
    const response = await fetch('/api/payments/create-preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify({ modelo, valor })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return data;
    } else {
      console.error('Erro ao criar preferência de pagamento:', data);
      return null;
    }
  } catch (error) {
    console.error('Erro:', error);
    return null;
  }
}

async function checkPaymentStatus(preferenceId) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/payments/check-payment/${preferenceId}`, {
      method: 'GET',
      headers: {
        'x-auth-token': token
      }
    });
    
    if (response.ok) {
      return await response.json();
    } else {
      return { status: 'unknown' };
    }
  } catch (error) {
    console.error('Erro ao verificar status do pagamento:', error);
    return { status: 'unknown' };
  }
}

// Iniciar pagamento
async function iniciarPagamento(modelo, valor) {
  const paymentData = await createPaymentPreference(modelo, valor);
  
  if (paymentData && paymentData.init_point) {
    // Redirecionar para o checkout do Mercado Pago
    window.location.href = paymentData.init_point;
  } else {
    alert('Erro ao processar pagamento. Tente novamente.');
  }
}