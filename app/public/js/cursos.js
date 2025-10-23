const userid = document.cookie.split("; ").find(row => row.startsWith("userId="))?.split("=")[1];
let videoActualId = null;
  let totalVideos = 0;
    let videosVistos = 0;
    let cursoCompletadoMostrado = false;
document.addEventListener("DOMContentLoaded", async () => {
  const challengesGrid = document.querySelector(".challenges-grid");
  let DatosEntidad = null;

  try {
    const userResponse = await fetch(`${API_BASE_URL}/api/entidad/verificar-entidad/${userid}`);
    if (!userResponse.ok) {
      throw new Error("Error al obtener los datos de la entidad");
    }
    DatosEntidad = await userResponse.json();
  } catch (error) {
    console.error("Error obteniendo la entidad del usuario:", error);
  }

  actualizarCursos();

  async function aplicarCurso(cursoId, userId) {
    console.log("Aplicando al curso:", cursoId, "Usuario:", userId);
    try {
      const response = await fetch(`${API_BASE_URL}/api/aplicarCurso`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ cursoId, userId })
      });

      if (!response.ok) {
        throw new Error("Error al aplicar al curso");
      }

      const result = await response.json();
      console.log("Aplicación exitosa:", result);

      alert("Te has inscrito exitosamente en el curso.");
      await actualizarCursos();
    } catch (error) {
      console.error("Error al aplicar al curso:", error);
      alert("Hubo un error al intentar inscribirte en el curso.");
    }
  }

  async function actualizarCursos() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/curso`);
      const challenges = await response.json();

      challengesGrid.innerHTML = ""; // Limpiar contenido anterior

      challenges.forEach(challenge => {
        const challengeCard = document.createElement("div");
        challengeCard.classList.add("challenge-card");

        challengeCard.innerHTML = `
          <h3>${challenge.nombre}</h3>
          <video controls width="100%">
            <source src="videos/${challenge.video}" type="video/mp4">
            Tu navegador no soporta la reproducción de videos.
          </video>
          <p>${challenge.descripcion}</p>
          <a href="temario/${challenge.temario}" class="btn btn-yellow btn-full" target="_blank">Ver temario</a>
          <button id="inscribirse${challenge.id}" class="btn btn-primary btn-full open-modal-btn">Inscribirse</button>
        `;

        challengesGrid.appendChild(challengeCard);

        // Obtener el botón y asignar el evento de inscripción
        const applyButton = challengeCard.querySelector("button");
        applyButton.addEventListener("click", () => {
          aplicarCurso(challenge.id, userid);
        });

        // Verificar si ya estás inscrito en el curso
        const checkApplication = async () => {
          try {
            const applicationResponse = await fetch(`${API_BASE_URL}/api/aplicarCurso/verificar-aplicacion/${challenge.id}/${userid}`);
            
            if (!applicationResponse.ok) {
              throw new Error("No se pudo verificar la inscripción");
            }

            const applicationData = await applicationResponse.json();
            if (applicationData.aplicado) {
           
document.getElementById(`inscribirse${challenge.id}`).style.display = "none"; // Ocultar botón de inscripción
              const startCourseButton = document.createElement("button");
              startCourseButton.textContent = "Iniciar Curso";
              startCourseButton.classList.add("btn", "btn-success", "btn-full");
              startCourseButton.style.background = "#157347";
              startCourseButton.style.color = "white";
              startCourseButton.addEventListener("click", () => {
                const courseSection = document.getElementById("cursosSection");
                courseSection.style.display = "none";

                llamarcurso(`${challenge.id}`,`${challenge.video}`)
              });
              challengeCard.appendChild(startCourseButton);
            }
          } catch (error) {
            console.error("Error al verificar la inscripción:", error);
          }
        };

        checkApplication(); // Ejecutar la verificación al cargar
      });

    } catch (error) {
      console.error("Error al cargar los cursos:", error);
      challengesGrid.innerHTML = "<p>Error cargando los cursos. Intenta nuevamente más tarde.</p>";
    }
  }
});

async function llamarcurso(cursoId,videoIntro) {
  console.log("Llamando a la función llamarcurso con ID:", cursoId);

  try {
    const response = await fetch(`${API_BASE_URL}/api/curso/${cursoId}`);
    if (!response.ok) {
      throw new Error("Error al obtener los datos del curso");
    }

    const cursoData = await response.json();
    const courseContainer = document.getElementById("courseContainer");
    courseContainer.innerHTML = ""; // Limpiar contenido anterior

    // Crear contenedor para la información del curso
    const courseInfoContainer = document.createElement("div");
    courseInfoContainer.id = "courseInfoContainer";
    courseInfoContainer.style.marginBottom = "20px";

    const courseTitle = document.createElement("h2");
    courseTitle.textContent = "Nombre del curso: " + cursoData.nombre;
    courseInfoContainer.appendChild(courseTitle);

    const courseDescription = document.createElement("p");
    courseDescription.textContent = "Descripcion curso: " + cursoData.descripcion;
    courseInfoContainer.appendChild(courseDescription);

    courseContainer.appendChild(courseInfoContainer);

    // Crear contenedor para los videos
    const courseVideosContainer = document.createElement("div");
    courseVideosContainer.id = "courseVideosContainer";
    courseVideosContainer.style.display = "flex";
    courseVideosContainer.style.justifyContent = "space-between";

    // Crear contenedor para el video seleccionado
    const videoDisplayContainer = document.createElement("div");
    videoDisplayContainer.id = "videoDisplayContainer";
    videoDisplayContainer.style.width = "60%";
    videoDisplayContainer.style.padding = "1rem";
    const videoElement = document.createElement("video");
    videoElement.style.width = "100%";
    videoElement.style.height = "auto";
    videoElement.style.display = "block";
    videoElement.controls = true;
    videoElement.width = "100%";
    console.log("Video a mostrar:", videoIntro);
    videoDisplayContainer.appendChild(videoElement);
             videoElement.src = `videos/${videoIntro}`;


    const videosResponse = await fetch(`${API_BASE_URL}/api/videosCurso/ids/${cursoId}`);
    if (!videosResponse.ok) throw new Error("No se pudieron obtener los videos del curso");
    const videosData = await videosResponse.json();
    console.log("Videos del curso:", videosData);
    totalVideos = videosData.videoIds.length;
    console.log("Total de videos:", totalVideos);
  videoElement.addEventListener("ended", () => {
      if (videoActualId && userid) {
        fetch(`${API_BASE_URL}/api/usuarioVideos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usuarioId: userid,
            videoId: videoActualId
          })
        })
          .then(res => {
            if (!res.ok) throw new Error("Error al registrar visualización");
            return res.json();
          })
          .then(() => {
            const checkbox = document.getElementById(`checkbox-${videoActualId}`);
            if (checkbox && !checkbox.checked) {
              checkbox.checked = true;
              checkbox.parentElement.classList = "video-item visto";
              videosVistos++;
              verificarCursoCompletadoDespuesVideo()
            }
          })
          .catch(err => console.error("Error registrando video:", err));
      }
    });
    courseVideosContainer.appendChild(videoDisplayContainer);

    // Crear lista de videos
    const videoListContainer = document.createElement("div");
    videoListContainer.style.width = "35%";
    videoListContainer.style.padding = "1rem";

    const videoListTitle = document.createElement("h3");
    videoListTitle.textContent = "Selecciona un video:";
    videoListTitle.style.marginBottom = "10px";
    videoListContainer.appendChild(videoListTitle);

    const videoList = document.createElement("ul");
    videoList.style.paddingLeft = "0px";
    videoList.style.listStyleType = "decimal";

    try {
      const videosResponse = await fetch(`${API_BASE_URL}/api/videosCurso/${cursoId}`);
      if (!videosResponse.ok) {
        throw new Error("Error al obtener los videos del curso");
      }

      const videosData = await videosResponse.json();

videosData.forEach(video => {
  const videoItem = document.createElement("li");
  videoItem.classList.add("video-item");

  const videoLink = document.createElement("a");
  videoLink.href = "#";
  videoLink.textContent = `${video.titulo} (${video.duracion} minutos)`;
  videoLink.classList.add("video-link");
  videoLink.addEventListener("click", () => {
    videoElement.src = `videos/${video.video}`;
    videoElement.play();
    videoActualId = video.id;
  });

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `checkbox-${video.id}`;
  checkbox.disabled = true;
  checkbox.classList.add("video-checkbox");

  videoItem.appendChild(videoLink);
  videoItem.appendChild(checkbox);
  videoList.appendChild(videoItem);

  // Verificar si el video fue visto
  (async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/usuarioVideos/verificar/${userid}/${video.id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.visto) {
          checkbox.checked = true;
          videoItem.classList.add("visto");
          videosVistos++;
          verificarCursoCompletado();
        }
      }
    } catch (err) {
      console.error("Error verificando si el video fue visto:", err);
    }
  })();
});

      videoListContainer.appendChild(videoList);
    } catch (error) {
      console.error("Error al cargar los videos del curso:", error);
      alert("Hubo un error al cargar los videos del curso. Intenta nuevamente más tarde.");
    }

    courseVideosContainer.appendChild(videoListContainer);
    courseContainer.appendChild(courseVideosContainer);

    courseContainer.style.display = "block"; // Mostrar la sección del curso
  } catch (error) {
    console.error("Error al cargar los datos del curso:", error);
    alert("Hubo un error al cargar los datos del curso. Intenta nuevamente más tarde.");
  }
}


