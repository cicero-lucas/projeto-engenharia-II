const express = require("express");
const adminControle = require("../Controllers/adminControllers/adminController");
const siteControle = require("../Controllers/siteControllers/siteController")
const middleware = require("../Middlewares/middlewares");
const { uploadImg } = require('../Helpers/uploadsAquivo');

const Rota= express.Router();

Rota.post('/cadastra/user', adminControle.cadastraUsuario);

Rota.post('/login/user',adminControle.paginaLogin);

Rota.get('/categoria',siteControle.verCategorias );

Rota.get('/categoria/programacao',siteControle.categoriaProgramacao );
Rota.get('/categoria/atualidade',siteControle.categoriaAtualidade );
Rota.get('/categoria/software',siteControle.categoriaSoftware );
Rota.get('/categoria/hadware',siteControle.categoriaHadware);
Rota.get('/categoria/ia',siteControle.categoriaIa);

Rota.post('/buscar/posts',siteControle.buscarPost);

Rota.get('/ver/posts',siteControle.verTodosPost);

Rota.post('/post/comentarios/criar',middleware.verificarLogin,adminControle.criarComentario);
Rota.put('/post/comentarios/editar/:comentarioId',middleware.verificarLogin,adminControle.editarComentario);
Rota.delete('/post/comentarios/deletar/:comentarioId',middleware.verificarLogin,adminControle.deletarComentario);
Rota.get('/post/comentarios/post/:postId',siteControle.verTodosComentarios);

Rota.get('/ver/post/:id',siteControle.verPostId);

Rota.put('/post/like', siteControle.darLike);

Rota.put('/post/deslike', siteControle.desLike);

Rota.get("/buscar/perfil",middleware.verificarLogin,adminControle.buscarPerfil)
Rota.put('/editar/perfil',middleware.verificarLogin,adminControle.editarPerfil);


Rota.post('/favoritar/post',middleware.verificarLogin,adminControle.favoritarPosts);
Rota.get('ver/post/favorito',middleware.verificarLogin,adminControle.verPostfavoritos);

Rota.post('/admin/post',middleware.verificarLogin,uploadImg.single('image'),adminControle.criarPost);

Rota.get('/admin/post/buscaid/:id',middleware.verificarLogin,adminControle.buscarPostid);
Rota.put('/admin/post/editar/:id',middleware.verificarLogin,uploadImg.single('image'),adminControle.editarPost);
Rota.delete('/admin/post/deletar/:id',middleware.verificarLogin,adminControle.ApagarPost);

Rota.get('/admin/meu/post',middleware.verificarLogin,adminControle.buscaMpost)

Rota.get('/admin/tipo',middleware.verificarLogin,adminControle.verTipo);

Rota.get('/me',middleware.verificarLogin,adminControle.me)

module.exports=Rota