import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header/header';
import UrlImg from "../../helpers/imagem";
import Footer from '../../components/Footer';
import './style/homeVerPost.css';
import verificarToken from '../../middleware/middleware';
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importar o CSS do Quill


export default function HomeVerPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({});
    const [atualizarPosts, setAtualizarPosts] = useState(false);
    const [favoritado, setFavoritado] = useState([]);
    const [likesDados, setLikesDados] = useState({});
    const [comentarios, setComentarios] = useState([]);
    const [novoComentario, setNovoComentario] = useState('');
    const [mostrarTextArea, setMostrarTextArea] = useState(false);
    const [comentarioEditando, setComentarioEditando] = useState(null);
    const [atualizarComentarios, setAtualizarComentarios] = useState(false);
    const [comentarioSelecionado, setComentarioSelecionado] = useState(null);
    const [usuarioLogado, setUsuarioLogado] = useState(null);


    const token = verificarToken();

    const verifcarLogin = () => {
        if (!token) {
            navigate('/login');
            return;
        } else {

            fetch('http://localhost:3000/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(user => {
                    setUsuarioLogado(user);
                })
                .catch(error => {
                    console.error('Erro ao obter informações do usuário:', error);
                });
        }
        return true
    }

    const favoritarPost = (idPost) => {

        if (!verifcarLogin()) {

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
                console.log(resp);
                alert(resp.msg);
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
                console.log(resp);
                alert(resp.msg);
                setLikesDados({
                    ...likesDados,
                    [idPost]: {
                        liked: true,
                        disliked: false
                    }
                });
                setAtualizarPosts(!atualizarPosts);
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
                console.log(resp);
                alert(resp.msg);
                setLikesDados({
                    ...likesDados,
                    [idPost]: {
                        liked: false,
                        disliked: true
                    }
                });
                setAtualizarPosts(!atualizarPosts);
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

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch(`http://localhost:3000/ver/post/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setPost(data);
                } else {
                    console.error('Erro ao buscar o post:', response.status);
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
            }
        }

        async function fetchComentarios() {
            try {
                const response = await fetch(`http://localhost:3000/post/comentarios/post/${id}`)
                if (response.ok) {
                    const data = await response.json();
                    setComentarios(data);
                } else {
                    console.error('Erro ao buscar os comentários:', response.status);
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
            }
        }

        fetchPost();
        fetchComentarios();
    }, [id, atualizarPosts, atualizarComentarios]); // Adicionado atualizarComentarios como dependência

    const adicionarComentario = () => {
        const token = verificarToken();

        if (!token) {
            navigate('/login');
            return;
        }

        fetch('http://localhost:3000/post/comentarios/criar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ "fk_post": id, "comentario": novoComentario })
        })
            .then(res => res.json())
            .then(resp => {
                setNovoComentario('');
                setAtualizarComentarios(!atualizarComentarios); // Força a atualização dos comentários
                setMostrarTextArea(false);
            })
            .catch((error) => {
                console.error('Erro ao adicionar comentário:', error);
            });
    };

    const editarComentario = (comentarioId, texto) => {
        const token = verificarToken();

        if (!token) {
            navigate('/login');
            return;
        }

        fetch(`http://localhost:3000/post/comentarios/editar/${comentarioId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ "comentario": texto })
        })
            .then(res => res.json())
            .then(resp => {
                setAtualizarComentarios(!atualizarComentarios); // Força a atualização dos comentários
                setComentarioEditando(null); // Limpa o estado de comentário editando
            })
            .catch((error) => {
                console.error('Erro ao editar comentário:', error);
            });
    };

    const excluirComentario = (comentarioId) => {
        const token = verificarToken();

        if (!token) {
            navigate('/login');
            return;
        }

        fetch(`http://localhost:3000/post/comentarios/deletar/${comentarioId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(resp => {
                setAtualizarComentarios(!atualizarComentarios);
            })
            .catch((error) => {
                console.error('Erro ao excluir comentário:', error);
            });
    };

    return (
        <>
            <Header titulo="Ver post" />

            <div className="caixaVpost">
                <div className="caixaImgVpost">
                    <img
                        src={post.caminhoImg && post.caminhoImg !== "" ? UrlImg(post.caminhoImg) : "../assets/imagem/cadastro.png"}
                        alt={post.caminhoImg && post.caminhoImg !== ""
                            ? UrlImg(post.caminhoImg) : "Imagem de cadastro"}
                    />
                    <div className="Vtitulo">
                        <p>{post.tituloPost}</p>
                    </div>
                </div>
                <div className="postDados">
                    <p className="nomeP">
                        {post.fk_user && post.fk_user.perfil ? post.fk_user.perfil : 'Autor não especificado'}
                    </p>
                    <p className="dataP">
                        {new Date(post.dataCadastro).toLocaleDateString()}
                    </p>
                    <div className="caixaAcao">
                        <p className="comentario" onClick={() => setMostrarTextArea(!mostrarTextArea)}>
                            <span className="material-symbols-outlined">comment</span> Comentar
                        </p>
                        <p className={`like ${isLiked(post._id) ? 'liked' : ''}`} onClick={() => darLike(post._id)}>
                            <span className="material-symbols-outlined">thumb_up</span> Like <span className="numeroLD">{post.numeroLike}</span>
                        </p>
                        <p className={`deslike ${isDisliked(post._id) ? 'disliked' : ''}`} onClick={() => desLike(post._id)}>
                            <span className="material-symbols-outlined">thumb_down</span> Deslike <span className="numeroLD">{post.numeroDeslike}</span>
                        </p>
                        <p onClick={() => favoritarPost(post._id)} className={`favoritar ${isFavoritado(post._id) ? 'favoritado' : ''}`}>
                            <span className="material-symbols-outlined">favorite</span> Favoritar
                        </p>
                    </div>
                </div>
                <div className="Vtexto">
                    <Quill
                        value={post.textoPost}
                        readOnly
                        theme="snow"
                        modules={{ toolbar: false }}
                    />
                </div>
                <div className="comentarios">
                    <h3>Comentários</h3>
                    {mostrarTextArea && (
                        <div className="adicionarComentario">
                            <textarea
                                value={novoComentario}
                                onChange={(e) => setNovoComentario(e.target.value)}
                                placeholder="Adicione um comentário..."
                            ></textarea>
                            <button onClick={adicionarComentario}>Comentar</button>
                        </div>
                    )}

                    <div className="listaComentarios">
                        {comentarios.length > 0 ? (
                            comentarios.map((comentario) => (
                                <div key={comentario._id} className="comentario">
                                    {comentarioEditando === comentario._id ? (
                                        <>
                                            <textarea
                                                value={novoComentario}
                                                onChange={(e) => setNovoComentario(e.target.value)}
                                            ></textarea>
                                            <button onClick={() => editarComentario(comentario._id, novoComentario)}>Salvar</button>
                                            <button onClick={() => setComentarioEditando(null)}>Cancelar</button>
                                        </>
                                    ) : (
                                        <>
                                            <p>{comentario.comentario}</p>
                                            <span>{comentario.fk_user?.perfil ?? 'Usuário não especificado'} - {new Date(comentario.dataCadastro).toLocaleDateString()}</span>
                                            {usuarioLogado && comentario.fk_user?._id === usuarioLogado._id && (
                                                <div className="comentarioAcoes">
                                                    <button onClick={() => {
                                                        setComentarioEditando(comentario._id);
                                                        setNovoComentario(comentario.comentario);
                                                        setComentarioSelecionado(comentario._id); // Marca o comentário como selecionado
                                                    }}>
                                                        <span className="material-symbols-outlined">edit</span> Editar
                                                    </button>
                                                    <button onClick={() => excluirComentario(comentario._id)}>
                                                        <span className="material-symbols-outlined">delete</span> Excluir
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>Não há comentários.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

