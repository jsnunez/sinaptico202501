# 📍 Funcionalidad de Selección de Ubicación en Mapa

## 🎯 Descripción
Se ha implementado una nueva funcionalidad que permite a los usuarios seleccionar la ubicación exacta de su entidad directamente en un mapa interactivo durante el proceso de creación.

## ✨ Características

### 🗺️ Mapa Interactivo
- **Librería**: Leaflet.js
- **Proveedor de mapas**: OpenStreetMap
- **Ubicación inicial**: Bucaramanga, Santander (7.1193, -73.1227)
- **Zoom inicial**: Nivel 13 (vista de ciudad)

### 🎯 Selección de Ubicación
- **Método**: Clic en el mapa
- **Marcador**: Rojo con ícono personalizado
- **Popup informativo**: Muestra coordenadas seleccionadas
- **Actualización automática**: Los campos de latitud y longitud se llenan automáticamente

### ✅ Validaciones
- **Coordenadas opcionales**: No es obligatorio seleccionar ubicación
- **Validación de completitud**: Si se proporciona una coordenada, ambas son requeridas
- **Validación de rango**: Latitud [-90, 90], Longitud [-180, 180]
- **Validación de formato**: Solo números válidos

## 🔧 Archivos Modificados

### 1. Frontend
- **`app/public/js/formularios.js`**
  - Agregado campo de mapa en el formulario
  - Funciones de inicialización del mapa
  - Manejo de eventos de clic en el mapa
  - Gestión de marcadores y popups

- **`app/public/js/enviarformulario.js`**
  - Validaciones de coordenadas
  - Mensajes de éxito mejorados
  - Limpieza del mapa después del envío

- **`app/public/styles/stylehelice2.css`**
  - Estilos para el contenedor del mapa
  - Estilos para campos de coordenadas
  - Animaciones y efectos visuales

- **`app/pages/User/helice.html`**
  - Inclusión de Leaflet.js CSS y JavaScript

### 2. Backend
- **`app/controllers/entidadController.js`**
  - Manejo de coordenadas en `crearEntidad`
  - Creación automática de `UbicacionEntidad`
  - Respuesta mejorada con confirmación de ubicación

### 3. Dependencias
- **Leaflet.js 1.9.4**: Librería de mapas interactivos
- **OpenStreetMap**: Proveedor de tiles de mapa

## 🚀 Cómo Usar

### Para el Usuario Final:
1. **Abrir formulario**: Hacer clic en "Crear Actor" en la página principal
2. **Llenar datos básicos**: Completar información de la entidad
3. **Seleccionar ubicación**: 
   - Buscar la sección "Ubicación en el Mapa"
   - Hacer clic en el punto exacto del mapa donde se encuentra la entidad
   - Verificar que las coordenadas aparezcan en los campos de latitud y longitud
4. **Enviar formulario**: Las coordenadas se guardarán automáticamente

### Para el Desarrollador:
```javascript
// Inicializar mapa después de cargar formulario
cargarFormulario();
initMapAfterFormLoad();

// Acceder a las coordenadas seleccionadas
const lat = document.getElementById('latitud').value;
const lng = document.getElementById('longitud').value;
```

## 📦 Estructura de Datos

### Campos del Formulario
```javascript
{
  // ... otros campos de entidad
  latitud: "7.123456",      // Decimal, opcional
  longitud: "-73.654321",   // Decimal, opcional
  direccion: "Carrera 27 #34-45" // Texto de dirección
}
```

### Modelo UbicacionEntidad
```javascript
{
  entidadId: 1,                    // FK a Entidad
  latitud: 7.123456,               // Decimal(10,6)
  longitud: -73.654321,            // Decimal(10,6)
  direccionCompleta: "...",        // Texto de dirección
  activa: true,                    // Boolean
  verificada: false                // Boolean (para verificación posterior)
}
```

## 🔄 Flujo de Datos

1. **Frontend**: Usuario hace clic en el mapa
2. **JavaScript**: Captura coordenadas y actualiza campos
3. **Validación**: Verifica formato y rangos de coordenadas
4. **Envío**: FormData incluye latitud y longitud
5. **Backend**: Controller crea entidad y ubicación
6. **Base de datos**: Se guardan ambos registros
7. **Respuesta**: Confirmación con estado de ubicación

## 🎨 Experiencia de Usuario

### Indicadores Visuales
- **Mapa responsivo**: Se adapta al tamaño del modal
- **Marcador rojo**: Indica ubicación seleccionada
- **Campos resaltados**: Coordenadas aparecen con fondo verde
- **Popup informativo**: Muestra coordenadas al seleccionar
- **Notificaciones**: SweetAlert2 para feedback inmediato

### Comportamiento
- **Opcional**: La ubicación no es obligatoria
- **Limpieza automática**: El mapa se resetea después del envío
- **Validación en tiempo real**: Errores mostrados inmediatamente
- **Redimensionamiento**: El mapa se ajusta al abrir el modal

## 🐛 Manejo de Errores

### Validaciones Frontend
- Coordenadas incompletas
- Formato de números inválido
- Coordenadas fuera de rango geográfico

### Validaciones Backend
- Parsing de coordenadas decimales
- Manejo de campos opcionales
- Creación transaccional de entidad y ubicación

### Recuperación de Errores
- Mensajes claros para el usuario
- Mantener datos del formulario en caso de error
- Logging en consola para debugging

## 🔮 Funcionalidades Futuras

### Mejoras Planeadas
- **Geocodificación**: Búsqueda por dirección
- **Geolocalización**: Detectar ubicación automáticamente
- **Múltiples ubicaciones**: Soporte para varias sedes
- **Verificación**: Proceso de validación de ubicaciones
- **Mapas satélite**: Diferentes tipos de vista
- **Clustering**: Agrupación de entidades cercanas

### Integraciones Potenciales
- Google Maps API
- Mapbox
- Sistema de verificación manual
- Notificaciones de ubicaciones cercanas

## 📝 Notas Técnicas

### Rendimiento
- Inicialización diferida del mapa
- Limpieza de recursos al cerrar modal
- Optimización de redimensionamiento

### Compatibilidad
- Navegadores modernos con soporte para ES6
- Responsive design para dispositivos móviles
- Fallback para navegadores sin geolocalización

### Seguridad
- Validación tanto frontend como backend
- Sanitización de coordenadas
- Prevención de inyección de datos maliciosos

---

**📧 Soporte**: Para problemas o mejoras, contactar al equipo de desarrollo.
**📅 Versión**: 1.0.0 - Agosto 2025
