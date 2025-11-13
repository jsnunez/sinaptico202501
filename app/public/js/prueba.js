
function renderTabla(lista) {
  const tbody = document.getElementById('tablaContactosVerificados');
  tbody.innerHTML = '';

  if (!lista.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No hay contactos</td></tr>';
    return;
  }

  lista.forEach(contacto => {
    const user = contacto?.User ?? {};
    const empresaNombre = contacto?.empresa?.razonSocial ?? '';
    const tr = document.createElement('tr');
    tr.innerHTML = `
              <td>
                <div style="position:relative;width:60px;height:60px;">
                  <img src="photo/${user.fotoPerfil || 'img/sinfoto.jpg'}" 
                      alt="Foto" style="width:60px;height:60px;border-radius:50%;object-fit:cover;"
                      onerror="this.onerror=null;this.src='img/sinfoto.jpg';">
                  <i class="bi bi-search"
                    style="position:absolute;bottom:2px;right:2px;font-size:0.9em;color:#007bff;background:white;border-radius:50%;padding:3px;cursor:pointer;"
                    onclick="window.location.href = '/perfilEntidad?id=${user.id}'"></i>
                </div>
              </td>
              <td>${user.name ?? ''}</td>
              <td>${contacto._cargoNombre !== 'N/A' ? contacto._cargoNombre : ''}</td>
              <td style="text-align:left;">${empresaNombre}</td>

        `;
    tbody.appendChild(tr);
  });
}

function aplicarFiltros() {
  const nombreFiltro = document.getElementById('filter-nombre').value.toLowerCase();
  const entidadFiltro = document.getElementById('filter-entidad').value;
  const cargoFiltro = document.getElementById('filter-cargo').value;

  const filtrados = listaContactos.filter(c => {
    const user = c.User ?? {};
    const empresa = c.empresa?.razonSocial ?? '';
    const cargo = c._cargoNombre ?? '';

    const matchesNombre =
      !nombreFiltro ||
      user.name?.toLowerCase().includes(nombreFiltro) ||
      empresa.toLowerCase().includes(nombreFiltro);

    const matchesEntidad = !entidadFiltro || empresa === entidadFiltro;
    const matchesCargo = !cargoFiltro || cargo === cargoFiltro;

    return matchesNombre && matchesEntidad && matchesCargo;
  });

  renderTabla(filtrados);
}
