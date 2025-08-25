const express = require('express');
const auth = require('../middleware/auth');
const Curriculum = require('../models/Curriculum');
const User = require('../models/User');

const router = express.Router();

// Listar currículos do usuário
router.get('/', auth, async (req, res) => {
  try {
    const curriculums = await Curriculum.find({ user: req.user.id }).sort({ dataCriacao: -1 });
    res.json(curriculums);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Salvar currículo
router.post('/', auth, async (req, res) => {
  const { modelo, dados } = req.body;

  try {
    const newCurriculum = new Curriculum({
      user: req.user.id,
      modelo,
      dados
    });

    const curriculum = await newCurriculum.save();
    res.json(curriculum);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Atualizar currículo
router.put('/:id', auth, async (req, res) => {
  const { modelo, dados } = req.body;

  try {
    let curriculum = await Curriculum.findById(req.params.id);
    if (!curriculum) {
      return res.status(404).json({ msg: 'Currículo não encontrado' });
    }

    // Verificar se o currículo pertence ao usuário
    if (curriculum.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Não autorizado' });
    }

    curriculum = await Curriculum.findByIdAndUpdate(
      req.params.id,
      { modelo, dados, dataModificacao: Date.now() },
      { new: true }
    );

    res.json(curriculum);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Download de currículo (verificar limites)
router.post('/download/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user.downloadsRestantes <= 0) {
      return res.status(403).json({ 
        msg: 'Você atingiu o limite de downloads gratuitos. Faça um upgrade para continuar.' 
      });
    }

    // Decrementar downloads restantes
    user.downloadsRestantes -= 1;
    await user.save();

    const curriculum = await Curriculum.findById(req.params.id);
    if (!curriculum) {
      return res.status(404).json({ msg: 'Currículo não encontrado' });
    }

    // Verificar se o currículo pertence ao usuário
    if (curriculum.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Não autorizado' });
    }

    res.json({ 
      success: true, 
      curriculum,
      downloadsRestantes: user.downloadsRestantes 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;