// app/config/multerConfig.js

import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

// Función para crear carpetas si no existen
const ensureDirExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir;

    switch (file.fieldname) {
      case 'video':
        dir = 'app/public/videos';
        break;
      case 'ficha':
        dir = 'app/public/fichas';
        break;
      case 'recurso':
        dir = 'app/public/recursos';
        break;
      case 'temario':
        dir = 'app/public/temario';
        break;
      case 'videoCursos':
        dir = 'app/public/videoCursos';
        break;
      case 'fotoPerfil':
        dir = 'app/public/photo';
        console.log("Directorio de foto de perfil:", dir);
        break;
      default:
        if (file.fieldname.startsWith('file')) {
          const retoId = req.body['challenge-id'] || 'defaultReto';
          dir = path.join('app/public/datosRetos', retoId);
        } else {
          dir = 'app/public/logos';
        }
        break;
    }

    ensureDirExists(dir);
    cb(null, dir);
  },

  filename: (req, file, cb) => {
    const uniqueId = req.body.id || uuidv4();
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uniqueId}${ext}`);
  }
});

// Filtro de tipos permitidos
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|mp4|pdf/;
  const extOk = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeOk = allowedTypes.test(file.mimetype);

  if (extOk && mimeOk) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo imágenes, MP4 o PDF.'));
  }
};

// Middleware Multer final
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

export default upload;
