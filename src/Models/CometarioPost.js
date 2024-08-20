const mongoose = require("mongoose");

const comentariosSchema = new mongoose.Schema({
    comentario: String,
    dataCadastro: { type: Date, default: Date.now },
    numeroLike: { type: Number, default: 0 },
    numeroDeslike: { type: Number, default: 0 }, 
    fk_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    fk_post:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
});

const Comentarios = mongoose.model('comentarios_posts', comentariosSchema);

module.exports = Comentarios;
