import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para generar figuras aleatorias
function getRandomShape(numero) {
    const shapes = [
        // Círculos
        (color) => `<circle cx="30" cy="25" r="12" fill="white" opacity="0.8"/>
                    <circle cx="50" cy="25" r="8" fill="white" opacity="0.6"/>`,
        
        // Rectángulos
        (color) => `<rect x="20" y="15" width="20" height="20" fill="white" opacity="0.8" rx="3"/>
                    <rect x="45" y="20" width="15" height="15" fill="white" opacity="0.6"/>`,
        
        // Triángulos
        (color) => `<polygon points="30,15 20,35 40,35" fill="white" opacity="0.8"/>
                    <polygon points="55,20 50,30 60,30" fill="white" opacity="0.6"/>`,
        
        // Estrellas
        (color) => `<polygon points="30,15 33,24 42,24 35,30 38,39 30,33 22,39 25,30 18,24 27,24" fill="white" opacity="0.8"/>`,
        
        // Hexágonos
        (color) => `<polygon points="30,15 40,20 40,30 30,35 20,30 20,20" fill="white" opacity="0.8"/>`,
        
        // Diamantes
        (color) => `<polygon points="30,15 40,25 30,35 20,25" fill="white" opacity="0.8"/>
                    <polygon points="55,20 60,25 55,30 50,25" fill="white" opacity="0.6"/>`
    ];
    
    // Usar el número de empresa como seed para consistencia
    const index = (numero - 1) % shapes.length;
    return shapes[index];
}

// Función para generar patrón de líneas aleatorio
function getRandomPattern(numero, color) {
    const patterns = [
        // Líneas horizontales
        () => `<rect x="45" y="20" width="60" height="4" fill="white" opacity="0.9"/>
               <rect x="45" y="28" width="45" height="3" fill="white" opacity="0.7"/>`,
        
        // Líneas verticales
        () => `<rect x="50" y="15" width="3" height="25" fill="white" opacity="0.8"/>
               <rect x="58" y="18" width="3" height="20" fill="white" opacity="0.6"/>`,
        
        // Puntos
        () => `<circle cx="50" cy="22" r="3" fill="white" opacity="0.9"/>
               <circle cx="60" cy="22" r="3" fill="white" opacity="0.9"/>
               <circle cx="70" cy="22" r="3" fill="white" opacity="0.9"/>`,
        
        // Líneas diagonales
        () => `<line x1="45" y1="20" x2="70" y2="30" stroke="white" stroke-width="3" opacity="0.8"/>
               <line x1="45" y1="28" x2="65" y2="35" stroke="white" stroke-width="2" opacity="0.6"/>`,
        
        // Cuadrícula
        () => `<rect x="45" y="18" width="8" height="8" fill="white" opacity="0.7"/>
               <rect x="56" y="18" width="8" height="8" fill="white" opacity="0.5"/>
               <rect x="45" y="28" width="8" height="8" fill="white" opacity="0.5"/>`,
        
        // Ondas
        () => `<path d="M 45 25 Q 52 20, 59 25 T 73 25" stroke="white" stroke-width="3" fill="none" opacity="0.8"/>`
    ];
    
    const index = Math.floor(numero / 2) % patterns.length;
    return patterns[index]();
}

// Función para crear un logo SVG único
function createFictitiousLogo(departamento, numero, color) {
    const nombreCorto = departamento.replace(/\s+/g, '').substring(0, 8);
    const shapeFunction = getRandomShape(numero);
    const pattern = getRandomPattern(numero, color);
    
    const svg = `
<svg width="120" height="80" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="grad${departamento}${numero}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${adjustColor(color, -30)};stop-opacity:1" />
        </linearGradient>
    </defs>
    <rect width="120" height="80" fill="url(#grad${departamento}${numero})" rx="8"/>
    ${shapeFunction(color)}
    ${pattern}
    <text x="15" y="55" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white">
        ${nombreCorto}
    </text>
    <text x="15" y="70" font-family="Arial, sans-serif" font-size="8" fill="white" opacity="0.8">
        Empresa ${numero}
    </text>
</svg>`;
    
    return svg;
}

// Función para ajustar el color
function adjustColor(color, amount) {
    const usePound = color[0] === "#";
    const col = usePound ? color.slice(1) : color;
    const num = parseInt(col, 16);
    let r = (num >> 16) + amount;
    let g = (num >> 8 & 0x00FF) + amount;
    let b = (num & 0x0000FF) + amount;
    r = r > 255 ? 255 : r < 0 ? 0 : r;
    g = g > 255 ? 255 : g < 0 ? 0 : g;
    b = b > 255 ? 255 : b < 0 ? 0 : b;
    return (usePound ? "#" : "") + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
}

// Colores para cada departamento
const coloresDepartamentos = {
    'amazonas': '#228B22',
    'antioquia': '#FF6B35',
    'arauca': '#4169E1',
    'atlantico': '#00CED1',
    'bolivar': '#FFD700',
    'boyaca': '#32CD32',
    'caldas': '#DC143C',
    'caqueta': '#8FBC8F',
    'casanare': '#DAA520',
    'cauca': '#9370DB',
    'cesar': '#FF8C00',
    'choco': '#2E8B57',
    'cordoba': '#B22222',
    'cundinamarca': '#4682B4',
    'guainia': '#20B2AA',
    'guaviare': '#87CEEB',
    'huila': '#CD853F',
    'laguajira': '#F0E68C',
    'magdalena': '#48D1CC',
    'meta': '#98FB98',
    'narino': '#DDA0DD',
    'nortesantander': '#F4A460',
    'putumayo': '#90EE90',
    'quindio': '#FFB6C1',
    'risaralda': '#FFA07A',
    'sanandres': '#87CEFA',
    'santander': '#D2691E',
    'sucre': '#F5DEB3',
    'tolima': '#FA8072',
    'valledelcauca': '#9ACD32',
    'vaupes': '#40E0D0',
    'vichada': '#EE82EE'
};

// Crear logos para cada departamento
Object.keys(coloresDepartamentos).forEach(departamento => {
    const color = coloresDepartamentos[departamento];
    
    for (let i = 1; i <= 6; i++) {
        const logoSvg = createFictitiousLogo(departamento, i, color);
        const fileName = `${departamento}${i}.svg`;
        const filePath = path.join(__dirname, '..', 'public', 'img', fileName);
        
        fs.writeFileSync(filePath, logoSvg);
        console.log(`✅ Creado: ${fileName}`);
    }
});

// Crear logos por defecto
for (let i = 1; i <= 6; i++) {
    const logoSvg = createFictitiousLogo('Empresa', i, '#6C5CE7');
    const fileName = `empresa${i}.svg`;
    const filePath = path.join(__dirname, '..', 'public', 'img', fileName);
    
    fs.writeFileSync(filePath, logoSvg);
    console.log(`✅ Creado: ${fileName}`);
}

console.log('🎉 ¡Todos los logos han sido creados exitosamente!');