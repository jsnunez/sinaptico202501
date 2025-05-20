// Assuming you have a similar structure for another button and modal
document.getElementById("vincularEntidad").addEventListener("click", () => {
 const userId = obtenerCookie("userId");
    document.getElementById('modalUnirme').style.display = 'block';
    document.getElementById('userId').value = userId;

    document.getElementById('nombreUnir').value = cleanedStr;
    
    agregarCargosUnir();
    agregarEntidadesUnir()
})
async function agregarCargosUnir() {
    const cargos = await cargarCargos(); // Ahora recibimos los datos correctamente

console.log(cargos);
    const cargoSelect = document.getElementById('cargoId');

    if (cargoSelect && cargos && typeof cargos === 'object' && Object.keys(cargos).length > 0) {
        // Limpiar el select de cargos antes de agregar nuevas opciones
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


    async function agregarEntidadesUnir() {
        const entidades = todasLasEmpresas; 
console.log(entidades);
        const entidadSelect = document.getElementById('entidadId');

        if (entidadSelect && entidades && Array.isArray(entidades) && entidades.length > 0) {
            // Limpiar el select de entidades antes de agregar nuevas opciones
            entidadSelect.innerHTML = ''; // Elimina las opciones existentes
            entidades.forEach(entidad => {
                const option = document.createElement('option');
                option.value = entidad.id;
                option.textContent = entidad.razonSocial;
                entidadSelect.appendChild(option);
            });
        } else {
            console.warn('No se encontraron entidades para cargar.');
        }
    }

    document.getElementById("unirEmpresa").addEventListener("click", async (e) => {
        e.preventDefault();
        const userId = document.getElementById('userId').value;
        const cargoId = document.getElementById('cargoId').value;
        const empresaId = document.getElementById('entidadId').value;

        const data = {
            userId,
            cargoId,
            empresaId
        };

        try {
            const response = await fetch('/api/usuarioempresa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Datos enviados correctamente:', result);
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'Tu información ha sido guardada correctamente. Espera que el administrador de la empresa te acepte',
                    icon: 'success',
                    confirmButtonText: 'Entendido'
                  });
                
                document.getElementById('modalUnirme').style.display = 'none';
            } else {
                console.error('Error al enviar los datos:', response.statusText);
                alert('Hubo un error al realizar la unión.');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Hubo un error al realizar la unión.');
        }
    });


