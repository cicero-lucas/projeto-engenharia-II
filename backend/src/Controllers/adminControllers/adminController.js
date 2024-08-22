require('dotenv').config()
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const verCookie = require("../../Helpers/Helpers")
const mongoose = require("mongoose");
const User = require('../../Models/User');
const tipopost = require('../../Models/tipopost');
const FavoritarPost = require('../../Models/FavoritarPost');
const Post = require('../../Models/Post');
const Cometarios = require("../../Models/CometarioPost")
const apagarImg = require('../../Helpers/uploadsAquivo');



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
            return res.status(422).json({msg:'confirme a senha corretamete!', opc:2});
        }
        const userExiste = await User.findOne({email:email})

        if(userExiste){
            return res.status(422).json({msg:'usuario já cadastrado', opc:3});
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
            return res.status(200).json({msg:"Usuario casastrado com sucesso", opc:1})
        }catch{
            return res.status(500).json({ msg:"erro ao cadastra-se na plataforma", opc:2})
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
            return res.status(404).json({msg:'usuario não cadastrado faça o cadastro',opc:3});
        }

        const checksenha = await bcrypt.compare(senha,user.senha)

        if(!checksenha){
            return res.status(422).json({msg:" senha invalida !", opc:2});
        }

        try {
            const secret = process.env.SECRET
            const token = jwt.sign({
                iduser:user._id
            },secret,)
            res.status(200).json(
                {token, opc:1,msg:"bem vindo"}
            );

        } catch {
            console.log('erro no login')
        }
        
    } catch {
        console.log("erro ao fazer login")
    }
}

const buscarPerfil = async (req,res) =>{
    try{
        const id = req.userId;
        if(id){
         const user = await User.findOne({_id:id}).select('-senha');
         if(user){
            return res.json(user);
         }
        
        }
    }catch{

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

const criarPost = async (req, res) => {
    try {
        const { titulo, texto, tipo } = req.body;

        // Verificação de campos obrigatórios
        if (!titulo) {
            return res.status(422).json({ mensagem: "O campo título é obrigatório!" });
        } else if (!texto) {
            return res.status(422).json({ mensagem: "O campo texto é obrigatório!" });
        } else if (!tipo) {
            return res.status(422).json({ mensagem: "O campo tipo é obrigatório!" });
        }

        // Verifica se existe uma imagem enviada
        let caminhoImg;
        if (req.file && req.file.path) {
            caminhoImg = req.file.path;
        } else {
            // Importa a imagem padrão
            caminhoImg = "src\\public/sever/apresentacao.png"; // Caminho da imagem padrão
        }

        // Ajuste do caminho da imagem
        let img = caminhoImg.split('src\\');
       

        const post = new Post({
            "tituloPost": titulo,
            "caminhoImg": img[1], // Salva o caminho relativo da imagem
            "textoPost": texto,
            "fk_tipo": tipo,
            "fk_user": req.userId
        });

        try {
            await post.save();
            return res.status(200).json("Post cadastrado com sucesso");
        } catch (erro) {
            return res.status(500).json("Erro ao cadastrar o post na plataforma");
        }
    } catch (erro) {
        return res.status(500).json("Erro ao processar a requisição");
    }
};


const buscaMpost = async (req, res) => {
    try {
       const id= req.userId
        const posts = await Post.find({ fk_user: id}).populate([
            {path:'fk_user', select:'perfil'},
            { path:"fk_tipo",select:"tipoPost"}
        ]);

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "Nenhum post encontrado" });
        }
        
        return res.status(200).json(posts);

    } catch (error) {
     
        console.error(error);
       
        return res.status(500).json({ error: "Erro ao buscar posts" });
    }
}

const buscarPostid = async (req, res) => {
    try {
       const {id} = req.params;
        const posts = await Post.findById(id).populate([
            {path:'fk_user', select:'perfil'},
            { path:"fk_tipo",select:"tipoPost"}
        ]);

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "Nenhum post encontrado" });
        }
        
        return res.status(200).json(posts);

    } catch (error) {
     
        console.error(error);
       
        return res.status(500).json({ error: "Erro ao buscar posts" });
    }
}

const editarPost = async (req,res)=>{
    try{
        const {id}=req.params;
        const{titulo,texto,tipo,image}=req.body;
        let caminhoImg='';
        if(!titulo){
            return res.status(422).json({mensagem:"O campos titulo é obrigatorio!"});
        }else if(!texto){
            return res.status(422).json({mensagem:"o campos texto é obrigatorio!"});
        }else if(!tipo){
            return res.status(422).json({mensagem:"o campos tipo é obrigatorio!"});
        }else if(req.file){
            const caminhoImgs=(req.file.path)
            const imgs=caminhoImgs.split('src\\')
            caminhoImg=imgs[1];
            const post = await Post.findById(id);
            if (post){
            const caminhoDaImagem = post.caminhoImg;
            apagarImg.apagarImagem(caminhoDaImagem);
            }
        }else{
            caminhoImg=image;
        }

        const postDados={
            "tituloPost": titulo,
            "caminhoImg":caminhoImg,
            "textoPost":texto,
            "fk_tipo":tipo,
            "fk_user":req.userId
        }

        try{
            const post = await Post.findByIdAndUpdate(id, postDados, { new: true });

            if(post){
                return res.status(200).json("Post editado com sucesso")
            }
           
        }catch(erro){
            return res.status(500).json("erro ao cadastra o post na plataforma");
        } 
    }catch{ 

    }
}

