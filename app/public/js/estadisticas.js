
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


async function fetchConvocatoriasCount() {
  try {
    const res = await fetch("/api/convocatorias/cantidadConvocatorias", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) {
      throw new Error("No se pudo obtener la cantidad de convocatorias.");
    }

    const data = await res.json();
    const convocatoriaCountElement = document.getElementById("convocatoriasCount");
    if (convocatoriaCountElement) {
      convocatoriaCountElement.textContent = ` ${data.count}`;
    }
  } catch (error) {
    console.error("Error al obtener la cantidad de convocatorias:", error.message);
  }
}

async function fetchEventosCount() {
  try {
    const res = await fetch("/api/convocatorias/cantidadEventos", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) {
      throw new Error("No se pudo obtener la cantidad de eventos.");
    }

    const data = await res.json();
    const eventoCountElement = document.getElementById("eventosCount");
    if (eventoCountElement) {
      eventoCountElement.textContent = ` ${data.count}`;
    }
  } catch (error) {
    console.error("Error al obtener la cantidad de eventos:", error.message);
  }
}