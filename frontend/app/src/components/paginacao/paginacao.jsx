import React, { useState } from 'react';
import './paginacao.css';
import '../../pages/Home/Home.css'

const Paginacao = () => {
  const [selected, setSelected] = useState('Recomendado');

  return (
    <div className="caixaNovidades">
      <div className="caixaIcone">
        <div className="icones">
          <span className="material-symbols-outlined icon">add</span>
        </div>
        <p>Fique por dentro das últimas novidades...</p>
      </div>
      <div className="caixaPaginacao">
        <p>
          <a
            href="#"
            className={selected === 'Seguindo' ? 'selected' : ''}
            onClick={() => setSelected('Seguindo')}
          >
            Seguindo
          </a>
        </p>
        <p>
          <a
            href="#"
            className={selected === 'Recomendado' ? 'selected' : ''}
            onClick={() => setSelected('Recomendado')}
          >
            Recomendado
          </a>
        </p>
      </div>
    </div>
  );
};

export default Paginacao;
