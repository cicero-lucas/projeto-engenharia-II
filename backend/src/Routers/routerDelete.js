const express = require("express");
const adminControle = require("../Controllers/adminControllers/adminController");
const siteControle = require("../Controllers/siteControllers/siteController")
const middleware = require("../Middlewares/middlewares");
const { uploadImg } = require('../Helpers/uploadsAquivo');

const Rota= express.Router();


Rota.get('/ver/posts',siteControle.verTodosPost);

Rota.delete('/post/comentarios/deletar/:comentarioId',middleware.verificarLogin,adminControle.deletarComentario);


Rota.delete('/admin/post/deletar/:id',middleware.verificarLogin,adminControle.ApagarPost);


Rota.delete('/admin/favoritos/deletar/:postId',adminControle.deletarFavoritoId);



module.exports=Rota