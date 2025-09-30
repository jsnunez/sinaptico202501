# 📍 Funcionalidad de Ubicación en Mapa - Sistema de Entidades

## 🎯 Resumen de Implementación

Se ha agregado la funcionalidad completa de ubicación en mapa para el sistema de gestión de entidades, permitiendo:

### ✨ Características Principales

#### 🗺️ **Mapa Interactivo**
- **Tecnología**: Leaflet + OpenStreetMap
- **Tamaño**: 300px de altura, responsive
- **Funcionalidad**: Clic para establecer ubicación
- **Zoom inteligente**: Se adapta según hay ubicación existente o no

#### 📍 **Indicadores Visuales**
- **En la tabla**: Icono 📍 verde si tiene ubicación, gris si no tiene
- **En el mapa**: Marcador con popup informativo
- **Coordenadas**: Campos de latitud y longitud (solo lectura)

#### 🔧 **Controles de Usuario**
- **"📍 Ubicar en el Mapa"**: Inicializa/muestra el mapa interactivo
- **"🗑️ Limpiar Ubicación"**: Elimina marcador y limpia coordenadas
- **Clic en mapa**: Establece nueva ubicación automáticamente

### 🚀 Flujo de Trabajo

#### **Para Entidades con Ubicación Existente:**
1. Al abrir el formulario de edición, se carga automáticamente la ubicación
2. Los campos de latitud/longitud se llenan automáticamente
3. Al hacer clic en "Ubicar en el Mapa", se muestra centrado en la ubicación actual
4. Se puede modificar haciendo clic en otra parte del mapa

#### **Para Entidades sin Ubicación:**
1. Los campos de coordenadas aparecen vacíos
2. Al hacer clic en "Ubicar en el Mapa", se muestra centrado en Bogotá
3. Se hace clic en el mapa para establecer la primera ubicación
4. Al guardar, se crea el registro en la tabla `UbicacionEntidad`

### 💾 Estructura de Base de Datos

#### **Tabla `UbicacionEntidad`:**
- `entidadId`: Referencia a la entidad
- `latitud`: Coordenada de latitud (DECIMAL 10,8)
- `longitud`: Coordenada de longitud (DECIMAL 11,8)
- `direccionCompleta`: Dirección textual opcional
- `activa`: Boolean para ubicaciones activas
- `verificada`: Boolean para ubicaciones verificadas
- `esUbicacionPrincipal`: Boolean para la ubicación principal

### 📡 APIs Utilizadas

#### **Backend - Consulta de Entidades:**
```
GET /api/entidad/entidades
```
Ahora incluye las ubicaciones con:
```javascript
include: [{
  model: UbicacionEntidad,
  as: 'ubicaciones',
  attributes: ['id', 'latitud', 'longitud', 'direccionCompleta', 'activa', 'verificada', 'esUbicacionPrincipal']
}]
```

#### **Backend - Actualización de Entidades:**
```
POST /api/entidad/editar/:id
```
Ahora acepta campos adicionales:
- `latitud`: Coordenada de latitud
- `longitud`: Coordenada de longitud

Automáticamente crea/actualiza registros en `UbicacionEntidad`.

#### **Backend - Consultas de Ubicación (respaldo):**
```
GET /api/ubicacion-entidad/entidad/:entidadId
```
Para consultas específicas de ubicación si es necesario.

### 🎨 Interfaz de Usuario

#### **Sección del Mapa en el Modal:**
```html
<div class="input-box" style="width: 100%;">
    <span>Ubicación en el Mapa</span>
    <div id="mapaEntidad" style="height: 300px; ..."></div>
    <div style="margin-top: 10px; display: flex; gap: 10px;">
        <input type="number" id="latitudEntidad" readonly>
        <input type="number" id="longitudEntidad" readonly>
    </div>
    <button type="button" id="btnUbicarEnMapa">📍 Ubicar en el Mapa</button>
    <button type="button" id="btnLimpiarUbicacion">🗑️ Limpiar Ubicación</button>
</div>
```

#### **Indicador en la Tabla:**
- ✅ 📍 Verde: Entidad con ubicación verificada
- ⚪ 📍 Gris: Entidad sin ubicación

### 🔍 Logs de Debug

El sistema incluye logs detallados para troubleshooting:
- `🔍 Cargando ubicación desde datos de entidad X`
- `📍 Ubicación encontrada: {...}`
- `🗺️ Inicializando mapa para ubicación...`
- `📍 Nueva ubicación seleccionada: lat, lng`
- `📍 Actualizando ubicación: lat, lng`

### ✅ Validaciones y Manejo de Errores

- **Coordenadas válidas**: Validación de rangos de latitud (-90 a 90) y longitud (-180 a 180)
- **Ubicación múltiple**: Prioriza ubicación principal, luego activa, luego primera disponible
- **Fallback**: Si no hay ubicación, centra en Bogotá por defecto
- **API resiliente**: Maneja errores de red y APIs no disponibles

### 🎯 Casos de Uso Soportados

1. **Crear nueva ubicación** para entidad sin ubicación previa
2. **Actualizar ubicación existente** de entidad con ubicación
3. **Visualizar ubicación actual** de manera automática al editar
4. **Limpiar ubicación** para eliminar coordenadas temporalmente
5. **Identificar entidades ubicadas** visualmente en la tabla principal

---

## 🚀 ¡Funcionalidad Completamente Operativa!

El sistema de ubicación en mapa está listo para producción con todas las funcionalidades implementadas y probadas.
