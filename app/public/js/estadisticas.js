
async function fetchUserCount() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/user/count`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) {
      throw new Error("No se pudo obtener la cantidad de usuarios.");
    }

    const data = await res.json();
    const userCountElement = document.getElementById("usuarios");
    if (userCountElement) {
      userCountElement.textContent = ` ${data.count}`;
    }
  } catch (error) {
    console.error("Error al obtener la cantidad de usuarios:", error.message);
  }
}
async function fetchChallengeCount() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/retos/cantidad`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) {
      throw new Error("No se pudo obtener la cantidad de retos.");
    }

    const data = await res.json();
    const challengeCountElement = document.getElementById("retos");
    if (challengeCountElement) {
      challengeCountElement.textContent = ` ${data.count}`;
    }
  } catch (error) {
    console.error("Error al obtener la cantidad de retos:", error.message);
  }
}


async function fetchClasificadosCount() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/clasificados/cantidad`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) {
      throw new Error("No se pudo obtener la cantidad de retos.");
    }

    const data = await res.json();
    const challengeCountElement = document.getElementById("publicaciones");
    if (challengeCountElement) {
      challengeCountElement.textContent = ` ${data.count}`;
    }
  } catch (error) {
    console.error("Error al obtener la cantidad de retos:", error.message);
  }
}

async function fetchEntidadesCount() {

  try {
    const res = await fetch("/api/entidad/cantidadEntidades", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) {
      throw new Error("No se pudo obtener la cantidad de empresas.");
    }

    const data = await res.json();
    const companyCountElement = document.getElementById("entidadesCount");
    if (companyCountElement) {
      companyCountElement.textContent = ` ${data.count}`;
    }
  } catch (error) {
    console.error("Error al obtener la cantidad de empresas:", error.message);
  }
}

