const express = require("express");
const adminControle = require("../Controllers/adminController/adminController");

const Rota= express.Router();

Rota.get('/',(req,res)=>{ 
    return res.json({mensagem:'index home'})
})

Rota.post('/cadastra/user', adminControle.cadastraUsuario);
Rota.post('/login/user',adminControle.paginaLogin);

Rota.get('/user/:id',adminControle.paginaPosts)

module.exports=Rota