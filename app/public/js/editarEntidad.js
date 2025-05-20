let miEmpresaID = "";
let miEmpresa = "";
document.getElementById("editarEntidad").addEventListener("click", async () => {

    overlay.style.display = 'block'; // Mostrar overlay
    document.getElementById('modalEditar').style.display = 'flex';
    document.getElementById('modalEditar').style.flexWrap = 'wrap';
    const userDetailsContainer = document.getElementById('datos-entidad');
    const usuario = obtenerCookie("userId");
    let cleanedStr = usuario.replace(/%20/g, " "); // Reemplaza '%20' por un espacio
    let idlimpia = decodeURIComponent(cleanedStr);
    miEmpresa = buscarPorUserId(parseInt(idlimpia, 10))
    console.log(miEmpresa)

    userDetailsContainer.innerHTML = `
    <div class="modal-header">

        <h2>Editar Entidad</h2>
    </div>
    <br>
    <!-- Datos de la entidad -->
    <div class="input-box" style="display:none;">
          <label for="ID">ID</label>
            <input type="text" id="ID" name="ID" placeholder="id" required>
        </div>
      <div class="input-box">
          <label for="claseEntidad">Clase de Entidad</label>
          <select id="claseEntidad" name="claseEntidad" required>
              <option value="Empresa">Empresa</option>
              <option value="Startup">Startup</option>
              <option value="Emprendimiento">Emprendimiento</option>
              <option value="Universidad">Universidad</option>
          </select>
      </div>

      <div class="input-box">
          <label for="razonSocial">Razón Social</label>
          <input type="text" id="razonSocial" name="razonSocial" placeholder="Ingrese la razón social" required>
      </div>

      <div class="input-box">
          <label for="numIdentificacion">Número de Identificación</label>
          <input type="text" id="numIdentificacion" name="numIdentificacion" placeholder="Ingrese el número de identificación" required>
      </div>

      <div class="input-box">
          <label for="tipoEntidad">Tipo de Entidad</label>
          <select id="tipoEntidad" name="tipoEntidad" required>
              <option value="Sociedad Anónima">Sociedad Anónima</option>
              <option value="Sociedad Limitada">Sociedad Limitada</option>
              <option value="Persona Natural">Persona Natural</option>
          </select>
      </div>

      <div class="input-box">
          <label for="naturalezaJuridica">Naturaleza Jurídica</label>
          <select id="naturalezaJuridica" name="naturalezaJuridica" required>
              <option value="Privada">Privada</option>
              <option value="Pública">Pública</option>
              <option value="Mixta">Mixta</option>
          </select>
      </div>

      <div class="input-box">
          <label for="actividadEconomica">Actividad Económica</label>
          <input type="text" id="actividadEconomica" name="actividadEconomica" placeholder="Ingrese la actividad económica" required>
      </div>

      <div class="input-box">
          <label for="correo">Correo de Contacto</label>
          <input type="email" id="correo" name="correo" placeholder="Ingrese el correo de la entidad" required>
      </div>

      <div class="input-box">
          <label for="telefono">Teléfono de Contacto</label>
          <input type="tel" id="telefono" name="telefono" placeholder="Ingrese el teléfono de contacto" required>
      </div>

      <div class="input-box">
          <label for="fechaConstitucion">Fecha de Constitución</label>
          <input type="date" id="fechaConstitucion" name="fechaConstitucion" required>
      </div>
   
            <div class="input-box">
                <label for="departamento">Departamento</label>
                <select id="departamento" name="departamento" required>
                    <option value="">Seleccione un Departamento</option>
                    <!-- Las opciones se llenarán dinámicamente con JavaScript -->
                </select>
            </div>
            <div class="input-box">
                <label for="ciudadId">ciudad</label>
                <select id="ciudadId" name="ciudadId" required>
                    <option value="">Seleccione un ciudad</option>
                    <!-- Las opciones se llenarán dinámicamente con JavaScript -->
                </select>
            </div>

         

            <div class="input-box">
                <label for="direccion">Dirección</label>
                <input type="text" id="direccion" name="direccion" placeholder="Ingrese la dirección" required>
            </div>

           <div class="input-box">
  <label>Cambiar logo
    <input type="checkbox" id="activarLogo" checked> 
  </label>
  <br>
      <div class="input-box">
           <label for="logo">Selecciona un archivo (PNG, JPG, JPEG):</label><br>
  <input type="file" id="logo" name="logo" accept="image/png, image/jpeg, image/jpg" required><br><br>
      </div>
      </div>

           

            <div class="input-box">
                <label for="facebook">Facebook</label>
                <input type="url" id="facebook" name="facebook" placeholder="Ingrese la URL de Facebook">
            </div>

            <div class="input-box">
                <label for="instagram">Instagram</label>
                <input type="url" id="instagram" name="instagram" placeholder="Ingrese la URL de Instagram">
            </div>

            <div class="input-box">
                <label for="paginaweb">Página Web</label>
                <input type="url" id="paginaweb" name="paginaweb" placeholder="Ingrese la URL de la página web">
            </div> 

       <!-- Datos del contacto -->
            <h2>Datos de Contacto</h2>
  <br>

            <div class="input-box">
                <label for="nombreContacto">Nombre Completo del Contacto</label>
                <input type="text" id="nombreContacto" name="nombreContacto" placeholder="Ingrese el nombre completo" >
            </div>

           
            <div class="input-box">
                <label for="cargoPersona">Cargo</label>
                <select id="cargoPersona" name="cargoPersona" required>
                    <option value="">Seleccione un cargo</option>
                    <!-- Las opciones se llenarán dinámicamente con JavaScript -->
                </select>
            </div>
            <div class="input-box">
                <label for="correoContacto">Correo Electrónico del Contacto</label>
                <input type="email" id="correoContacto" name="correoContacto" placeholder="Ingrese el correo del contacto" >
            </div>

            <div class="input-box">
                <label for="telefonoContacto">Teléfono de Contacto</label>
                <input type="tel" id="telefonoContacto" name="telefonoContacto" placeholder="Ingrese el número de teléfono" >
            </div>
  <br>

        </div>

        `;

    agregarCargos();
    agregarDepartamentos();
    // Ejemplo de cómo usarlo: llamar a esta función cuando se selecciona un departamento
    document.getElementById('departamento').addEventListener('change', (event) => {
        const departmentId = event.target.value;  // Obtenemos el ID del departamento seleccionado
        if (departmentId) {
            agregarMunicipiosEditar(departmentId);  // Llamamos a la función para cargar los municipios
        }
    });

    document.getElementById('ID').value = miEmpresa.id;
    miEmpresaID = miEmpresa.id;
    document.getElementById('razonSocial').value = miEmpresa.razonSocial;
    document.getElementById('numIdentificacion').value = miEmpresa.numIdentificacion;
    document.getElementById('tipoEntidad').value = miEmpresa.tipoEntidad;
    document.getElementById('claseEntidad').value = miEmpresa.claseEntidad;
    document.getElementById('naturalezaJuridica').value = miEmpresa.naturalezaJuridica;
    document.getElementById('actividadEconomica').value = miEmpresa.actividadEconomica;
    document.getElementById('correo').value = miEmpresa.correo;
    document.getElementById('telefono').value = miEmpresa.telefono;
    const fechaISO = new Date(miEmpresa.fechaConstitucion);

    const fechaFormateada = fechaISO.toISOString().split('T')[0]; // "2025-04-11"

    document.getElementById('fechaConstitucion').value = fechaFormateada;
    // document.getElementById('ciudadId').value = miEmpresa.ciudad;
    document.getElementById('direccion').value = miEmpresa.direccion;
    document.getElementById('facebook').value = miEmpresa.facebook;
    document.getElementById('instagram').value = miEmpresa.instagram;
    document.getElementById('paginaweb').value = miEmpresa.paginaweb;
    cargarContacto();
    async function cargarContacto() {

        const contacto = await fetch(`/api/contactos/${miEmpresa.contactoId}`)
            .then(response => response.json())
            .catch(error => console.error('Error fetching contacto:', error));

        if (contacto) {
            document.getElementById('nombreContacto').value = contacto.nombre || '';
            document.getElementById('cargoPersona').value = contacto.cargoId || '';
            document.getElementById('correoContacto').value = contacto.email || '';
            document.getElementById('telefonoContacto').value = contacto.telefono || '';
        }
    }
    // document.getElementById('nombreContacto').value = miEmpresa.contacto.nombre;
    // if (miEmpresa.contacto.cargo == null) {
    //     document.getElementById('cargoPersona').value = "Seleccione un cargo";}
    //     else {

    // document.getElementById('cargoPersona').value = miEmpresa.contacto.cargo;
    //     }
    // document.getElementById('correoContacto').value = miEmpresa.contacto.correo;
    // document.getElementById('telefonoContacto').value = miEmpresa.contacto.telefono;


    document.getElementById('activarLogo').addEventListener('change', function () {
        const inputLogo = document.getElementById('logo');
        inputLogo.disabled = !this.checked;

        // Limpia el archivo si se desactiva
        if (!this.checked) {
            inputLogo.value = '';
        }
    });
    const departamentoId = await asignarDepartamento();
    await agregarMunicipiosEditar(departamentoId);

    document.getElementById('ciudadId').value = miEmpresa.ciudadId;

})



