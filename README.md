# SinAptico 2025 - Sistema de Gestión de Convocatorias

![SinAptico Logo](https://via.placeholder.com/300x100/3498db/ffffff?text=SinAptico+2025)

## 📋 Descripción del Proyecto

**SinAptico 2025** es una plataforma integral de gestión de convocatorias de innovación y Sociedad desarrollada para facilitar el proceso completo desde la creación de convocatorias hasta la evaluación y seguimiento de proyectos. El sistema está diseñado para ser utilizado por cámaras de comercio, entidades públicas y organizaciones que manejan fondos de financiamiento para proyectos de innovación.

## 🎯 Características Principales

### 🏛️ Para Administradores (CCB, CRCI, CCCS, CCMED)
- **Creación de Convocatorias**: Herramientas completas para diseñar y publicar convocatorias
- **Gestión de Colaboradores**: Sistema para invitar y gestionar evaluadores
- **Evaluación de Propuestas**: Interface completa para evaluar y aprobar/rechazar propuestas
- **Seguimiento de Proyectos**: Monitoreo del progreso de proyectos aprobados
- **Reportes y Analytics**: Estadísticas y métricas del desempeño

### 👥 Para Proponentes y Empresas
- **Exploración de Convocatorias**: Catálogo completo de oportunidades de financiamiento
- **Formulación de Propuestas**: Sistema paso a paso para crear propuestas
- **Gestión de Alianzas**: Herramientas para articular proponentes, aliados y beneficiarios
- **Seguimiento en Tiempo Real**: Monitoreo del estado de las propuestas radicadas
- **Comunicación Directa**: Sistema de comentarios y consultas

## 🗂️ Estructura del Proyecto

```
sinaptico2025/
├── app.js                          # Servidor principal de la aplicación
├── package.json                    # Dependencias y configuración del proyecto
├── README.md                       # Documentación del proyecto
├── app/
│   ├── index.js                    # Punto de entrada de la aplicación
│   ├── config/                     # Configuraciones
│   │   ├── database.js             # Configuración de base de datos
│   │   ├── swaggerConfig.js        # Configuración de documentación API
│   │   └── multerConfig.js         # Configuración de carga de archivos
│   ├── controllers/                # Controladores de la aplicación
│   │   ├── convocatoriaController.js
│   │   ├── userController.js
│   │   ├── proyectoController.js
│   │   └── ...
│   ├── models/                     # Modelos de datos
│   │   ├── convocatoria.js
│   │   ├── proyecto.js
│   │   ├── user.js
│   │   └── associations.js
│   ├── routes/                     # Rutas de la API
│   │   ├── convocatoriaRoutes.js
│   │   ├── userRoutes.js
│   │   └── ...
│   ├── middlewares/               # Middlewares de autenticación y autorización
│   │   └── authorization.js
│   ├── pages/                     # Páginas web del sistema
│   │   ├── admin/                 # Páginas administrativas
│   │   │   ├── crear-convocatoria.html
│   │   │   ├── convocatorias-disponibles.html
│   │   │   ├── evaluar-propuestas.html
│   │   │   ├── proyectos-radicados.html
│   │   │   ├── proyectos-ejecucion.html
│   │   │   └── ficha-formulacion.html
│   │   └── user/                  # Páginas de usuario
│   └── public/                    # Recursos estáticos
│       ├── styles/
│       ├── js/
│       ├── img/
│       └── ...
```

## 🚀 Funcionalidades del Sistema

### 1. 📝 Gestión de Convocatorias

#### Creación de Convocatorias (`crear-convocatoria.html`)
- **Información Básica**: Título, descripción, objetivos, fechas
- **Configuración Financiera**: Presupuesto total, monto máximo por proyecto
- **Criterios de Evaluación**: Definición de criterios y ponderaciones
- **Gestión de Colaboradores**: Invitación y roles de evaluadores
- **Articulación de Actores**: Vinculación de aliados estratégicos
- **Vista Previa**: Previsualización antes de publicar

#### Exploración de Convocatorias (`convocatorias-disponibles.html`)
- **Catálogo Completo**: Vista de todas las convocatorias disponibles
- **Filtros Avanzados**: Por entidad, tipo, estado, fecha
- **Información Detallada**: Modal con información completa
- **Sistema de Interés**: Manifestación de interés y notificaciones
- **Comentarios**: Sistema de consultas y respuestas
- **Acceso a Formulación**: Redirección directa a formulario de propuesta

### 2. 📋 Gestión de Propuestas

#### Formulación de Propuestas (`ficha-formulacion.html`)
- **Wizard de 4 Pasos**: Proceso guiado paso a paso
- **Información del Proyecto**: Datos técnicos y descriptivos
- **Gestión de Participantes**: Proponentes, aliados y beneficiarios
- **Presupuesto Dinámico**: Cálculo automático y distribución
- **Cronograma**: Planificación temporal de actividades
- **Carga de Documentos**: Sistema de archivos con validación
- **Declaraciones Legales**: Compromisos y autorizaciones
- **Radicación Automática**: Generación de número de radicado

#### Evaluación Administrativa (`evaluar-propuestas.html`)
- **Dashboard de Estadísticas**: Métricas en tiempo real
- **Tabla de Propuestas**: Vista completa de todas las propuestas
- **Filtros Administrativos**: Por estado, convocatoria, prioridad
- **Sistema de Evaluación**: Criterios ponderados con puntajes
- **Acciones de Decisión**: Aprobar, rechazar, solicitar ajustes
- **Historial de Seguimiento**: Trazabilidad completa
- **Exportación de Datos**: Reportes en múltiples formatos

### 3. 📊 Seguimiento y Monitoreo

#### Proyectos Radicados (`proyectos-radicados.html`)
- **Estados de Propuestas**: Seguimiento del proceso de evaluación
- **Timeline de Evaluación**: Cronograma de revisión
- **Documentación**: Gestión de documentos complementarios
- **Comunicación**: Sistema de mensajes con evaluadores

#### Proyectos en Ejecución (`proyectos-ejecucion.html`)
- **Monitoreo de Progreso**: Barras de progreso y hitos
- **Gestión de Entregables**: Seguimiento de deliverables
- **Equipos de Trabajo**: Información de participantes
- **Indicadores de Desempeño**: Métricas de éxito

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica moderna
- **CSS3**: Diseño responsive con Grid y Flexbox
- **JavaScript ES6+**: Interactividad y manipulación del DOM
- **SweetAlert2**: Notificaciones y modales elegantes

### Backend (Preparado para)
- **Node.js**: Runtime de JavaScript
- **Express.js**: Framework web
- **Sequelize**: ORM para base de datos
- **MySQL/PostgreSQL**: Base de datos relacional
- **Swagger**: Documentación de API

### Características Técnicas
- **Responsive Design**: Adaptable a móviles y tablets
- **Progressive Web App**: Funcionalidades offline
- **Validación Cliente/Servidor**: Seguridad en capas
- **Upload de Archivos**: Soporte para múltiples formatos
- **Filtros Dinámicos**: Búsqueda en tiempo real

## 📱 Responsive Design

El sistema está completamente optimizado para dispositivos móviles:
- **Breakpoints**: 768px, 1024px, 1200px
- **Grid Adaptativo**: Columnas que se ajustan automáticamente
- **Menús Móviles**: Navegación optimizada para touch
- **Formularios Táctiles**: Inputs y controles touch-friendly

## 🔒 Seguridad

### Medidas Implementadas
- **Validación de Datos**: Cliente y servidor
- **Sanitización**: Limpieza de inputs
- **Autenticación**: Sistema de login seguro
- **Autorización**: Roles y permisos granulares
- **HTTPS**: Encriptación en tránsito
- **Protección CSRF**: Tokens de seguridad

## 📊 Datos Ficticios para Demostración

El sistema incluye datos de demostración realistas:
- **67 Propuestas**: Con diferentes estados y características
- **12 Convocatorias**: De diversas entidades y tipos
- **Multiple Actores**: Proponentes, aliados, beneficiarios
- **Documentos Simulados**: Archivos de ejemplo
- **Timeline Realista**: Fechas y cronogramas coherentes

## 🚀 Instalación y Configuración

### Prerrequisitos
```bash
# Verificar versión de Node.js
node --version  # >= 14.x

# Verificar npm
npm --version   # >= 6.x
```

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/usuario/sinaptico2025.git

# Navegar al directorio
cd sinaptico2025

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Inicializar base de datos
npm run db:init

# Ejecutar migraciones
npm run db:migrate

# Cargar datos de ejemplo
npm run db:seed
```

### Ejecución
```bash
# Desarrollo
npm run dev

# Producción
npm start

# Pruebas
npm test
```

### URLs de Acceso
- **Aplicación Principal**: `http://localhost:3000`
- **Panel Administrativo**: `http://localhost:3000/admin`
- **API Docs**: `http://localhost:3000/api-docs`
- **Health Check**: `http://localhost:3000/health`

## 📋 Guía de Uso

### Para Administradores

1. **Crear Convocatoria**
   - Acceder a `crear-convocatoria.html`
   - Completar formulario de 6 secciones
   - Invitar colaboradores
   - Publicar convocatoria

2. **Evaluar Propuestas**
   - Acceder a `evaluar-propuestas.html`
   - Filtrar propuestas por criterios
   - Evaluar usando sistema de puntajes
   - Tomar decisión final

3. **Monitorear Proyectos**
   - Revisar `proyectos-radicados.html`
   - Supervisar `proyectos-ejecucion.html`
   - Generar reportes

### Para Proponentes

1. **Explorar Oportunidades**
   - Visitar `convocatorias-disponibles.html`
   - Filtrar por tipo de interés
   - Leer detalles completos
   - Manifestar interés

2. **Formular Propuesta**
   - Clic en "Formular Propuesta"
   - Completar `ficha-formulacion.html`
   - Cargar documentos requeridos
   - Radicar propuesta

3. **Hacer Seguimiento**
   - Usar número de radicado
   - Monitorear estado
   - Responder solicitudes

## 🔧 Configuración Avanzada

### Variables de Entorno
```env
# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_NAME=sinaptico2025
DB_USER=usuario
DB_PASSWORD=password

# Servidor
PORT=3000
NODE_ENV=development

# Archivos
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10MB

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=admin@sinaptico.com
SMTP_PASS=password

# JWT
JWT_SECRET=clave_secreta_jwt
JWT_EXPIRE=24h
```

### Configuración de Base de Datos
```javascript
// config/database.js
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: console.log
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false
  }
};
```

## 📈 Métricas y Analytics

### Indicadores Clave (KPIs)
- **Convocatorias Activas**: Número de convocatorias abiertas
- **Propuestas Recibidas**: Total de propuestas radicadas
- **Tasa de Aprobación**: Porcentaje de propuestas aprobadas
- **Tiempo de Evaluación**: Promedio de días para evaluar
- **Presupuesto Ejecutado**: Monto total de proyectos financiados
- **Satisfacción de Usuarios**: Rating promedio del sistema

### Reportes Disponibles
- **Reporte de Convocatorias**: Estado y estadísticas
- **Reporte de Propuestas**: Análisis de submissions
- **Reporte de Evaluadores**: Desempeño y productividad
- **Reporte Financiero**: Distribución de presupuestos
- **Reporte de Impacto**: Resultados de proyectos

## 🧪 Testing

### Pruebas Implementadas
```bash
# Pruebas unitarias
npm run test:unit

# Pruebas de integración
npm run test:integration

# Pruebas end-to-end
npm run test:e2e

# Cobertura de código
npm run test:coverage

# Pruebas de rendimiento
npm run test:performance
```

### Casos de Prueba
- **Formulario de Convocatoria**: Validación de campos
- **Sistema de Archivos**: Upload y validación
- **Evaluación**: Cálculo de puntajes
- **API Endpoints**: Respuestas y códigos de estado
- **Autenticación**: Login y permisos

## 🔄 CI/CD y Despliegue

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Deploy to server
        run: npm run deploy
```

### Docker Configuration
```dockerfile
# Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

## 📞 Soporte y Contacto

### Equipo de Desarrollo
- **Desarrollador Principal**: Sebastian
- **Email**: contacto@sinaptico.com
- **GitHub**: [@jsnunez](https://github.com/jsnunez)

### Reportar Issues
1. Ir a [GitHub Issues](https://github.com/jsnunez/sinaptico202501/issues)
2. Crear nuevo issue
3. Usar template apropiado
4. Incluir información de reprodución

### Contribuir
1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🏆 Reconocimientos

- **Cámaras de Comercio**: Por proporcionar los requerimientos
- **Comunidad Open Source**: Por las herramientas utilizadas
- **Usuarios Beta**: Por el feedback y pruebas

## 🔮 Roadmap Futuro

### Versión 2.0 (Q4 2025)
- [ ] **Mobile App**: Aplicación nativa iOS/Android
- [ ] **IA Integrada**: Evaluación automática con ML
- [ ] **Blockchain**: Trazabilidad inmutable de proyectos
- [ ] **API GraphQL**: Queries más eficientes
- [ ] **Microservicios**: Arquitectura distribuida

### Versión 2.1 (Q1 2026)
- [ ] **Multi-idioma**: Soporte para inglés y portugués
- [ ] **Integración Bancaria**: Pagos automatizados
- [ ] **Video Conferencia**: Reuniones integradas
- [ ] **Firma Digital**: Documentos legales electrónicos
- [ ] **Dashboard BI**: Analytics avanzados

## 📊 Changelog

### v1.0.0 (Julio 2025)
- ✅ Sistema completo de gestión de convocatorias
- ✅ Formulación y evaluación de propuestas
- ✅ Interface administrativa completa
- ✅ Sistema de seguimiento de proyectos
- ✅ 67 propuestas ficticias para demostración
- ✅ 12 convocatorias de ejemplo
- ✅ Sistema de archivos y documentos
- ✅ Responsive design completo

---

## 🎉 ¡Gracias por usar SinAptico 2025!

Este sistema representa el futuro de la gestión de convocatorias en Colombia, facilitando la innovación y el Sociedad a través de la tecnología.

**¿Tienes preguntas?** No dudes en contactarnos o crear un issue en GitHub.

**¿Te gusta el proyecto?** ¡Dale una ⭐ en GitHub!

---

*Desarrollado con ❤️ en Colombia para fortalecer el ecosistema de innovación nacional.*
