
import Header from "../../components/Header/Header/header";
import verificarToken from "../../middleware/middleware";
import {React, useState,useEffect} from 'react';
export default function PaginaPerfil(){
    const [perfil,setPerfil] = useState([]);

    function buscarPefil(){
        fetch("http://localhost:3000/buscar/perfil",{
            method:"GET",
            headers: {
                'Authorization': `Bearer ${verificarToken()}`
            }
        })
        .then((res)=>res.json())
        .then((resul)=>setPerfil(resul))
        
    }

    useEffect(()=>{
        buscarPefil()
    },[])
    return(
        <>
            <Header titulo="Perfil"></Header>

            {
                perfil.length<1 ?

                <p>1</p>
                :
                <p>aa</p>
            }
    
        </>


    );
}