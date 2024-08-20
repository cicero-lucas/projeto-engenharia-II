import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import verificarToken from '../../middleware/middleware';
import Header from '../../components/Header/Header/header';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../../components/Footer";


export default function DeletarPost() {
    const {id}= useParams()
    const [categoria, setCategoria] = useState([]);
    const [post, setPost] = useState({image: "", titulo: "", texto: "", tipo: "" });
    const [img,setImg]=useState("");
    const navigate = useNavigate(); 
    

    function buscaPostid(){
        fetch(`http://localhost:3000/admin/post/buscaid/${id}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${verificarToken()}`
            }
        })
        .then((res)=>res.json())
        .then((resp)=>{
            setPost({image:resp.caminhoImg, titulo: resp.tituloPost, texto:resp.textoPost, tipo:resp.fk_tipo._id })
            (UrlImg(resp.caminhoImg));
        })

    }

    function verCategoria() {
      
        fetch("http://localhost:3000/categoria", {
            method: 'GET',
        })
            .then(res => res.json())
            .then((dados) => {
                setCategoria(dados)
            });
    }

    function deletarPost(form){
        form.preventDefault();
        fetch(`http://localhost:3000/admin/post/deletar/${id}`,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${verificarToken()}`
            }
        })
        .then((res)=>res.json())
        .then((resp)=>{
            
            navigate('/admin/pagina/inicial', { state: { message: 'Post deletado com sucesso!' } }); 
        })
    }

    useEffect(() => {
        verCategoria();
        buscaPostid();
    }, []);

    return (
        <>
            <Header titulo={"Deletar Post"}></Header>

            <div className="caixaFormA">

                <form onSubmit={(form)=>deletarPost(form)} encType="multipart/form-data">
                <div className="camposAI">
                        <img src={img} alt={img} />
                    </div>


                    <div className="camposA">
                        <input type="text" name="titulo" id="ititulo" placeholder="Digite o titulo:" onChange={(el) => setPost({ ...post, titulo: el.target.value })} value={post.titulo} />
                    </div>

                    <div className="camposA">
                        <textarea name="texto" id="itexto" placeholder="Digite o texto:" onChange={(el) => setPost({ ...post, texto: el.target.value })} value={post.texto}></textarea>
                    </div>

                    <div className="camposA">
                        {categoria.length > 0
                            ?
                            <select name="tipo" id="itipo" onChange={(el) => setPost({ ...post, tipo: el.target.value })}>
                                {categoria.map((el, index) => (
                                    post.tipo==el._id
                                    &&
                                    <option key={index} value={el._id} selected>{el.tipoPost}</option>
                                ))}
                            </select>

                            :
                            <p>sem tipo</p>
                        }

                    </div>

                    <div className="camposA">
                        <button type="submit">Deletar Post</button>
                    </div>
                </form>
            </div>
            <Footer></Footer>
        </>
    );
}
