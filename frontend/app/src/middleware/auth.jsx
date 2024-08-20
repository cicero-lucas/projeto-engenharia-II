import React from 'react';

const verificarLogin = () => {
  const token = localStorage.getItem('tokenAutorization');
  if(token){
    return true;
  }else{
    return false;
  }
};

export default verificarLogin;
