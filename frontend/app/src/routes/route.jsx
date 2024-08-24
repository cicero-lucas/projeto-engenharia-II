import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Cadastro from '../pages/Cadastro/Cadastro';
import RotaPrivada from './RotaPrivada';
import PaginaAdmin from '../pages/PaginaAdmin/paginaAdmin';
import CriarPost from '../pages/criarPost/criarPost';
import VerPosts from '../pages/verPosts/verPosts';
import CategoriaPosts from '../pages/categoriaPosts/categoriaPosts';
import EditarPost from '../pages/editarPost/editarPost';
import DeletarPost from '../pages/deletarPost/deletarPost';
import PaginaPerfil from '../pages/paginaPerfil/PaginaPerfil';
import HomeVerPost from '../pages/homeVerPost/homeVerPost';
import SearchResults from '../components/SearchResults/SearchResults';
import Favoritos from '../pages/favoritos/favoritos';

const Rotas = () => (
  <Router>
    <Routes>
      <Route path='/' exact element={<Home />} />
      <Route path='/cadastro' element={<Cadastro />} />
      <Route path="/search/:frase" element={<SearchResults />} />
      <Route path='/login' element={<Login />} />
      
      <Route path='/categoria/:tipo' element={<CategoriaPosts />} />
      <Route path="/ver/post/:id" element={
          <HomeVerPost/>
      } />

      <Route path='/admin/pagina/inicial'
        element={
          <RotaPrivada>
            <PaginaAdmin />
          </RotaPrivada>
        } />

      <Route path="/admin/criar/post" element={
        <RotaPrivada>
          <CriarPost />
        </RotaPrivada>
      } />

      <Route path='/admin/ver/post'
        element={
          <RotaPrivada>
            <VerPosts />
          </RotaPrivada>
        } />
      <Route path='/admin/editar/post/:id' element={
        <RotaPrivada>
          <EditarPost />
        </RotaPrivada>
      } />

      <Route path='/admin/deletar/post/:id' element={
        <RotaPrivada>
          <DeletarPost />
        </RotaPrivada>
      } />
      <Route path='/admin/ver/favoritos' element={
        <RotaPrivada>
          <Favoritos />
        </RotaPrivada>
      } />

      <Route path='/admin/pagina/perfil' element={
        <RotaPrivada>
          <PaginaPerfil />
        </RotaPrivada>
      } />
      
      <Route path='/admin/favoritos/:id' element={
        <RotaPrivada>
          <PaginaPerfil />
        </RotaPrivada>
      } />

    </Routes>
  </Router>
);

export default Rotas;
