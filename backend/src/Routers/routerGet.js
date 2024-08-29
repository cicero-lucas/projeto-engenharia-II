const express = require("express");
const adminControle = require("../Controllers/adminControllers/adminController");
const siteControle = require("../Controllers/siteControllers/siteController")
const middleware = require("../Middlewares/middlewares");
const { uploadImg } = require('../Helpers/uploadsAquivo');

const Rota= express.Router();



Rota.get('/categoria',siteControle.verCategorias );

Rota.get('/categoria/programacao',siteControle.categoriaProgramacao );
Rota.get('/categoria/atualidade',siteControle.categoriaAtualidade );
Rota.get('/categoria/software',siteControle.categoriaSoftware );
Rota.get('/categoria/hadware',siteControle.categoriaHadware);
Rota.get('/categoria/ia',siteControle.categoriaIa);



Rota.get('/ver/posts',siteControle.verTodosPost);


Rota.get('/post/comentarios/post/:postId',siteControle.verTodosComentarios);

Rota.get('/ver/post/:id',siteControle.verPostId);


Rota.get("/buscar/perfil",middleware.verificarLogin,adminControle.buscarPerfil);




Rota.get('ver/pos/tfavorito',middleware.verificarLogin,adminControle.verPostfavoritos);



Rota.get('/admin/post/buscaid/:id',middleware.verificarLogin,adminControle.buscarPostid);

Rota.get('/admin/meu/post',middleware.verificarLogin,adminControle.buscaMpost);

Rota.get('/admin/tipo',middleware.verificarLogin,adminControle.verTipo);

Rota.get('/me',middleware.verificarLogin,adminControle.me);

Rota.get('/admin/favoritos/',adminControle.verFavoritoId);



module.exports=Rota