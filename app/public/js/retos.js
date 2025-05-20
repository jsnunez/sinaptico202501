document.getElementById("innovacionAbierta").addEventListener("click", () => {
    document.querySelector(".main-content").style.display = "none";
    document.getElementById("retos").style.display = "block";
  });  


let cleanedStr = "";
let DatosEntidad = "";
// Función para obtener el valor de una cookie por su nombre
function obtenerCookie(nombre) {
const nombreCookie = `${nombre}=`;
const cookies = document.cookie.split(';');

for (let i = 0; i < cookies.length; i++) {
  let cookie = cookies[i].trim();

  if (cookie.indexOf(nombreCookie) === 0) {
    return cookie.substring(nombreCookie.length, cookie.length);
  }
}

return null; // Retorna null si no se encuentra la cookie
}
document.addEventListener("DOMContentLoaded", function () {
// Ejemplo de cómo leer la cookie "usuario"
const usuario = obtenerCookie("user");
cleanedStr = usuario.replace(/%20/g, " "); // Reemplaza '%20' por un espacio
cleanedStr = decodeURIComponent(cleanedStr);
document.getElementById('bienvenido').innerText = "Bienvenido  " + cleanedStr ;
});
document.getElementById("cerrarSesion").addEventListener("click", () => {
Swal.fire({
  title: '¿Estás seguro?',
  text: '¿Querés cerrar sesión?',
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
});
});

const userid = document.cookie.split("; ").find(row => row.startsWith("userId="))?.split("=")[1];

