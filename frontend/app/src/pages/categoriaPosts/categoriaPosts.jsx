import {React,useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header/header";
import Footer from "../../components/Footer";
import "../Home/Home.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Posts from "../../components/posts/posts";

export default function CategoriaPosts(){
    const navigate = useNavigate();
    const {tipo}=useParams();
    return(
        <>
            <Header titulo={`Categoria ${tipo}`}></Header>

            <div className="pcategoria">
            <a href="/categoria/programacao">
                <button>Programação</button>
            </a>
            <a href="/categoria/atualidade">
                <button>Atualidade</button>
            </a>
            <a href="/categoria/software">
                <button>Software</button>
            </a>
            <a href="/categoria/hadware">
                <button>Hadware</button>
            </a>
            <a href="/categoria/ia">
                <button>IA</button>
            </a>
           </div>
           <Posts url={`http://localhost:3000/categoria/${tipo}`}></Posts>
            <Footer />
            <ToastContainer/>


        </>
    );
}