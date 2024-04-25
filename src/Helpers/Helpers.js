const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// Middleware para verificar o ID do usuário no cookie
const verIdUser = (req, res, next) => {
    // Obtém o token de autorização do cookie
    const token = req.cookies.tokenAutorization;

    // Se o token estiver presente
    if (token) {
        try {
            // Decodifica o token para obter os dados do usuário, neste caso, o ID do usuário
            const decoded = jwt.verify(token, 'SEU_SEGREDO_JWT');

            // Adiciona o ID do usuário ao objeto de solicitação (req) para uso posterior em outros middlewares ou controladores
            req.userId = decoded.id;

            // Chama o próximo middleware na cadeia
            next();
        } catch (error) {
            console.error('Erro ao verificar o token:', error.message);
            res.status(401).json({ message: 'Token inválido' });
        }
    } else {
        // Se não houver token presente no cookie, retorna um erro de não autorizado
        res.status(401).json({ message: 'Token não fornecido' });
    }
};

module.exports = {
    verIdUser
};
