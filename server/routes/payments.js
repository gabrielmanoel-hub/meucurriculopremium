const express = require('express');
const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');
const auth = require('../middleware/auth');
const Purchase = require('../models/Purchase');
const User = require('../models/User');

const router = express.Router();

// Configurar Mercado Pago
let client;
try {
  client = new MercadoPagoConfig({ 
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN 
  });
  console.log('MercadoPago configurado com sucesso');
} catch (error) {
  console.error('Erro ao configurar MercadoPago:', error);
}

// Criar preferência de pagamento
router.post('/create-preference', auth, async (req, res) => {
  if (!client) {
    return res.status(500).send('MercadoPago não configurado');
  }

  const { modelo, valor } = req.body;

  try {
    // Cria um item na preferência
    let preference = {
      items: [
        {
          title: `Modelo de Currículo ${modelo}`,
          unit_price: valor,
          quantity: 1,
          description: `Acesso ilimitado ao modelo ${modelo}`
        }
      ],
      back_urls: {
        success: `${process.env.FRONTEND_URL}/pagamento-sucesso`,
        failure: `${process.env.FRONTEND_URL}/pagamento-falha`,
        pending: `${process.env.FRONTEND_URL}/pagamento-pendente`
      },
      auto_return: 'approved',
    };

    // Cria a preferência
    const preferenceClient = new Preference(client);
    const response = await preferenceClient.create({ body: preference });
    const preferenceId = response.id;

    // Salvar a compra no banco de dados com status 'pending'
    const newPurchase = new Purchase({
      user: req.user.id,
      modelo,
      valor,
      status: 'pending',
      mercadoPagoPreferenceId: preferenceId
    });

    await newPurchase.save();

    res.json({ 
      id: preferenceId, 
      init_point: response.init_point 
    });
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    res.status(500).send('Erro ao criar preferência de pagamento');
  }
});

// Webhook para receber notificações de pagamento
router.post('/webhook', async (req, res) => {
  if (!client) {
    return res.status(500).send('MercadoPago não configurado');
  }

  const { type, data } = req.body;

  if (type === 'payment') {
    const paymentId = data.id;

    try {
      // Buscar informações do pagamento no Mercado Pago
      const paymentClient = new Payment(client);
      const paymentInfo = await paymentClient.get({ id: paymentId });
      const paymentStatus = paymentInfo.status;
      const preferenceId = paymentInfo.preference_id;

      // Atualizar a compra no banco de dados
      const purchase = await Purchase.findOne({ mercadoPagoPreferenceId: preferenceId });
      if (purchase) {
        purchase.status = paymentStatus;
        await purchase.save();

        // Se o pagamento foi aprovado, liberar downloads ilimitados
        if (paymentStatus === 'approved') {
          await User.findByIdAndUpdate(purchase.user, { downloadsRestantes: 999 });
        }
      }
    } catch (error) {
      console.error('Erro no webhook:', error);
    }
  }

  res.sendStatus(200);
});

// Verificar status de pagamento
router.get('/check-payment/:preferenceId', auth, async (req, res) => {
  try {
    const purchase = await Purchase.findOne({ 
      mercadoPagoPreferenceId: req.params.preferenceId,
      user: req.user.id
    });

    if (!purchase) {
      return res.status(404).json({ msg: 'Compra não encontrada' });
    }

    res.json({ status: purchase.status });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao verificar pagamento');
  }
});

module.exports = router;