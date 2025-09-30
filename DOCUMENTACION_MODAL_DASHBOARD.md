# 📋 Modal de Creación de Entidades en Dashboard

## 🎯 Descripción General
Se ha implementado un modal completo en el dashboard administrativo que permite crear nuevas entidades directamente desde la interfaz de administración, incluyendo selección de ubicación en mapa interactivo.

## ✨ Características Implementadas

### 🎨 Interfaz de Usuario
- **Modal responsivo** con diseño moderno y profesional
- **Formulario por secciones** organizadas temáticamente
- **Mapa interactivo** para selección de ubicación
- **Validaciones en tiempo real** con feedback visual
- **Notificaciones** con SweetAlert2
- **Animaciones suaves** para mejorar UX

### 📝 Secciones del Formulario
1. **Información Básica**
   - Clase de Entidad (Empresa, Estado, Sociedad, Academia)
   - Razón Social
   - Número de Identificación
   - Tipo de Entidad
   - Naturaleza Jurídica
   - Actividad Económica

2. **Información de Contacto**
   - Correo Electrónico
   - Teléfono
   - Fecha de Constitución
   - Logo (upload de archivo)

3. **Ubicación**
   - Departamento (carga dinámica)
   - Ciudad (filtrado por departamento)
   - Dirección completa
   - **Mapa interactivo** para coordenadas exactas
   - Campos de latitud y longitud (auto-completados)

4. **Redes Sociales**
   - Facebook
   - Instagram
   - Página Web

5. **Contacto Principal**
   - Nombre completo
   - Cargo (carga dinámica)
   - Correo del contacto
   - Teléfono del contacto

## 🗂️ Archivos Modificados/Creados

### 📄 HTML
**`app/pages/admin/dashboard.html`**
- ✅ Agregados botones "Nueva Entidad" en tarjetas
- ✅ Modal completo con formulario estructurado
- ✅ Inclusión de librerías (Leaflet, SweetAlert2, Font Awesome)

### 🎨 CSS
**`app/public/styles/dashboard.css`**
- ✅ Estilos del modal y formulario
- ✅ Diseño responsivo para móviles
- ✅ Animaciones y efectos visuales
- ✅ Estilos específicos del mapa
- ✅ Botones de acción rápida en tarjetas

### 🔧 JavaScript
**`app/public/js/dashboard-modal-entidad.js`**
- ✅ Gestión completa del modal
- ✅ Inicialización del mapa con Leaflet
- ✅ Carga dinámica de departamentos/ciudades/cargos
- ✅ Validaciones del formulario
- ✅ Manejo de coordenadas del mapa
- ✅ Envío de datos a la API

## 🔗 Dependencias

### 📚 Librerías Frontend
```html
<!-- Font Awesome para iconos -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

<!-- SweetAlert2 para notificaciones -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<!-- Leaflet.js para mapas -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
```

### 🛠️ APIs Utilizadas
- `GET /api/departamentos` - Lista de departamentos
- `GET /api/ciudades/departamento/{id}` - Ciudades por departamento
- `GET /api/cargos` - Lista de cargos disponibles
- `POST /api/entidad/crear` - Creación de nueva entidad

## 🚀 Cómo Usar

### Para el Administrador:
1. **Acceder al dashboard**: Ir a `/admin/dashboard`
2. **Abrir modal**: Hacer clic en "Nueva Entidad" en la tarjeta de Entidades
3. **Completar formulario**: Llenar las secciones paso a paso
4. **Seleccionar ubicación**: Hacer clic en el mapa para establecer coordenadas
5. **Crear entidad**: Hacer clic en "Crear Entidad"

### Flujo de Trabajo:
```
Dashboard → Clic "Nueva Entidad" → Modal se abre → 
Completar formulario → Seleccionar en mapa → 
Enviar → Validación → Creación → Confirmación → 
Modal se cierra → Actualización automática
```

## 🎯 Funcionalidades Avanzadas

### 🗺️ Mapa Interactivo
- **Ubicación inicial**: Bucaramanga (7.1193, -73.1227)
- **Zoom**: Nivel 13 (vista de ciudad)
- **Marcador**: Rojo personalizado con popup informativo
- **Coordenadas automáticas**: Se llenan al hacer clic
- **Validación**: Rangos geográficos válidos

