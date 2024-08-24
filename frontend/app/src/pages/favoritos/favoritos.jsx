import React, { useEffect, useState } from 'react';
import UrlImg from "../../helpers/imagem";

const Favoritos = ({ userId }) => {
    const [favoritos, setFavoritos] = useState([]); // Inicializar como array vazio

    useEffect(() => {
        const fetchFavoritos = async () => {
            try {
                const response = await fetch("http://localhost:3000/admin/favoritos/", {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar favoritos');
                }
                

                const dados = await response.json();
                setFavoritos(dados);
                dados.map((el)=>{
                    console.log(el.fk_post.
                        caminhoImg
                        )
                })
            } catch (error) {
                console.error('Erro ao buscar favoritos:', error);
            }
        };

        fetchFavoritos();
    }, [userId]);

    const removerFavorito = async (postId) => {
        console.log(postId)
        try {
            const response = await fetch(`http://localhost:3000/admin/favoritos/deletar/${postId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao remover favorito');
            }
            setFavoritos(favoritos.filter(favorito => favorito._id !== postId));
        } catch (error) {
            console.error('Erro ao remover favorito:', error);
        }
    };

    return (
        <div className="favoritos-container">
            {favoritos.map((favorito, index) => (
                <div key={favorito._id} className="card">
                         <img src={UrlImg(`${favorito.fk_post.caminhoImg}`)} alt={UrlImg(`${favorito.fk_post.caminhoImg}`)} />
                    <h3>{favorito.fk_user && favorito.fk_user.perfil ? favorito.fk_user.perfil : 'autor não especificado'}</h3>
                    <p>{favorito.textoPost}</p>
                    <p className="dataP">{new Date(favorito.fk_post.dataCadastro).toLocaleDateString()}</p>
                    <p><strong>Autor:</strong> {favorito.fk_user ? favorito.fk_user.name : 'Desconhecido'}</p>
                    <p><strong>Email do Autor:</strong> {favorito.fk_user ? favorito.fk_user.email : 'Desconhecido'}</p>
                    <button onClick={() => removerFavorito(favorito._id)}>Desfavoritar</button>
                </div>
            ))}
        </div>
    );
};

export default Favoritos;
