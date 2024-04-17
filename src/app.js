require("dotenv").config();
const express = require("express");
const Rota = require("./Routers/router");
const  mongoose  = require("mongoose");
const dbUser= process.env.DB_USER;
const dbPassoword= process.env.DB_PASSOWORD;
const app = express();

app.use(express.json())
app.use(Rota);

const uri = `mongodb+srv://${dbUser}:${dbPassoword}@cluster0.ucnxqct.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


mongoose.connect(uri)

.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("server porta",process.env.PORT)
    })
})

.catch((err)=>console.log(err))
