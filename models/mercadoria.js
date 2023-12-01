const mongoose = require('./database');

const Mercadoria = new mongoose.Schema({
    id_usuario: {
        type: String,
        required: true
    },
    id_produto: {
        type: String,
        required: true
    },
    quantidade: Number
});

const tabMercadoria = mongoose.model('mercadoria', Mercadoria);

module.exports = tabMercadoria;