// Animación de fondo neuronal
document.addEventListener('DOMContentLoaded', function() {

    
    fetchClasificadosCount();
    // Configuración del canvas para la animación neuronal
    const canvas = document.getElementById('neuralCanvas');
    const ctx = canvas.getContext('2d');
    
    // Ajustar tamaño del canvas al tamaño de la ventana
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Clase para representar neuronas
    class Neuron {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = Math.random() * 2 + 1;
            this.connections = [];
            this.speed = {
                x: (Math.random() - 0.5) * 0.3,
                y: (Math.random() - 0.5) * 0.3
            };
        }
        
        // Actualizar posición
        update() {
            this.x += this.speed.x;
            this.y += this.speed.y;
            
            // Rebotar en los bordes
            if (this.x < 0 || this.x > canvas.width) this.speed.x *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speed.y *= -1;
        }
        
        // Dibujar neurona
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#6e48aa';
            ctx.fill();
            
            // Dibujar conexiones
            this.connections.forEach(neuron => {
                const distance = Math.sqrt(Math.pow(this.x - neuron.x, 2) + Math.pow(this.y - neuron.y, 2));
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(neuron.x, neuron.y);
                    ctx.strokeStyle = `rgba(110, 72, 170, ${1 - distance/150})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        }
    }
    
    // Crear neuronas
    const neurons = [];
    const neuronCount = Math.floor(window.innerWidth * window.innerHeight / 15000);
    
    for (let i = 0; i < neuronCount; i++) {
        neurons.push(new Neuron(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        ));
    }
    
    // Establecer conexiones entre neuronas
    neurons.forEach(neuron => {
        const connectionCount = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < connectionCount; i++) {
            const randomNeuron = neurons[Math.floor(Math.random() * neurons.length)];
            if (randomNeuron !== neuron) {
                neuron.connections.push(randomNeuron);
            }
        }
    });
    
    // Función de animación
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        neurons.forEach(neuron => {
            neuron.update();
            neuron.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Ajustar tamaño del canvas cuando cambia el tamaño de la ventana
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Mostrar/ocultar secciones según los botones de filtro
    const filterButtons = document.querySelectorAll('.filter-button');

    const entidadesSection = document.getElementById('entidades');
    // Manejar clic en el div de directorio
    // const directorioDiv = document.getElementById('directorio');
    // directorioDiv.addEventListener('click', function() {

    //     document.getElementById('modalDirectorio').style.display = 'block';
 
        

    //     document.getElementById('entidades').style.display = 'none';
    // });
    // Activar el botón "Todos" por defecto
    // document.getElementById('Todos1').classList.add('active');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            if (this.id === 'Todos') {
            
                entidadesSection.style.display = 'block';
            } else {
               
                entidadesSection.style.display = 'none';
                
                // Aquí se puede agregar lógica para filtrar las entidades según el tipo
                // Por ejemplo, si hay una función existente en llamarEntidades.js
                if (typeof filtrarPorTipo === 'function') {
                    filtrarPorTipo(this.id);
                }
            }
        });
    });

    // Animación de contadores
    const counters = document.querySelectorAll('.counter-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.innerText);
        counter.innerText = '0';
        
        const updateCounter = () => {
            const current = parseInt(counter.innerText);
            const increment = Math.ceil(target / 20);
            
            if (current < target) {
                counter.innerText = Math.min(current + increment, target);
                setTimeout(updateCounter, 50);
            }
        };
        
        // Iniciar animación después de un pequeño retraso
        setTimeout(updateCounter, 500);
    });

    // Manejo de modales
    const modals = document.querySelectorAll('.modal');
    const overlay = document.querySelector('.overlay');
    const closeButtons = document.querySelectorAll('.close, #cerrarModal, #cerrarModalEditar, #cerrarModalEditarX, #CerrarModal');
    
    // Función para cerrar todos los modales
    function closeAllModals() {
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        overlay.style.display = 'none';
    }
    
    // Asignar evento a botones de cierre
    closeButtons.forEach(button => {
        button.addEventListener('click', closeAllModals);
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                closeAllModals();
            }
        });
    });
    
    // Prevenir que el clic en el contenido del modal cierre el modal
    document.querySelectorAll('.modal-content').forEach(content => {
        content.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    });

    // Función para cambiar el formulario según el tipo de entidad
    window.changeForm = function(type) {
        // Remover clase active de todos los botones
        document.querySelectorAll('.entity-type-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Agregar clase active al botón clickeado
        document.getElementById(type === 'Empresa' ? 'Empresa' : type).classList.add('active');
        
        // Aquí se puede agregar lógica para cambiar los campos del formulario
        // según el tipo de entidad seleccionado
        // Esta función debe estar definida en formularios.js
        if (typeof cambiarFormulario === 'function') {
            cambiarFormulario(type);
        }
    };
});