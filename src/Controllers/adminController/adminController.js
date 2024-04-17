require('dotenv').config()
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const conexaoDb = require("../../Database/connexao");
const User = require('../../Models/User');

const cadastraUsuario = async (req,res)=>{
    try{
        const {nome,email,senha,confirmsenha}=req.body;
    
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
            nome,
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

const paginaLogin = async (req,res)=>{
    try {
        const {email,senha}=req.body;

        if(!email){
            return res.status(422).json({mensagem:"email é obrigatorio !"});
        }else if(!senha){
            return res.status(422).json({mensagem:" senha é obrigatorio !"});
        }

        const user = await User.findOne({email:email})
        if(!user){
            return res.status(404).json({msg:'usuario não cadastrado faça o cadastro'});
        }

        const checksenha = await bcrypt.compare(senha,user.senha)

        if(!checksenha){
            return res.status(422).json({mensagem:" senha invalida !"});
        }

        try {
            const secret = process.env.SECRET
            const token = jwt.sign({
                iduser:user._id
            },secret,)

            res.status(200).json(
                {"mensagem":"Login feito com sucesso",
                token:token
                }
            );

        } catch {
            console.log('erro no login')
        }
        
    } catch {
        console.log("erro ao fazer login")
    }
}

const paginaPosts = async (req,res)=>{
    try{
        const iduser = req.params.id;

        const user = await User.findById(iduser, '-senha')

        if(!user){
            res.json({mensagem:"usuario sem login"})
        }

        res.status(200).json(
            {"mensagem":"Login feito com sucesso",
            
            }
        ); 
    }catch{ 

    }

}



module.exports={
    cadastraUsuario,
    paginaLogin,
    paginaPosts
}