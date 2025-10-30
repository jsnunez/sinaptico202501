import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const verCoordenadas = async (req, res) => {
    try {
        
        const filePath = path.join(__dirname, '../public/mapa/coordenadas.json');
        const data = await fs.readFile(filePath, 'utf-8');
        const coordenadas = JSON.parse(data);

        res.status(200).json({
            success: true,
            data: coordenadas
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al procesar coordenadas',
            error: error.message
        });
    }
};
