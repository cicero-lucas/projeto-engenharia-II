import React from 'react';

const verificarToken = () => {
  const token = localStorage.getItem('tokenAutorization');
  if(token){
    return token;
  }else{
    return false;
  }
};

export default verificarToken;
