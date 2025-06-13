import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Mi API',
    version: '1.0.0',
    description: 'Documentación de mi API con Swagger',
  },
  servers: [
    {
      url: '/api-docs',
    },
  ],
};


const options = {
  swaggerDefinition,
  apis: ['../routes/index.js', '/swaggerSchematics.js'], // Aquí agregas tu archivo de esquemas
};
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
