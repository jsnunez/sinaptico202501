import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentación API',
    version: '1.0.0',
    description: 'API documentada con Swagger',
  },
  servers: [
    {
      url: 'http://localhost:4000',
    },
  ],
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  swaggerDefinition,
  apis: [
    path.join(__dirname, '../routes/**/*.js'),
    path.join(__dirname, '../swagger/*.js')
  ]
};

console.log('Swagger will look for API docs in:', options.apis);

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
