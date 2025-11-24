
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


const currentPath = window.location.pathname;

// Botones del menú general
const menuButtons = document.querySelectorAll(".dropdown-btnG, .nav-button[data-link]");

// Dropdowns del menú general
const dropdownsG = document.querySelectorAll(".menuG");

let activeButton = null;

// Marcar activo según URL
menuButtons.forEach(btn => {
    if (btn.dataset.link && currentPath.startsWith(btn.dataset.link)) {
        btn.classList.add("pulse");
        activeButton = btn;
    }
});

// Control de los dropdown del menú general
dropdownsG.forEach(drop => {
    const btn = drop.querySelector(".dropdown-btnG");

    btn.addEventListener("click", (e) => {
        e.stopPropagation();

        dropdownsG.forEach(d => {
            if (d !== drop) d.classList.remove("show");
        });

        const isOpen = drop.classList.toggle("show");

        if (isOpen) {
            btn.classList.add("pulse");
            if (activeButton && activeButton !== btn) activeButton.classList.remove("pulse");
        } else {
            btn.classList.remove("pulse");
            if (activeButton) activeButton.classList.add("pulse");
        }
    });
});

// Cerrar dropdown generales al hacer clic fuera
document.addEventListener("click", () => {
    dropdownsG.forEach(drop => {
        drop.classList.remove("show");
        drop.querySelector(".dropdown-btnG").classList.remove("pulse");
    });

    if (activeButton) activeButton.classList.add("pulse");
});

// Botones normales (que no son dropdown)
document.querySelectorAll(".nav-button:not(.dropdown-btnG)").forEach(btn => {
    btn.addEventListener("click", () => {
        // Quitar pulse de todos los botones
        menuButtons.forEach(b => b.classList.remove("pulse"));

        // Activar el botón pulsado
        btn.classList.add("pulse");

        // Redirigir
        window.location.href = btn.dataset.link;
    });
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

