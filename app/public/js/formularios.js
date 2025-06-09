// Función para cambiar el formulario según el tipo de entidad
function cargarFormulario() {
    const userDetailsContainer = document.getElementById('datos-entidad-crear');

    userDetailsContainer.innerHTML = `
               <h2>Datos del Actor</h2>
               <br>
          <!-- Datos de la entidad -->
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
                 <label for="logo">LOGO Selecciona un archivo (PNG, JPG, JPEG):</label><br>
        <input type="file" id="logo" name="logo" accept="image/png, image/jpeg, image/jpg" required><br><br>
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
                <select id="cargoPersona" name="cargoId" >
                    <option value="">Seleccione un cargo</option>
                    <!-- Las opciones se llenarán dinámicamente con JavaScript -->
                </select>
                <input type="text" id="cargoPersonaNuevo" name="cargoPersonaNuevo" placeholder="Ingrese el nuevo cargo" >
                <button type="button" class="modal-button" id="crearCargoButton">Crear cargo</button>

            </div>
            <div class="input-box">
                <label for="correoContacto">Correo Electrónico del Contacto</label>
                <input type="email" id="correoContacto" name="correoContacto" placeholder="Ingrese el correo del contacto" >
            </div>

            <div class="input-box">
                <label for="telefonoContacto">Teléfono de Contacto</label>
                <input type="tel" id="telefonoContacto" name="telefonoContacto" placeholder="Ingrese el número de teléfono" >
            </div>

         

        `;

    agregarCargos();
    agregarDepartamentosCrear();
    document.getElementById('departamento').addEventListener('change', (event) => {
        const departmentId = event.target.value;  // Obtenemos el ID del departamento seleccionado
        if (departmentId) {
            agregarMunicipios(departmentId);  // Llamamos a la función para cargar los municipios
        }
    });


    crearCargoButton.addEventListener('click', async () => {
        const nuevoCargo = document.getElementById('cargoPersonaNuevo').value;
        if (!nuevoCargo) {
            Swal.fire({
            icon: 'warning',
            title: 'Campo vacío',
            text: 'Por favor ingrese el nombre del cargo antes de crearlo.',
            });
            return;
        }
        const response = await crearCargo(nuevoCargo);
        console.log(response);
        console.log('Respuesta del servidor:', response);
        if (response.success) {
            alert('Cargo creado con éxito');
                agregarCargos();

        } else {
            alert(response.mensaje);
        }}
    );




}
    const crearCargoVincularButton = document.getElementById('crearCargoVincularButton');
    if (crearCargoVincularButton) {
        console.log('Botón de crear cargo vincular encontrado');
        crearCargoVincularButton.addEventListener('click', async () => {
      const nuevoCargo = document.getElementById('cargoPersonaNuevoVincular').value;
      console.log(nuevoCargo);
        if (!nuevoCargo) {
            Swal.fire({
            icon: 'warning',
            title: 'Campo vacío',
            text: 'Por favor ingrese el nombre del cargo antes de crearlo.',
            });
            return;
        }
        const response = await crearCargo(nuevoCargo);
        console.log(response);
        if (response.success) {
            alert('Cargo creado con éxito');
agregarCargosUnir()
        } else {
            alert(response.mensaje);
        }
        });
    }
async function agregarMunicipios(departmentId) {
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
    } else {
        console.warn('No se encontraron municipios para este departamento.');
    }
}

async function agregarCargos() {
    const cargos = await cargarCargos(); // Ahora recibimos los datos correctamente


    const cargoSelect = document.getElementById('cargoPersona');

    if (cargoSelect && cargos && typeof cargos === 'object' && Object.keys(cargos).length > 0) {
        // Limpiar el select de cargos antes de agregar nuevas opciones
        console.log(cargos);
        cargoSelect.innerHTML = '';  // Elimina las opciones existentes
        Object.keys(cargos).forEach(cargoKey => {
            const option = document.createElement('option');
            option.value = cargos[cargoKey].id;
            option.textContent = cargos[cargoKey].nombre;
            cargoSelect.appendChild(option);
        });
    } else {
        console.warn('No se encontraron cargos para cargar.');
    }

}

// Función para agregar los departamentos al select
async function agregarDepartamentosCrear() {
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
    } else {
        console.warn('No se encontraron Departamentos para cargar.');
    }

}




async function crearCargo(cargo) {
    try {
        const response = await fetch('/api/cargos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre: cargo }),
        });
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        if (response.ok) {
            return { success: true, data };
        } else {
                       

            return { success: false, mensaje: data.message || 'Error al crear eee el cargo' };
        }
    } catch (error) {
        console.error('Error al creardddd el cargo:', error);
        return { success: false, mensaje: 'Error al crear dddd el cargo' };
    }
}