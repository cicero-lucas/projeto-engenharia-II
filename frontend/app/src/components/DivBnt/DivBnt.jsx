import Butao from "../Butao/Butao";
export default function DivBnt({titulo,textod,texto,link}){
    return(
        <>
            <div className="caixaA">
                <Butao texto={texto} link={link}>
                </Butao>
            </div>
        </>
    );
}