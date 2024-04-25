const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    tituloPost: String,
    caminhoImg: String,
    textoPost: String,
    dataCadastro: { type: Date, default: Date.now },
    numeroLike: { type: Number, default: 0 },
    numeroDeslike: { type: Number, default: 0 },
    fk_tipo:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'tipopost' 
    },
    fk_user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }
});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;
