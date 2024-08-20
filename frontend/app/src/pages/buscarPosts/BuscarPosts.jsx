import {useParams} from 'react-router-dom'
import { useEffect, useState } from "react";
import Header from '../../components/Header/Header/header';
import semPost from "../../assets/imagem/tarefa.png"

export default function BuscarPosts(){
    const {frase}=useParams();
    const [posts, setPosts]=useState([])
    
    function pesquisarPost(frase){
        fetch('http://localhost:3000/buscar/posts',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body:JSON.stringify({nome:frase})
        })
        .then(resp=>resp.json())
        .then((res)=>{
            if(res.opc==0){
                alert(res.msg)
            }else{
                setPosts(res);
            }
            
        })
    }

    useEffect(()=>{
        pesquisarPost(frase)
    },[])
    
    return(
        <>
            <Header titulo="Buscar Posts"/>

            <div className="listaPost">
               {
                posts.length>1?
                <div className="caixaPost">
                    {posts.map((el,index)=>(
                        <div className="post" key={index}>
                            <div className="postTitulo">
                                <img src={el.caminhoImg} alt={el.caminhoImg} />
                            </div>

                            <div className="postTitulo">
                                <p>{el.tituloPost}</p>
                            </div>

                            <div className="postTexto">
                                <p>{el.textoPost}</p>
                            </div>
                            
                            <div className="postTexto">
                                <p>
                                    {el.fk_tipo && el.fk_tipo.tipoPost ? el.fk_tipo.tipoPost : 'Tipo não especificado'}
                                </p>

                                <p>
                                    {el.fk_user && el.fk_user.perfil ? el.fk_user.perfil : 'autor não especificado'}
                                </p>
                                
                                <p>
                                    {new Date(el.dataCadastro).toLocaleString()}
                                </p>

                            </div>
        
                        </div>
                    ))}
                </div>
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