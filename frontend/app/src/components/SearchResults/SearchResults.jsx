import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header/header";
import Footer from "../../components/Footer";
import UrlImg from "../../helpers/imagem";
import semPost from "../../assets/imagem/tarefa.png";
import verificarToken from "../../middleware/middleware";
import "../../pages/Home/Home.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SearchResults() {
    const { frase } = useParams();
    const [posts, setPosts] = useState([]);
    const [favoritado, setFavoritado] = useState([]);
    const [likesDados, setLikesDados] = useState({});
    const [atualizarPosts, setAtualizarPosts] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/buscar/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: frase })
        })
        .then(resp => resp.json())
        .then((res) => {
            setPosts(res);
        });
    }, [frase]);

    const favoritarPost = (idPost) => {
        const token = verificarToken();
        if (!token) {
            navigate('/login');
            return;
        }

        fetch('http://localhost:3000/favoritar/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ postId: idPost })
        })
        .then(res => res.json())
        .then(resp => {
            toast.info("Post favoritado com sucesso");
            setAtualizarPosts(!atualizarPosts);
            if (!isFavoritado(idPost)) {
                setFavoritado([...favoritado, idPost]);
            } else {
                setFavoritado(favoritado.filter(postId => postId !== idPost));
            }
        })
        .catch((error) => {
            console.error('Erro ao favoritar post:', error);
        });
    };

    const darLike = (idPost) => {
        if (likesDados[idPost]?.liked) {
            return;
        }

        fetch('http://localhost:3000/post/like', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postId: idPost })
        })
        .then(res => res.json())
        .then(resp => {
            setLikesDados({
                ...likesDados,
                [idPost]: {
                    liked: true,
                    disliked: false
                }
            });
            setAtualizarPosts(!atualizarPosts);
            toast.info("like");
        })
        .catch((error) => {
            console.error('Erro ao dar like:', error);
        });
    };

    const desLike = (idPost) => {
        if (likesDados[idPost]?.disliked) {
            return;
        }

        fetch('http://localhost:3000/post/deslike', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postId: idPost })
        })
        .then(res => res.json())
        .then(resp => {
            setLikesDados({
                ...likesDados,
                [idPost]: {
                    liked: false,
                    disliked: true
                }
            });
            setAtualizarPosts(!atualizarPosts);
            toast.info("deslike");
        })
        .catch((error) => {
            console.error('Erro ao dar deslike:', error);
        });
    };

    const isFavoritado = (idPost) => {
        return favoritado.includes(idPost);
    };

    const isLiked = (idPost) => {
        return likesDados[idPost]?.liked;
    };

    const isDisliked = (idPost) => {
        return likesDados[idPost]?.disliked;
    };

    return (
        <>
            <Header titulo={`Resultados da busca: ${frase}`} />
            <div className="listaPost">
                {posts.length > 0 ? (
                    <div className="caixaPost">
                        {posts.map((el, index) => (
                            <div className="post" key={index}>
                                <div className="postImg">
                                    <img src={UrlImg(`${el.caminhoImg}`)} alt={el.caminhoImg} />
                                </div>
                                <a href={`/ver/post/${el._id}`} className="posts">
                                    <div className="caixaP">
                                        <div className="postDados">
                                            <p className="nomeP">
                                                {el.fk_user && el.fk_user.perfil ? el.fk_user.perfil : 'autor não especificado'}
                                            </p>
                                            <p className="dataP">{new Date(el.dataCadastro).toLocaleDateString()}</p>
                                        </div>
                                        <div className="postTitulo">
                                            <p>{el.tituloPost}</p>
                                        </div>
                                        <div className="postTexto">
                                            <p>{el.textoPost}</p>
                                        </div>
                                    </div>
                                </a>
                                <div className="caixaAcao">
                                    <p onClick={() => favoritarPost(el._id)} className={`favoritar ${isFavoritado(el._id) ? 'favoritado' : ''}`}>
                                        <span className="material-symbols-outlined">favorite</span>favoritar
                                    </p>
                                    <p className={`like ${isLiked(el._id) ? 'liked' : ''}`} onClick={() => darLike(el._id)}>
                                        <span className="material-symbols-outlined">thumb_up</span>like <span className="numeroLD">{el.numeroLike}</span>
                                    </p>
                                    <p className={`deslike ${isDisliked(el._id) ? 'disliked' : ''}`} onClick={() => desLike(el._id)}>
                                        <span className="material-symbols-outlined">thumb_down</span>deslike <span className="numeroLD">{el.numeroDeslike}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="semPost">
                        <img src={semPost} alt="semPost" />
                        <p>Sem Posts no momento recarregue a página</p>
                    </div>
                )}
            </div>
            <Footer />
            <ToastContainer />
        </>
    );
}
