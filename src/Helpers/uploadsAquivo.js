const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadImg = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve('./src/public/sever'));
        },
        filename: (req, file, cb) => {
            const time = new Date().getTime();
            cb(null, `${time}-${file.originalname}`);
        }
    }),
    fileFilter: (req, file, cb) => {
        const extImg = ['image/png', 'image/jpg', 'image/jpeg'].find(formatoAceito => formatoAceito == file.mimetype);
        if (extImg) {
            return cb(null, true);
        }
        return cb(null, false);
    }
});

function apagarImagem(caminho) {
    const caminhoDaImagem= `src\\${caminho}`.replace(/\\/g, '\\\\')

    if (fs.existsSync(caminhoDaImagem)) {
        fs.unlinkSync(caminhoDaImagem);
    } 
    
}

module.exports = { uploadImg, apagarImagem };