// Función para cerrar el modal
document.getElementById("cerrarModalEditar").addEventListener("click", () => {
    document.getElementById('modalEditar').style.display = 'none';
    overlay.style.display = 'none'; // Ocultar overlay
})

const buscarPorUserId = (id) => {
    return todasLasEmpresas.find(empresa => empresa.UserAdminId === id);
};

async function asignarDepartamento() {
    console.log(miEmpresa.ciudadId);
    fetch(`/api/ciudades/ciudad/${miEmpresa.ciudadId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.ciudad.departamentoId);
            const departamentoId = data.ciudad.departamentoId;
            document.getElementById('departamento').value = departamentoId;
            agregarMunicipiosEditar(departamentoId);

        })
        .catch(error => console.error('Error fetching departamentoId:', error));


}

async function agregarMunicipiosEditar(departmentId) {
    const municipios = await obtenerMunicipiosPorDepartamento(departmentId);  // Obtener los municipios del departamento

    const municipioSelect = document.getElementById('ciudadId');  // Asumimos que tienes un select con id 'municipio'

    // Limpiar el select de municipios antes de agregar nuevas opciones
    municipioSelect.innerHTML = '';  // Elimina las opciones existentes

    if (municipioSelect && municipios && municipios.length > 0) {
        municipios.forEach(municipio => {
            const option = document.createElement('option');
            option.value = municipio.id;  // Usamos el id del municipio como valor

            option.textContent = municipio.nombre;  // El nombre del municipio como texto
            municipioSelect.appendChild(option);
        });
        municipioSelect.value = miEmpresa.ciudadId; // Asignar el valor del municipio actual
    } else {
        console.warn('No se encontraron municipios para este departamento.');
    }
}

async function agregarDepartamentos() {
    const departamentos = await obtenerDepartamentosColombia();  // Ahora recibimos los datos correctamente
    // console.log(departamentos.departamentos);
    const depSelect = document.getElementById('departamento');  // Asumimos que tienes un select con id 'departamento'

    if (depSelect && departamentos && departamentos.length > 0) {
        departamentos.forEach(dep => {
            // console.log(dep);
            const option = document.createElement('option');
            option.value = dep.id;  // Aquí usamos 'id' como el valor del option
            option.textContent = dep.nombre;  // El nombre del departamento será el texto mostrado
            depSelect.appendChild(option);
        })
        asignarDepartamento();;
    } else {
        console.warn('No se encontraron Departamentos para cargar.');
    }

}