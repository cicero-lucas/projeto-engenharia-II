import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import verificarToken from '../../middleware/middleware';
import Header from '../../components/Header/Header/header';
import UrlImg from '../../helpers/imagem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../../components/Footer";

export default function EditarPost() {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const [categoria, setCategoria] = useState([]);
    const [post, setPost] = useState({ image: "", titulo: "", texto: "", tipo: "" });
    const [img, setImg] = useState("");

    function buscaPostid() {
        fetch(`http://localhost:3000/admin/post/buscaid/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${verificarToken()}`
            }
        })
        .then((res) => res.json())
        .then((resp) => {
            setPost({ image: ` ${resp.caminhoImg}`, titulo: resp.tituloPost, texto: resp.textoPost, tipo: resp.fk_tipo._id });
            setImg(UrlImg(resp.caminhoImg));
        });
    }

    function verCategoria() {
        fetch("http://localhost:3000/categoria", {
            method: 'GET',
        })
        .then(res => res.json())
        .then((dados) => {
            setCategoria(dados);
        });
    }

    function criarPost(event) {
        event.preventDefault();
        if (!post.titulo) {
            toast.info('O título é um campo obrigatório!');
        } else if (!post.texto) {
            toast.info('O texto é um campo obrigatório!');
        } else {
            const formData = new FormData();
            if (post.image && post.image instanceof File) {
                formData.append('image', post.image);
            }
            formData.append('titulo', post.titulo);
            formData.append('texto', post.texto);
            formData.append('tipo', post.tipo);

            fetch(`http://localhost:3000/admin/post/editar/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${verificarToken()}`
                },
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                navigate('/admin/pagina/inicial', { state: { message: 'Post editado com sucesso!' } });             })
            .catch(error => console.error(error));
        }
    }

    function handlefile(event) {
        const file = event.target.files[0];
        setPost({ ...post, image: file });
    }

    useEffect(() => {
        verCategoria();
        buscaPostid();
    }, []);

    return (
        <>
            <Header titulo={"Editar Post"}></Header>
            <div className="caixaFormA">
                <form onSubmit={criarPost} encType="multipart/form-data">
                    <div className="camposAI">
                        <img src={img} alt="Imagem atual" />
                    </div>

                    <div className="camposA">
                        <input type="file" name='image' onChange={handlefile} />
                    </div>

                    <div className="camposA">
                        <input type="text" name="titulo" id="ititulo" placeholder="Digite o titulo:" onChange={(el) => setPost({ ...post, titulo: el.target.value })} value={post.titulo} />
                    </div>

                    <div className="camposA">
                        <textarea name="texto" id="itexto" placeholder="Digite o texto:" onChange={(el) => setPost({ ...post, texto: el.target.value })} value={post.texto}></textarea>
                    </div>

                    <div className="camposA">
                        {categoria.length > 0
                            ? <select name="tipo" id="itipo" onChange={(el) => setPost({ ...post, tipo: el.target.value })} value={post.tipo}>
                                {categoria.map((el, index) => (
                                    <option key={index} value={el._id}>{el.tipoPost}</option>
                                ))}
                            </select>
                            : <p>sem tipo</p>
                        }
                    </div>

                    <div className="camposA">
                        <button type="submit">Editar Post</button>
                    </div>
                </form>
            </div>
            <Footer></Footer>
        </>
    );
}
