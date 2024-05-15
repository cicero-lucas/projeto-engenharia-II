require("dotenv").config()
const express = require("express");
const Rota = require("./Routers/router");
const conexaoDb=require('./Database/connexao');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],

}));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(Rota);

conexaoDb();

app.listen(process.env.PORT,()=>{
    console.log("server porta",process.env.PORT)
});


