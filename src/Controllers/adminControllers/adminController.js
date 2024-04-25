require('dotenv').config()
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const verCookie = require("../../Helpers/Helpers")
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const User = require('../../Models/User');
const tipopost = require('../../Models/tipopost');
const Post = require('../../Models/Post');

const cadastraUsuario = async (req,res)=>{
    try{
        const {nome,perfil="",email,senha,confirmsenha}=req.body;
    
        if(!nome){
            return res.status(422).json({msg:'o nome é obrigatorio!'});
        }else if(!email){
            return res.status(422).json({msg:'o emeil é obrigatorio!'});
        
        }else if(!senha){
            return res.status(422).json({msg:'a senha é obrigatorio!'})
        
        }else if(!confirmsenha){
            return res.status(422).json({msg:'a confirmação de senha é obrigatorio!'})
        
        }else if(senha !== confirmsenha){
            return res.status(422).json({msg:'confirme a senha corretamete!'});
        }
        const userExiste = await User.findOne({email:email})

        if(userExiste){
            return res.status(422).json({msg:'usuario já cadastrado'});
        }

        const salt = await bcrypt.genSalt(12);
        const passorwodHash = await bcrypt.hash (senha,salt)

        // criarUsario

        const user = new User({
            name:nome,
            perfil:(perfil)?perfil:nome,
            email,
            senha:passorwodHash,
        })

        try{
            await user.save();
            return res.status(200).json("Usuario casastrado com sucesso")
        }catch{
            return res.status(500).json("erro ao cadastra-se na plataforma")
        }
    }catch{
        console.log("erro ao cadastra usuario");
    }

   
}

// login

const paginaLogin = async (req,res)=>{
    try {
        const {email,senha}=req.body;

        if(!email){
            return res.status(422).json({msg:"email é obrigatorio !"});
        }else if(!senha){
            return res.status(422).json({msg:" senha é obrigatorio !"});
        }

        const user = await User.findOne({email:email})
        if(!user){
            return res.status(404).json({msg:'usuario não cadastrado faça o cadastro'});
        }

        const checksenha = await bcrypt.compare(senha,user.senha)

        if(!checksenha){
            return res.status(422).json({msg:" senha invalida !"});
        }

        try {
            const secret = process.env.SECRET
            const token = jwt.sign({
                iduser:user._id
            },secret,)
            res.status(200).json(
                {token}
            );

        } catch {
            console.log('erro no login')
        }
        
    } catch {
        console.log("erro ao fazer login")
    }
}

const editarPerfil = async (req,res)=>{
    // const {perfil}=req.body;
    // if(!perfil){
    //     return res.json(422).json({"mensagem":"nome perfil obrigatorio !"})
    // }
    
    // const user = await User.
    verCookie.verIdUser()

    

    

}



const verTipo = async (req,res) =>{
    try {
        const tipo = await tipopost.findById("6626aec654ae837857927213");
        return res.json(tipo)
    } catch (error) {
        console.log(error)
    }
}

const paginaPosts = async (req,res)=>{
    try{
    
        const{titulo,texto,caminhoImg,tipo}=req.body;
        if(!titulo){
            return res.status(422).json({mensagem:"O campos titulo é obrigatorio!"});
        }else if(!texto){
            return res.status(422).json({mensagem:"o campos texto é obrigatorio!"});
        }else if(!tipo){
            return res.status(422).json({mensagem:"o campos tipo é obrigatorio!"});
        }
        
        const post = new Post({
            "tituloPost": titulo,
            "caminhoImg":caminhoImg,
            "textoPost":texto,
            "fk_tipo":tipo,
            "fk_user":"66256877dbedb1c6f45be70b"
            
        })
        try{
            await post.save();
            return res.status(200).json("post casastrado com sucesso")
        }catch{
            return res.status(500).json("erro ao cadastra o post na plataforma")
        }


         
    }catch{ 

    }

}



module.exports={
    cadastraUsuario,
    paginaLogin,
    paginaPosts,
    verTipo,

    editarPerfil
}