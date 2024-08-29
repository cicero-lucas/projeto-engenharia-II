const express = require("express");
const adminControle = require("../Controllers/adminControllers/adminController");
const siteControle = require("../Controllers/siteControllers/siteController")
const middleware = require("../Middlewares/middlewares");
const { uploadImg } = require('../Helpers/uploadsAquivo');

const Rota= express.Router();


Rota.put('/post/comentarios/editar/:comentarioId',middleware.verificarLogin,adminControle.editarComentario);


Rota.put('/post/like', siteControle.darLike);

Rota.put('/post/deslike', siteControle.desLike);

Rota.put('/editar/perfil',middleware.verificarLogin,adminControle.editarPerfil);



Rota.put('/admin/post/editar/:id',middleware.verificarLogin,uploadImg.single('image'),adminControle.editarPost);

module.exports=Rota