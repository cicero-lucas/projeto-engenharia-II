const express = require("express");
const adminControle = require("../Controllers/adminControllers/adminController");
const siteControle = require("../Controllers/siteControllers/siteController")
const middleware = require("../Middlewares/middlewares");

const Rota= express.Router();

Rota.post('/cadastra/user', adminControle.cadastraUsuario);

Rota.post('/login/user',adminControle.paginaLogin);

Rota.get('/categoria',middleware.verificarLogin,siteControle.verCategorias );

Rota.post('/buscar/posts',siteControle.buscarPost)

Rota.get('/ver/posts',siteControle.verTodosPost);

Rota.put('/editar/perfil',middleware.verificarLogin,adminControle.editarPerfil);

Rota.post('/admin/post',middleware.verificarLogin,adminControle.paginaPosts);

Rota.get('/admin/tipo',middleware.verificarLogin,adminControle.verTipo);

module.exports=Rota