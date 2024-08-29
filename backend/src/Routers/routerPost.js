const express = require("express");
const adminControle = require("../Controllers/adminControllers/adminController");
const siteControle = require("../Controllers/siteControllers/siteController")
const middleware = require("../Middlewares/middlewares");
const { uploadImg } = require('../Helpers/uploadsAquivo');

const Rota= express.Router();

Rota.post('/cadastra/user', adminControle.cadastraUsuario);

Rota.post('/login/user',adminControle.paginaLogin);


Rota.post('/buscar/posts',siteControle.buscarPost);



Rota.post('/post/comentarios/criar',middleware.verificarLogin,adminControle.criarComentario);


Rota.post('/favoritar/post',middleware.verificarLogin,adminControle.favoritarPosts);


Rota.post('/admin/post',middleware.verificarLogin,uploadImg.single('image'),adminControle.criarPost);


module.exports=Rota