const ApagarPost = async (req,res)=>{
    try{
        const {id}=req.params;
        const post = await Post.findById(id);
        if (post){
            const caminhoDaImagem = post.caminhoImg;
            apagarImg.apagarImagem(caminhoDaImagem);
        }
        try{
            const result = await Post.deleteOne({ _id: id })
        
            if(result){
                return res.status(200).json("Post apagado com sucesso")
            }
            
        }catch(erro){
            return res.status(500).json("erro ao apagar o post na plataforma");
        } 
    }catch{ 

    }
}


const favoritarPosts = async(req,res)=>{
    try{
        const userId= req.userId
        const {postId}=req.body;

        const novoFavorito = new FavoritarPost({
            fk_user:userId,
            fk_post: postId,
        });
        await novoFavorito.save();
        return res.status(200).json({msg:"post Favoritado com sucesso!"})
    }catch{
        return res.status(500).json({ message: "Erro ao favoritar post." });
    }
}

const verPostfavoritos = async(req,res)=>{
    try{
        const {userId}=req.body;
        const postFavorito = await FavoritarPost.find({fk_user:userId}).populate('fk_post');

        if (!postFavorito || postFavorito.length === 0) {
            return res.status(404).json({ message: "Nenhum post favoritado" });
        }
        return res.status(200).json(postFavorito);
        res.status(200).json({msg:"post Favoritado com sucesso!"})
    }catch{
        res.status(500).json({ message: "Erro ao favoritar post." });
    }
}


const criarComentario = async (req, res) => 
    {
    try {
        const userId= req.userId
        const { comentario, fk_post } = req.body;
        const novoComentario = new Cometarios({
            comentario,
            fk_user:userId,
            fk_post
        });

        const comentarioSalvo = await novoComentario.save();

        res.status(201).json(comentarioSalvo);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar comentário", error: error.message });
    }
};

const editarComentario = async (req, res) => {
    try {
        const { comentarioId } = req.params;
        const { comentario } = req.body;
        const usuarioLogadoId = req.userId; // ID do usuário logado extraído do token

        // Verifica se o ID do comentário é válido
        if (!mongoose.Types.ObjectId.isValid(comentarioId)) {
            return res.status(404).json({ message: "ID de comentário inválido" });
        }

        // Busca o comentário pelo ID
        const comentarioExistente = await Cometarios.findById(comentarioId);

        // Verifica se o comentário existe
        if (!comentarioExistente) {
            return res.status(404).json({ message: "Comentário não encontrado" });
        }

        // Verifica se o usuário logado é o autor do comentário
        if (comentarioExistente.fk_user.toString() !== usuarioLogadoId.toString()) {
            return res.status(403).json({ message: "Você não tem permissão para editar este comentário" });
        }

        // Atualiza o comentário
        const comentarioAtualizado = await Cometarios.findByIdAndUpdate(comentarioId, { comentario }, { new: true });

        // Retorna o comentário atualizado
        res.status(200).json(comentarioAtualizado);
    } catch (error) {
        res.status(500).json({ message: "Erro ao editar comentário", error: error.message });
    }
};


const deletarComentario = async (req, res) => {
    try {
        const { comentarioId } = req.params;
        const usuarioLogadoId = req.userId; // ID do usuário logado extraído do token

        // Verifica se o ID do comentário é válido
        if (!mongoose.Types.ObjectId.isValid(comentarioId)) {
            return res.status(404).json({ message: "ID de comentário inválido" });
        }

        // Busca o comentário pelo ID
        const comentarioExistente = await Cometarios.findById(comentarioId);

        // Verifica se o comentário existe
        if (!comentarioExistente) {
            return res.status(404).json({ message: "Comentário não encontrado" });
        }

        // Verifica se o usuário logado é o autor do comentário
        if (comentarioExistente.fk_user.toString() !== usuarioLogadoId.toString()) {
            return res.status(403).json({ message: "Você não tem permissão para deletar este comentário" });
        }

        // Deleta o comentário
        await Cometarios.findByIdAndDelete(comentarioId);

        res.status(200).json({ message: "Comentário deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar comentário", error: error.message });
    }
};

 const me = async (req, res) => {
    try {
        const idUser = req.userId 
        const user = await User.findById(idUser).select(['-senha','-email']); 

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json(user);
    } catch (error) {
        console.error('Erro ao obter informações do usuário:', error);
        res.status(500).json({ message: 'Erro interno ao obter informações do usuário' });
    }
}







module.exports={
    cadastraUsuario,
    paginaLogin,
    criarPost,
    buscarPostid,
    verTipo,
    editarPerfil,
    buscaMpost,
    editarPost,
    ApagarPost,
    buscarPerfil,
    favoritarPosts,
    verPostfavoritos,
    criarComentario,
    editarComentario,
    deletarComentario,
    me
}