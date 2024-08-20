import {React,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Url from '../../../helpers/helpers';

export default function LogLink(){
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('tokenAutorization');
        navigate('/');
    };


    return(
        <>
            <nav>
               <a href={Url('')}>Home</a>
               <a href={Url('admin/pagina/inicial')}>Dashboard</a>
               <a href={Url('admin/criar/post')}>Criar Posts</a>
               <a href={Url('admin/ver/favoritos')}>Favoritos</a>

               <button onClick={()=>logout()}>sair</button>
            </nav>
        </>
    );
}