import React, { useState,useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import vericarLogin from '../middleware/auth'

const RotaPrivada = ({ children }) => {

  return vericarLogin()  ? children : <Navigate to="/login" />;
  
};

export default RotaPrivada;
