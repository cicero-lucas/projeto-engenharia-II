import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import HeaderLogin from "../../components/Header/Header/HeaderLogin";
import imgLogin from "../../assets/imagem/apresetacao.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../../components/Footer";

export default function Login() {
    const [dados, setDados] = useState({ email: '', senha: '' });
    const navigate = useNavigate();

    function enviarDados(form) {

        form.preventDefault();
        const { email, senha } = dados;
        if (!email) {
            return toast.info("Email ou senha Invalida");
        } else if (!senha) {
           return toast.info("Email ou senha Invalida");
        } else {
            fetch("http://localhost:3000/login/user", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.opc ===3){
                        toast.error("Erro! ao fazer Login")
                    }else if (res.opc === 2) {
                       return toast.error("Senha incorreta!");

                    } else if (res.opc === 1) {
                        const token = res.token;
                        localStorage.setItem('tokenAutorization', token);
                        setDados({ email: '', senha: '' });
                        navigate('/');
                        
                    }
                })
                .catch((erro) =>  toast.error("Erro! ao fazer Login"));
        }
    }

    return (
    <>
        <div className="pagLogin">
            <HeaderLogin titulo="TecBlog.click" nomel="cadastro"></HeaderLogin>

            <div className="caixaLogin">
                <div className="caixaLimg">
                    <img src={imgLogin} alt="login" />
                </div>
                <div className="caixaForm">

                    <form action="/login" method="post" onSubmit={(form) => { enviarDados(form) }}>

                        <div className="campos">
                            <h2>Login</h2>
                        </div>

                        <div className="campos">
                            <input type="email" name="email" id="email" placeholder=" &copy; Digite seu email:" value={dados.email} onChange={(el) => setDados({ ...dados, email: el.target.value })} />
                        </div>

                        <div className="campos">
                            <input type="password" name="senha" id="senha" placeholder="Digite sua senha:" value={dados.senha} onChange={(el) => setDados({ ...dados, senha: el.target.value })} />
                        </div>

                        <div className="campos">
                            <button type="submit"> Login </button>
                        </div>

                    </form>

                    <div className="caixaA">
                        <a href="#">Esqueci minha senha</a>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        <ToastContainer/>
    </>

    );
}
