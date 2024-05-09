require("dotenv").config();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

async function verificarLogin(req, res, next) {
    const headerToken = req.headers.authorization; 
    console.log(headerToken);
    if (!headerToken) {
        return res.status(401).json({ error: 'Token de autorização ausente' });
    }

    const token = headerToken.split(' ')[1]; 

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            console.error('Erro ao verificar o token:', err);
            return res.status(401).json({ error: 'Token inválido' });
        } else {
            // Se o token for válido, você pode acessar os dados decodificados em decoded
            // Por exemplo: decoded.userId para o ID do usuário, etc.
            req.userId = decoded.userId; // Adiciona o ID do usuário ao objeto de solicitação (opcional)
            next(); // Chama o próximo middleware na cadeia
        }
    });
}

module.exports = { verificarLogin };