require("dotenv").config()
const express = require("express");
const RotaDelete = require("./Routers/routerDelete");
const RotaGeT = require("./Routers/routerGet");
const RotaPost = require("./Routers/routerPost");
const RotaPut = require("./Routers/routerPut");
const conexaoDb=require('./Database/connexao');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const path = require("path");
const session = require('express-session');
const flash = require('connect-flash');


const app = express();

const secret=process.env.SECRET2

app.use(session({
    secret:secret,
    resave: false,
    saveUninitialized: true,
  }));

  app.use(flash());

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(RotaGeT);
app.use(RotaPost);
app.use(RotaDelete);
app.use(RotaPut);

try{
    conexaoDb();
}catch{
    console.log("Erro na conexão com banco!")
}

app.listen(process.env.PORT,()=>{
    console.log("server porta",process.env.PORT)
});


