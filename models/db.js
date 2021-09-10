const mongoose = require('mongoose')
const estudantes = new mongoose.Schema({
    Nome: { type: String },
    email: { type: String },
    aprovado: { type: Boolean },
    createdOn: { type: Date, default: Date.now }
})

module.exports = mongoose.model('busca', estudantes)