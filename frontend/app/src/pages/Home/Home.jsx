import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header/header";
import Footer from "../../components/Footer";
import "./Home.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Busca from "../../components/buscar/buscar";
import Posts from "../../components/posts/posts";
import Paginacao from "../../components/paginacao/paginacao";
import LinkCategoria from "../../components/linkCategoria/linkCategoria";


export default function Home() {

    const navigate = useNavigate(); 


    return (
        <>
            <Header titulo="TecBlog.click" />
            <div className="main">
                <div className="caixaLateral">
                <div><Busca/></div>
                <LinkCategoria></LinkCategoria>
                </div>
                <Paginacao/>
                <Posts url="http://localhost:3000/ver/posts"></Posts>
            </div>
            <Footer />
            <ToastContainer/>
        </>
    );
}

