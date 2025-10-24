document.addEventListener("DOMContentLoaded", () => {


    // Navegación entre páginas
    setupNavigation()}
)
function setupNavigation() {
    const navButtons = document.querySelectorAll(".nav-button, .action-button, .card")

    navButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const page = this.getAttribute("data-page")
            if (page) {
                if (page === "dashboard") {
                    window.location.href = "dashboard"
                } else {
                    window.location.href = `${page}`
                }
            }
        })
    })
}
//Menus desplegables
function setupDropdown(buttonId, menuId) {
  const btn = document.getElementById(buttonId);
  const menu = document.getElementById(menuId);

  if (!btn || !menu) return;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    // Cerrar todos los demás menús antes de abrir este
    document.querySelectorAll(".dropdown-menu.show").forEach((el) => {
      if (el !== menu) el.classList.remove("show");
    });

    // Alternar el menú actual
    menu.classList.toggle("show");
  });

  menu.addEventListener("click", (e) => e.stopPropagation());
}

// Configurar menús
setupDropdown("adminInnovacionBtn", "adminInnovacion");
setupDropdown("userMenuAdminBtn", "userMenuAdmin");

// Cerrar cualquier menú si se hace clic fuera
document.addEventListener("click", () => {
  document.querySelectorAll(".dropdown-menu.show").forEach((el) => {
    el.classList.remove("show");
  });
});

//Cerrar Sesión
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
