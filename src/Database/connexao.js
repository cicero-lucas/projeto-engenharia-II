require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const dbUser= process.env.DB_USER;
const dbPassoword= process.env.DB_PASSOWORD;

const uri = `mongodb+srv://${dbUser}:${dbPassoword}@cluster0.ucnxqct.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true, 
  }
});

async function conexaoDb() {
  try {
    
    await client.connect();
   
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}

module.exports=conexaoDb