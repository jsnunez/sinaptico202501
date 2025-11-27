async function verificarMiembroActivo(userId) {
    try {
        const response = await fetch(`/api/miembros-comite/${userId}`);
        if (!response.ok) throw new Error('Error al consultar el miembro');
        const data = await response.json();

        // Suponiendo que data.activo es true si el miembro está activo
        const boton = document.getElementById('btnEvaluador');
        if (data.activo) {
            boton.style.display = 'inline-block';
        } else {
            boton.style.display = 'none';
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Llamar a la función luego de cargar la página
window.addEventListener('DOMContentLoaded', function() {
  const userId = obtenerCookie("userId");
  console.log("USER ID EN HABILITAR EVALUADOR JS: ", userId);
    // Reemplaza 'ID_DEL_USUARIO' por el ID real del usuario
    verificarMiembroActivo(userId);
});

// Ejemplo de uso
// verificarMiembroActivo('ID_DEL_USUARIO');