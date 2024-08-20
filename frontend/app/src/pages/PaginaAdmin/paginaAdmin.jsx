import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header/header';
import verificarToken from '../../middleware/middleware';
import Url from '../../helpers/helpers';
import Footer from '../../components/Footer';
import semPost from "../../assets/imagem/tarefa.png";
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Butao from "../../components/Butao/Butao";

export default function PaginaAdmin() {
    const [posts, setPosts] = useState([]);
    const location = useLocation();
    const navigate = useNavigate(); // Hook useNavigate para redirecionamento
    const message = location.state?.message;

    function fetchPosts() {
        fetch('http://localhost:3000/admin/meu/post', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${verificarToken()}`
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        if (message) {
            toast.success(message);
            navigate('.', { state: {} });
        }
    }, [message, navigate]);

    return (
        <>
            <Header titulo="M&N Soluções Digitais" />
            <div className="meusPosts">
                <h4>Projetos</h4>
                <div className="caixaVerpost">
                    {posts.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Texto</th>
                                    <th>Categoria</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post, index) => (
                                    <tr key={index}>
                                        <td className='tdTitulo'><p>{post.tituloPost}</p></td>
                                        <td className='tdTexto'><p>{post.textoPost}</p></td>
                                        <td className='tdCategoria'>{post.fk_tipo && post.fk_tipo.tipoPost ? post.fk_tipo.tipoPost : "Sem categoria"}</td>
                                        <td className='tdAcao'>
                                            <div className="caixaBtn">
                                                <a href={Url(`admin/editar/post/${post._id}`)}>
                                                    <button className="btnEditar">
                                                        <span className="material-symbols-outlined">
                                                            edit
                                                        </span>Editar
                                                    </button>
                                                </a>
                                                <a href={Url(`admin/deletar/post/${post._id}`)}>
                                                    <button className="btnApagar">
                                                        <span className="material-symbols-outlined">
                                                            delete
                                                        </span> Deletar
                                                    </button>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="semPost">
                            <img src={semPost} alt="semPost" />
                            <Butao texto={"criar post"} link={"http://localhost:5173/admin/criar/post"} />
                        </div>
                    )}
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </>
    );
}
