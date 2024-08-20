import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function navLink(){
    
    return(
    
        <>
            <nav>
                <a href="/">Home</a>
                <a href="/login">Login</a>
                <a href="/cadastro">Cadastro</a>
            
            </nav>
        </>
    );
}