const Post = require("../../Models/Post");
const tipopost = require("../../Models/tipopost");
const Comentarios = require('../../Models/CometarioPost'); 
const mongoose = require("mongoose");

const verTodosPost = async (req, res) => {
    try {

        const posts = await Post.find().populate([
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

const verPostId= async(req,res)=>{
    try {
        const {id} = req.params;
        
        const verPost = await Post.findById(id).populate([
            {path:'fk_user', select:'perfil'},
            { path:"fk_tipo",select:"tipoPost"}
        ]);

        if(!verPost || verPost.length ===0){
            return res.status(404).json({message:"Nenhum Post encontrado"});
        }

        return res.status(200).json(verPost);
       
    } catch (error) {
        console.error(error);
       
        return res.status(500).json({ error: "Erro ver posts" });
    }
}


const verCategorias = async (req, res)=>{
    try {
        const categoria = await tipopost.find()
        return res.status(200).json(categoria);
    } catch (error) {

    }

}

const buscarPost = async (req,res) =>{
    const {nome}= req.body;
    try{
        
        const posts = await Post.find({tituloPost:{ $regex: `.*${nome}.*`, $options: 'i' }}).populate([
            {path:'fk_user', select:'perfil'},
            { path:"fk_tipo",select:"tipoPost"}
        ]);

        if (!posts || posts.length === 0) {
            return res.status(404).json({ msg: "Nenhum post encontrado",opc:0 });
        }
        
        return res.status(200).json(posts);

    }catch{

    }
}

const categoriaProgramacao = async (req, res) => {
    try {

        const posts = await Post.find().populate([
            {path:'fk_user', select:'perfil'},
            { path:"fk_tipo",select:"tipoPost",match:{ tipoPost:'Programação' } }
        ]);
        const filteredPosts = posts.filter(post => post.fk_tipo !== null);

        if (!filteredPosts|| filteredPosts.length === 0) {
            return res.status(404).json({ message: "Nenhum post encontrado" });
        }
        
        return res.status(200).json(filteredPosts);

    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

const categoriaAtualidade = async (req, res) => {
    try {

        const posts = await Post.find().populate([
            {path:'fk_user', select:'perfil'},
            { path:"fk_tipo",select:"tipoPost",match:{ tipoPost:'Atualidade' } }
        ]);
        const filteredPosts = posts.filter(post => post.fk_tipo !== null);

        if (!filteredPosts|| filteredPosts.length === 0) {
            return res.status(404).json({ message: "Nenhum post encontrado" });
        }
        
        return res.status(200).json(filteredPosts);

    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

const categoriaSoftware = async (req, res) => {
    try {

        const posts = await Post.find().populate([
            {path:'fk_user', select:'perfil'},
            { path:"fk_tipo",select:"tipoPost",match:{ tipoPost:'Atualidade' } }
        ]);
        const filteredPosts = posts.filter(post => post.fk_tipo !== null);

        if (!filteredPosts|| filteredPosts.length === 0) {
            return res.status(404).json({ message: "Nenhum post encontrado" });
        }
        
        return res.status(200).json(filteredPosts);

    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

const categoriaHadware = async (req, res) => {
    try {

        const posts = await Post.find().populate([
            {path:'fk_user', select:'perfil'},
            { path:"fk_tipo",select:"tipoPost",match:{ tipoPost:'Atualidade' } }
        ]);
        const filteredPosts = posts.filter(post => post.fk_tipo !== null);

        if (!filteredPosts|| filteredPosts.length === 0) {
            return res.status(404).json({ message: "Nenhum post encontrado" });
        }
        
        return res.status(200).json(filteredPosts);

    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

const categoriaIa = async (req, res) => {
    try {

        const posts = await Post.find().populate([
            {path:'fk_user', select:'perfil'},
            { path:"fk_tipo",select:"tipoPost",match:{ tipoPost:'IA' } }
        ]);
        const filteredPosts = posts.filter(post => post.fk_tipo !== null);

        if (!filteredPosts|| filteredPosts.length === 0) {
            return res.status(404).json({ message: "Nenhum post encontrado" });
        }
        
        return res.status(200).json(filteredPosts);

    } catch (error) {
        return res.status(500).json({ error: error });
    }
}
const darLike = async(req, res) => {
    const { postId } = req.body;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        post.numeroLike += 1;
        await post.save();
        return res.status(200).json({ msg: 'like' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const desLike = async(req, res) => {
    const { postId } = req.body;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        post.numeroDeslike += 1;
        await post.save();
        return res.status(200).json({ msg: 'dislike' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const verTodosComentarios = async (req, res) => {
    try {
        const {postId} = req.params;
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(404).json({ message: "ID de post inválido" });
        }
        const comentarios = await Comentarios.find({ fk_post: postId }).populate('fk_user','perfil');

        if (!comentarios || comentarios.length === 0) {
            return res.status(404).json({ message: "Nenhum comentário encontrado para este post" });
        }

        res.status(200).json(comentarios);
    } catch (error) {
       
    }
};


module.exports={
    verCategorias,
    verTodosPost,
    buscarPost,
    verTodosComentarios,
    categoriaProgramacao,
    categoriaAtualidade,
    categoriaHadware,
    categoriaSoftware,
    categoriaIa,
    verPostId,
    darLike,
    desLike
}