### ✅ Validaciones
- **Campos obligatorios**: Validación HTML5 + JavaScript
- **Coordenadas**: Completitud y rangos válidos
- **Archivos**: Solo imágenes para logo
- **URLs**: Formato válido para redes sociales
- **Email**: Formato válido

### 📱 Responsive Design
- **Móviles**: Formulario en una columna
- **Tablets**: Formulario adaptado
- **Desktop**: Dos columnas para optimizar espacio
- **Modal**: Se ajusta al 90% del viewport en móviles

## 🔧 Configuración Técnica

### Variables de Entorno
```javascript
// En config.js debe estar definido:
const API_BASE_URL = 'http://localhost:4000';
```

### Cookies Necesarias
- `userId`: ID del usuario administrador para asociar la entidad

### Estructura de Datos Enviados
```javascript
FormData {
  // Información básica
  claseEntidad: "Empresa",
  razonSocial: "Mi Empresa SAS",
  numIdentificacion: "901234567-8",
  tipoEntidad: "Sociedad Anónima",
  naturalezaJuridica: "Privada",
  actividadEconomica: "Desarrollo de software",
  
  // Contacto
  correo: "contacto@empresa.com",
  telefono: "3001234567",
  fechaConstitucion: "2020-01-15",
  logo: File, // Archivo subido
  
  // Ubicación
  departamento: "28", // ID
  ciudadId: "915", // ID
  direccion: "Carrera 27 #34-45",
  latitud: "7.1193",
  longitud: "-73.1227",
  
  // Redes sociales
  facebook: "https://facebook.com/empresa",
  instagram: "https://instagram.com/empresa",
  paginaweb: "https://empresa.com",
  
  // Contacto principal
  nombreContacto: "Juan Pérez",
  cargoId: "1", // ID
  correoContacto: "juan@empresa.com",
  telefonoContacto: "3007654321",
  
  // Sistema
  UserAdminId: "1" // ID del usuario admin
}
```

## 📊 Respuesta del Backend
```javascript
{
  "message": "Entidad creada con éxito",
  "entidad": { /* datos de la entidad */ },
  "ubicacionCreada": true // indica si se guardó la ubicación
}
```

## 🐛 Manejo de Errores

### Frontend
- Validaciones antes del envío
- Mensajes específicos por tipo de error
- Mantener datos del formulario en caso de error
- Deshabilitar botón durante envío

### Backend
- Validación de coordenadas opcionales
- Manejo de errores de base de datos
- Respuestas con códigos HTTP apropiados

## 🔮 Mejoras Futuras

### Funcionalidades Planeadas
- [ ] **Vista previa del logo** antes de subir
- [ ] **Geocodificación** por dirección
- [ ] **Múltiples ubicaciones** por entidad
- [ ] **Plantillas** para diferentes tipos de entidad
- [ ] **Importación masiva** desde Excel/CSV
- [ ] **Verificación de ubicaciones** manual
- [ ] **Integración con Google Maps**

### Optimizaciones
- [ ] Lazy loading del mapa
- [ ] Compresión automática de imágenes
- [ ] Cache de departamentos/ciudades
- [ ] Modo offline para formulario

## 📝 Notas de Desarrollo

### Compatibilidad
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers

### Performance
- Inicialización diferida del mapa
- Carga asíncrona de datos
- Validación eficiente
- Cleanup automático de recursos

### Seguridad
- Validación tanto frontend como backend
- Sanitización de archivos subidos
- Validación de tipos MIME
- Protección CSRF implícita con FormData

---

## 🎉 Resultado Final

El modal implementado proporciona una experiencia completa y profesional para la creación de entidades desde el dashboard administrativo, con:

- ✅ **Interfaz moderna** y responsive
- ✅ **Mapa interactivo** para ubicación precisa
- ✅ **Validaciones robustas** en tiempo real
- ✅ **Carga dinámica** de datos relacionados
- ✅ **Feedback visual** apropiado
- ✅ **Integración completa** con backend existente

**🚀 La funcionalidad está lista para uso en producción.**
