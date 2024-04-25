const express = require("express");
const adminControle = require("../Controllers/adminControllers/adminController");
const siteControle = require("../Controllers/siteControllers/siteController")

const Rota= express.Router();

Rota.get('/categoria',siteControle.verCategorias);
Rota.get('/ver/posts',siteControle.verTodosPost);

Rota.put('/editar/perfil',adminControle.editarPerfil)

Rota.post('/cadastra/user', adminControle.cadastraUsuario);
Rota.post('/login/user',adminControle.paginaLogin);

Rota.post('/admin/post',adminControle.paginaPosts);
Rota.get('/admin/tipo',adminControle.verTipo);

module.exports=Rota