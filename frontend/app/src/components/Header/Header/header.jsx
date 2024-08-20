import {React,useEffect,useState} from "react";
import Lateral from "../../Lateral/lateral";
import {useNavigate} from 'react-router-dom';

export default function Header({ titulo }) {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('tokenAutorization');
        navigate('/');
    };
    const [login,setLogin]=useState(false);
    function verifcarLogin(){
       if(localStorage.getItem('tokenAutorization')){
        setLogin(true);
       }else{
        setLogin(false);
       }
    }
   
    useEffect(()=>{
        verifcarLogin()
    },[])

    return (
        <>
            <header>
                <div className="caixaMenu">

                    <div className="caixaLabel">
                        <label htmlFor="menuH">
                            <span class="material-symbols-outlined">menu</span>
                        </label>
                    </div>

                    <input type="checkbox" id="menuH" />
                    <div className="menu">
                        <Lateral></Lateral>
                    </div>
                </div>
                <p className="titulo">{titulo}</p>
                {
                    login ?
                    <div className="caixaLink">
                    <a href="../">Home</a>
                    <button onClick={()=>logout()} className="btnLogin">Sair</button>
                    </div>
                    :
                    <div className="caixaLink">
                    <a href="./">Home</a>
                    <a href="/login"><button className="btnLogin">Login</button></a>
                </div>
                }
                
            </header>

        </>
    );
}