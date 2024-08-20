

export default function HeaderLogin({ titulo ,nomel}) {

    return (
        <>
            <header>

                <p className="titulo">{titulo}</p>

                <div className="caixaLink">
                    <a href="/">Home</a>
                    {
                    nomel==="login"
                    ?
                    <a href="/login"><button className="btnLogin">Login</button></a>
                    :
                    <a href="/cadastro"><button className="btnLogin" style={{width:'100px'}}>Cadastra-se</button></a>
                    }
                </div>
            </header>

        </>
    );
}