function verificarCursoCompletadoDespuesVideo() {

  if (videosVistos === totalVideos && totalVideos > 0 && !cursoCompletadoMostrado) {
    Swal.fire({
      icon: 'success',
      title: '¡Felicitaciones!',
      text: '¡Has completado todos los videos del curso!',
      confirmButtonText: 'OK'
    });
    cursoCompletadoMostrado = true;

    // Mostrar botón para generar certificado
    const courseContainer = document.getElementById("courseContainer");
    let certBtn = document.getElementById("generarCertificadoBtn");
    if (!certBtn) {
      certBtn = document.createElement("button");
      certBtn.id = "generarCertificadoBtn";
      certBtn.textContent = "Generar Certificado";
      certBtn.className = "btn btn-primary btn-full";
      certBtn.style.marginTop = "30px";
      certBtn.onclick = function() {
        // Aquí puedes redirigir o llamar a la API para generar el certificado
        window.location.href = `/api/certificado/generar/${userid}`;
      };
      courseContainer.appendChild(certBtn);
    }
  } else if (videosVistos < totalVideos && totalVideos > 0) {
    Swal.fire({
      icon: 'success',
      title: '¡Video visto!',
      text: 'Selecciona otro video para continuar.',
      confirmButtonText: 'OK'
    });
    // Ocultar el botón si existe y aún no completó el curso
    const certBtn = document.getElementById("generarCertificadoBtn");
    if (certBtn) certBtn.style.display = "none";
  }
}

