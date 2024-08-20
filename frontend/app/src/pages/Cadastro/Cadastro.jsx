import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderLogin from "../../components/Header/Header/HeaderLogin";
import imageC from "../../assets/imagem/cadastro.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../../components/Footer";

export default function cadastro() {
    const [dados, setDados] = useState({ nome: '', email: '', senha: '', confirmsenha: '' });
    const navigate = useNavigate();

    function enviarDados(form) {
        form.preventDefault();

        const { nome, email, senha, confirmsenha } = dados;
        if (!nome) {
            return toast.info("Nome: é obrigatorio !")
        } else if (!email) {
            return toast.info('o email é obrigatorio !')
        } else if (!senha) {
            return toast.info("senha obrigatoria !")
        } else if (!confirmsenha) {
            return toast.info("confirme sua senha !")
        } else if (senha != confirmsenha) {
            return toast.error("senha invalida !")
        } else {

            fetch("http://localhost:3000/cadastra/user", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            })
                .then(res => res.json())
                .then(res => {
                    if(res.opc===3){
                        
                        setDados("");
                        return toast.error("Usuario já cadastrado!");
                    }else if(res.opc==2){
                        setDados({senha:"",confirmsenha:""});
                        return toast.error("senha invalida !")
                    }else{
                        toast.success("Cadastro realizado com sucesso!");
                        navigate('/login');
                    }
                   
                })
                .catch((erro) =>  toast.error("Erro ao fazer Login"))
        }

    }

    return (
        <>
             <HeaderLogin titulo="TechBlog.click" nomel="login"></HeaderLogin>
            <div className="caixaLogin">
                <div className="caixaLimg">
                    <img src={imageC} alt="login" />
                </div>
                <div className="caixaForm">

                    <form action="/login" method="post" onSubmit={(form) => { enviarDados(form) }}>

                        <div className="campos">
                            <h2>Cadastro</h2>
                        </div>

                        <div className="campos">
                            <input type="text" name="nome" id="nome" placeholder="Digite seu nome:" value={dados.nome} onChange={(el) => setDados({ ...dados, nome: el.target.value })} />
                        </div>

                        <div className="campos">
                            <input type="email" name="email" id="email" placeholder="Digite seu email:" value={dados.email} onChange={(el) => setDados({ ...dados, email: el.target.value })} />
                        </div>

                        <div className="campos">
                            <input type="password" name="senha" id="senha" placeholder="Digite sua senha:" value={dados.senha} onChange={(el) => setDados({ ...dados, senha: el.target.value })} />
                        </div>

                        <div className="campos">
                            <input type="password" name="confsenha" id="confsenha" placeholder="Digite sua senha:" value={dados.confirmsenha} onChange={(el) => setDados({ ...dados, confirmsenha: el.target.value })} />
                        </div>

                        <div className="campos">
                            <button type="submit"> Cadastra-se </button>
                        </div>

                        <div className="caixaA">
                        <a href="/login">Já possuo cadastro</a>
                    </div>

                    </form>

                   
                    
                </div>
               
            </div>
            <Footer></Footer>
            <ToastContainer></ToastContainer>
        </>
    );

}