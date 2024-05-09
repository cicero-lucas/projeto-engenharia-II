const Post = require("../../Models/Post");
const tipopost = require("../../Models/tipopost");

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

const favoritar= async(req, res)=>{
    const {idPost}= req.params;

    if(!idPost){
        return res.status(422).json({mensagem:"poss Obrigatorio"})
    }
}

module.exports={
    verCategorias,
    verTodosPost,
    buscarPost
}

