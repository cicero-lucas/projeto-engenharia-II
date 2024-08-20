import './Butao.css';
export default function Butao({texto,link}){
    return(
        <div className="bnt">
            <a href={link}>
                <button>{texto}</button>
            </a>
        </div>
    );
}