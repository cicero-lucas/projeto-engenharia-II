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

Rota.post('/buscar/posts',siteControle.buscarPost)
Rota.get('/ver/posts',siteControle.verTodosPost);

Rota.put('/editar/perfil',middleware.verificarLogin,adminControle.editarPerfil);

Rota.post('/admin/post',middleware.verificarLogin,uploadImg.single('image'),adminControle.criarPost);

Rota.get('/admin/post/buscaid/:id',middleware.verificarLogin,adminControle.buscarPostid);
Rota.put('/admin/post/editar/:id',middleware.verificarLogin,uploadImg.single('image'),adminControle.editarPost);
Rota.delete('/admin/post/deletar/:id',middleware.verificarLogin,adminControle.ApagarPost);

Rota.get('/admin/meu/post',middleware.verificarLogin,adminControle.buscaMpost)

Rota.get('/admin/tipo',middleware.verificarLogin,adminControle.verTipo);

module.exports=Rota