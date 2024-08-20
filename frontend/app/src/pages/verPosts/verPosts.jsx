import { React, useState, useEffect } from 'react';
import verificarToken from '../../middleware/middleware';
import Header from "../../components/Header/Header/header";
import Helpers from "../../helpers/helpers";
import semPost from "../../assets/imagem/tarefa.png"
export default function VerPosts() {
    const [post, setPost] = useState([]);
    function novosPosts() {
        fetch('http://localhost:3000/admin/meu/post', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${verificarToken()}`
            },
           
        })
            .then((resp) => resp.json())
            .then((res) => {
                setPost(res);
            })

    }

    useEffect(() => {
        novosPosts()
    }, [])
    return (
        <>
            <Header titulo="ver seus post"></Header>
            <div className="caixaVerpost">
                {
                    post.length>0
                        ?
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
                            {post.map((el,index)=>(
                                <tr key={index}>
                                <td>{el.tituloPost}</td>
                                <td>{el.textoPost}</td>
                                <td>{el.fk_tipo && el.fk_tipo.tipoPost ? el.fk_tipo.tipoPost:"sem categoria"}</td>
                                <td>
                                    <div className="caixaBtn">
                                        <a href={Helpers(`admin/editar/post/${el._id}`)}>
                                            <button className="btnEditar">Editar</button>
                                        </a>

                                        <a href={Helpers(`admin/deletar/post/${el._id}`)}>
                                            <button className="btnApagar">Apagar</button>
                                        </a>

                                    </div>
                                </td>
                            </tr>
                            ))}
                       
                                
                            
                            </tbody>
                        </table>
                        :
                        <div className="semPost">
                        <img src={semPost} alt="semPost" />
                        <p className='sPost'>Sem Posts no momento recaregue a pagina</p>
                    </div>
                    
                }
            </div>


        </>
    );
}