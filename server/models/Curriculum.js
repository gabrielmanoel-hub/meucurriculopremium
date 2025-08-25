const mongoose = require('mongoose');

const CurriculumSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  modelo: {
    type: String,
    required: true
  },
  dados: {
    type: Object,
    required: true
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  },
  dataModificacao: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Curriculum', CurriculumSchema);