import React, { useState, useEffect } from 'react';
import verificarToken from '../../middleware/middleware';
import HeaderAdmin from '../../components/Header/Header/HeaderAdmin';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../../components/Footer";
import imageC from "../../assets/imagem/cadastro.png";

export default function CriarPost() {
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState([]);
    const [post, setPost] = useState({ image: "", titulo: "", texto: "", tipo: "6626aec654ae837857927213" });

    function verCategoria() {
        fetch("http://localhost:3000/categoria", {
            method: 'GET',
        })
            .then(res => res.json())
            .then((dados) => {
                setCategoria(dados)
            });
    }

    function cPost(event) {
        event.preventDefault();
        if (!post.titulo) {
            toast.info('O título é um campo obrigatório!');
        } else if (!post.texto) {
            toast.info('O texto é um campo obrigatório!');
        } else {

            const formData = new FormData();
            formData.append('image', post.image);
            formData.append('titulo', post.titulo);
            formData.append('texto', post.texto);
            formData.append('tipo', post.tipo);

            fetch("http://localhost:3000/admin/post", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${verificarToken()}`
                },
                body: formData
            })
                .then(res => {
                    res.json();
                })
                .then(data => {
                    navigate('/admin/pagina/inicial', { state: { message: 'Post criado com sucesso!' } });
                })
                .catch(error => console.error(error));
        }


    }

    function handlefile(event) {
        const file = event.target.files[0];
        setPost({ ...post, image: file });
    }

    useEffect(() => {
        verCategoria();
    }, []);

    return (
        <>
            <HeaderAdmin titulo="M&N Soluções Digitais"></HeaderAdmin>

            <div className="caixaLogin">
                <div className="caixaLimg">
                    <img src={imageC} alt="login" />
                </div>
                <div className="caixaForm">

                    <form onSubmit={cPost} encType="multipart/form-data">

                        <div className="camposA">
                            <h2>Criar Posts</h2>
                        </div>
                        <div className="camposA">
                            <input type="file" name='image' onChange={handlefile} placeholder='imagem do Projeto' />
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
                                        <option key={index} value={el._id}>{el.tipoPost}</option>
                                    ))}
                                </select>

                                :
                                <p>sem tipo</p>
                            }

                        </div>

                        <div className="camposA">
                            <button type="submit">Adicionar</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer></Footer>
            <ToastContainer></ToastContainer>
        </>
    );
}