function verificarCursoCompletado() {

  if (videosVistos === totalVideos && totalVideos > 0 && !cursoCompletadoMostrado) {

    // Mostrar botón para generar certificado
    const courseContainer = document.getElementById("courseContainer");
    let certBtn = document.getElementById("generarCertificadoBtn");
    if (!certBtn) {
      certBtn = document.createElement("button");
      certBtn.id = "generarCertificadoBtn";
      certBtn.textContent = "Generar Certificado";
      certBtn.className = "btn btn-primary btn-full";
      certBtn.style.marginTop = "30px";
      certBtn.onclick = async function() {
        // Obtener el nombre del usuario desde la API
        let nombreUsuario = userid;
        try {
          const userRes = await fetch(`${API_BASE_URL}/api/user/${userid}`);
          if (userRes.ok) {
            const userData = await userRes.json();
            nombreUsuario = userData.name || userid;
          }
        } catch (e) {
          // Si falla, usar el userid
        }
        // Generar un PDF con el nombre del curso, usuario y la fecha actual
        const doc = new window.jspdf.jsPDF();
        const courseName = document.querySelector("#courseInfoContainer h2")?.textContent || "Curso";
        const courseDescription = document.querySelector("#courseInfoContainer p")?.textContent || "Descripción del curso";
        const fecha = new Date().toLocaleDateString();
        doc.setFontSize(18);
        doc.text("Certificado de Finalización", 20, 30);
        doc.setFontSize(14);
        doc.text(`Nombre del curso: ${courseName.replace("Nombre del curso: ", "")}`, 20, 50);
        doc.text(`Descripcion curso: ${courseDescription.replace("Descripcion curso: ", "")}`, 20, 60);
        doc.text(`Fecha: ${fecha}`, 20, 75);
        doc.text(`Usuario: ${nombreUsuario}`, 20, 90);

        // Abrir el PDF en una nueva ventana sin descargar
        const pdfBlob = doc.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, "_blank");
      };
      courseContainer.appendChild(certBtn);
    }
  }
}