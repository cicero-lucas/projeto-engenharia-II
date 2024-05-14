require("dotenv").config();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

async function verificarLogin(req, res, next) {
    const headerToken = req.headers.authorization; 
    
    if (!headerToken) {
        return res.status(401).json({ error: 'Token de autorização ausente' });
    }

    const token = headerToken.split(' ')[1]; 

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            console.error('Erro ao verificar o token:', err);
            return res.status(401).json({ error: 'Token inválido' });
        } else {
            const decodedToken = jwt.decode(token);
            const id = decodedToken.iduser;
            req.userId = id;
            next(); 
        }
    });
}

module.exports = { verificarLogin };