const  mongoose  = require("mongoose");

const dbUser= process.env.DB_USER;
const dbPassoword= process.env.DB_PASSOWORD;

const uri = `mongodb+srv://${dbUser}:${dbPassoword}@cluster0.ucnxqct.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const conexaoDb = ()=>{
  mongoose.connect(uri)
  
  .then(()=>{
    console.log("banco conectado")
  })

  .catch((err)=> console.log("erro! na conexão do banco de dados"))
}

module.exports=conexaoDb