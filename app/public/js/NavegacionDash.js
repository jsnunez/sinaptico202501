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