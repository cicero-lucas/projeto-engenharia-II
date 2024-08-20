import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./buscar.css"; // Importar o CSS

const Busca = () => {
    const [frase, setFrase] = useState("");
    const [sugestoes, setSugestoes] = useState([]);
    const navigate = useNavigate();

    const handleInputChange = (el) => {
        const value = el.target.value;
        setFrase(value);
        if (value.length > 0) {
            setSugestoes(getSugestoes(value).slice(0, 3));
        } else {
            setSugestoes([]);
        }
    };

    const handleKeyPress = (el) => {
        if (el.key === "Enter" && frase.length > 0) {
            pesquisarPost();
        }
    };

    const handleSearch = () => {
        if (frase.length > 0) {
            pesquisarPost();
        }
    };

    const getSugestoes = (value) => {
        const opcoes = [
            "programação em Python",
            "desenvolvimento web",
            "inteligência artificial",
            "machine learning",
            "deep learning",
            "redes neurais",
            "ciência de dados",
            "análise de dados",
            "visualização de dados",
            "big data",
            "datawarehousing",
            "engenharia de dados",
            "algoritmos",
            "estruturas de dados",
            "sistemas distribuídos",
            "blockchain",
            "cibersegurança",
            "privacidade de dados",
            "programação funcional",
            "programação orientada a objetos",
            "programação em JavaScript",
            "desenvolvimento de aplicativos móveis",
            "desenvolvimento de jogos",
            "realidade aumentada",
            "realidade virtual",
            "tecnologia 5G",
            "internet das coisas",
            "automação",
            "robótica",
            "veículos autônomos",
            "processamento de linguagem natural",
            "chatbots",
            "assistentes virtuais",
            "reconhecimento de voz",
            "reconhecimento de imagem",
            "segurança cibernética",
            "criptografia",
            "análise preditiva",
            "cloud computing",
            "computação em nuvem",
            "serviços web",
            "microserviços",
            "arquitetura de software",
            "desenvolvimento ágil",
            "metodologias ágeis",
            "DevOps",
            "integração contínua",
            "entrega contínua",
            "contêineres Docker",
            "orquestração Kubernetes",
            "servidores web",
            "bancos de dados SQL",
            "bancos de dados NoSQL",
            "sistemas operacionais",
            "Linux",
            "Windows",
            "macOS",
            "programação em C",
            "programação em C++",
            "programação em Java",
            "programação em Ruby",
            "programação em Swift",
            "programação em Kotlin",
            "programação em Go",
            "programação em R",
            "programação em MATLAB",
            "desenvolvimento frontend",
            "desenvolvimento backend",
            "frameworks JavaScript",
            "React",
            "Angular",
            "Vue.js",
            "Node.js",
            "Express.js",
            "Django",
            "Flask",
            "Spring Boot",
            "Laravel",
            "Ruby on Rails",
            "ASP.NET",
            "sistemas embarcados",
            "IoT",
            "sensorização",
            "atuadores",
            "protocolo MQTT",
            "inteligência artificial em saúde",
            "IA em finanças",
            "IA em marketing",
            "IA em manufatura",
            "tecnologia blockchain em finanças",
            "contratos inteligentes",
            "tokens não fungíveis (NFTs)",
            "criptomoedas",
            "mineração de dados",
            "aprendizado de máquina supervisionado",
            "aprendizado de máquina não supervisionado",
            "reforço de aprendizado",
            "tecnologias emergentes",
            "transformação digital",
            "computação quântica"
        ];
        return opcoes.filter((opcao) => opcao.toLowerCase().includes(value.toLowerCase()));
    };

    const pesquisarPost = () => {
        navigate(`/search/${frase}`);
    };

    return (
        <div className="caixaLateral">
            <div className="inputWrapper">
                <input
                    type="search"
                    id="pesquisa"
                    placeholder="Procura"
                    value={frase}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                />
                {frase.length > 0 && sugestoes.length > 0 && (
                    <div className="sugestoes">
                        {sugestoes.map((sugestao, index) => (
                            <div key={index} className="sugestaoItem" onClick={() => setFrase(sugestao)}>
                                {sugestao}
                            </div>
                        ))}
                    </div>
                )}
                {frase.length > 0 && (
                    <div className="lebelProcura">
                        <p><span onClick={handleSearch} className="material-symbols-outlined">search</span></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Busca;
