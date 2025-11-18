
(function () {
    // Garantiza que el overlay permanezca al menos 5s desde que se ejecuta este script.
    const MIN_MS = 2000;
    const overlay = document.getElementById('page-spinner-overlay');
    if (!overlay) return;

    // Si ya pasó más de MIN_MS desde la navegación start, aun así mostramos el overlay breve
    const start = performance.timing ? performance.timing.navigationStart : Date.now();
    const now = Date.now();
    const elapsed = Math.max(0, now - start);
    const remaining = Math.max(0, MIN_MS - elapsed);

    // Evita interacción mientras existe el overlay
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        overlay.style.opacity = '0';
        // permitir scroll cuando hide completo
        setTimeout(() => {
            if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        }, 420);
    }, remaining);
})();


// En construccion

function irEnConstruccion() {
    window.location.href = "/construccion"; // o la ruta que tengas
}
fetchChallengeCount();
fetchEntidadesCount();
fetchUserCount();


//  --------------------     Menú desplegable 

const userMenuBtn = document.getElementById("userMenuBtn");
const dropdown = userMenuBtn.closest(".dropdown");

// Mostrar / ocultar el menú al hacer clic
userMenuBtn.addEventListener("click", (event) => {
    event.stopPropagation(); // evita que el clic cierre inmediatamente el menú
    dropdown.classList.toggle("show");
});

// Cerrar el menú si haces clic fuera
document.addEventListener("click", () => {
    dropdown.classList.remove("show");
});


document.addEventListener('click', function (e) {
    const perfil = e.target.closest('.perfilUser, #Perfil');
    if (perfil) {
        const userId = obtenerCookie("userId");
        window.location.href = `/perfilUser?id=${userId}`;
    }
});


// Cerrar Sesion

document.getElementById("cerrarSesion").addEventListener("click", () => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            // Borrar cookies y redirigir
            document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            document.cookie = 'user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            document.cookie = 'userId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            document.location.href = "/";

        }
        // Si el usuario cancela, no pasa nada
    });
});

