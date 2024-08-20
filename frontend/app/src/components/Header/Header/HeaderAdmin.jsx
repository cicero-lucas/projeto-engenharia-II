
import Lateral from "../../Lateral/lateral";
import {useNavigate} from 'react-router-dom';

export default function HeaderAdmin({ titulo }) {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('tokenAutorization');
        navigate('/');
    };

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

                <div className="caixaLink">
                    <a href="#">Home</a>
                    <button onClick={()=>logout()} className="btnLogin">Sair</button>
                </div>
            </header>

            

        </>
    );
}