document.addEventListener("DOMContentLoaded", async () => {
const challengesGrid = document.querySelector(".challenges-grid");

try {
  const userResponse = await fetch(`${API_BASE_URL}/api/entidad/verificar-entidad/${userid}`);
  if (!userResponse.ok) {
    throw new Error("Failed to fetch user company data");
  }
  DatosEntidad = await userResponse.json();
  console.log("User's company:", DatosEntidad);
  
} catch (error) {
  console.error("Error fetching user's company:", error);
}

try {
  const response = await fetch(`${API_BASE_URL}/api/retos`);
  const challenges = await response.json();

  challengesGrid.innerHTML = "";

  challenges.forEach(challenge => {
    const challengeCard = document.createElement("div");
    challengeCard.classList.add("challenge-card");

    challengeCard.innerHTML = `
      <h3>${challenge.nombre}</h3>
      <video controls width="100%">
        <source src="videos/${challenge.ubicacionVideo}" type="video/mp4">
        Tu navegador no soporta la reproducción de videos.
      </video>
      <p>${challenge.descripcion}</p>
      <a href="fichas/${challenge.ubicacionFicha}" class="btn btn-outline btn-full" target="_blank">Ver ficha</a>
      <button class="btn btn-primary btn-full open-modal-btn">Aplicar al reto</button>
    `;

    challengesGrid.appendChild(challengeCard);
    // Check if the entity has already applied to the challenge
    
    
    const checkApplication = async () => {
      try {
        const openModalBtn = challengeCard.querySelector(".open-modal-btn");

        if (!DatosEntidad.success ) {
          console.log("DatosEntidad:", DatosEntidad.success);

          openModalBtn.disabled = true;
          openModalBtn.textContent = "Sin entidad asociada";
          openModalBtn.classList.add("disabled");
          openModalBtn.style.backgroundColor = "gray";
          return;
        }

        // Verify if the entity is enabled
        const habilitadaResponse = await fetch(`${API_BASE_URL}/api/entidad/verificar-entidad/${userid}`);
        
           
        if (!habilitadaResponse.ok) {
      throw new Error("Error verifying if the entity is enabled");
        }
        const habilitadaData = await habilitadaResponse.json();
        // console.log("Entity status:", habilitadaData);
        if (!habilitadaData.entidad.habilitado) {
      openModalBtn.disabled = true;
      openModalBtn.textContent = "Entidad no habilitada";
      openModalBtn.classList.add("disabled");
      openModalBtn.style.backgroundColor = "red";
      return;
        }

        // Check if the entity has already applied to the challenge
        const response = await fetch(`${API_BASE_URL}/api/retos/verificar-aplicacion?entidadId=${DatosEntidad.entidad.id}&retoId=${challenge.id}`);
        if (!response.ok) {
      throw new Error("Error verifying application");
        }
        const data = await response.json();
        if (data.aplicado) {
      openModalBtn.disabled = true;
      openModalBtn.textContent = "Ya aplicado";
      openModalBtn.classList.add("disabled");
      openModalBtn.style.backgroundColor = "green";
        }
      } catch (error) {
        console.error("Error verifying application or entity status:", error);
      }
    };

    checkApplication();
    const openModalBtn = challengeCard.querySelector(".open-modal-btn");
    openModalBtn.addEventListener("click", () => {
      const modal = document.createElement("div");
      modal.classList.add("modal");

      modal.innerHTML = `
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <h2>Aplicar al Reto ${challenge.id} : ${challenge.nombre}</h2>
          <form id="application-form" enctype="multipart/form-data">
              <label for="company-name">Nombre de la Empresa:</label>
              <input type="text" id="company-name" name="company-name" value="${DatosEntidad.entidad.razonSocial}" readonly required>

              <input type="hidden" id="challenge-id" name="challenge-id" value="${challenge.id}">

            <label for="email">Correo Electrónico:</label>
            <input type="email" id="email" name="email" value="${DatosEntidad.entidad.correo}" readonly required>

            <label for="file1">Cargar Archivo 1 (PDF):</label>
            <input type="file" id="file1" name="file1" accept="application/pdf" required>

            <label for="file2">Cargar Archivo 2 (PDF):</label>
            <input type="file" id="file2" name="file2" accept="application/pdf" required>

            <label for="file3">Cargar Archivo 3 (PDF):</label>
            <input type="file" id="file3" name="file3" accept="application/pdf" required>

            <label for="file4">Cargar Archivo 4 (PDF):</label>
            <input type="file" id="file4" name="file4" accept="application/pdf" required>

            <label for="file5">Cargar Archivo 5 (PDF):</label>
            <input type="file" id="file5" name="file5" accept="application/pdf" required>

            <label for="file6">Cargar Archivo 6 (PDF):</label>
            <input type="file" id="file6" name="file6" accept="application/pdf" required>

            <label for="file7">Cargar Archivo 7 (PDF):</label>
            <input type="file" id="file7" name="file7" accept="application/pdf" required>

            <button type="submit" class="btn btn-primary">Enviar</button>
          </form>
        </div>
      `;

      document.body.appendChild(modal);
      const closeModal = modal.querySelector(".close-modal");
      closeModal.addEventListener("click", () => {
        modal.remove();
      });

      modal.addEventListener("click", (event) => {
        if (event.target === modal) {
          modal.remove();
        }
      });

      const form = modal.querySelector("#application-form");
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);

        formData.append("challengeId", challenge.id);
        formData.append("entidadId", DatosEntidad.entidad.id);
formData.append("userid", userid);
console.log("Form data:", userid);
        console.log("Form data:", formData);
        try {
          const response = await fetch(`${API_BASE_URL}/api/retos/aplicar`, {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("Error al enviar la solicitud");
          }

          const result = await response.json();
          console.log("Formulario enviado con éxito:", result);
          modal.remove();
          Swal.fire({
            title: '¡Éxito!',
            text: 'Formulario enviado con éxito.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            location.reload();
          });
        
         
          
        } catch (error) {
          console.error("Error al enviar el formulario:", error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    });
  });
} catch (error) {
  console.error("Error fetching challenges:", error);
  challengesGrid.innerHTML = "<p>Error loading challenges. Please try again later.</p>";
}
});