// Animación de fondo neuronal
document.addEventListener('DOMContentLoaded', function() {
    // Configuración del canvas para la animación neuronal
    const canvas = document.getElementById('neuronCanvas');
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
                x: (Math.random() - 0.5) * 0.2,
                y: (Math.random() - 0.5) * 0.2
            };
            this.color = this.getRandomColor();
        }
        
        // Obtener un color aleatorio dentro de la paleta
        getRandomColor() {
            const colors = ['#7c3aed', '#8b5cf6', '#a78bfa', '#6d28d9', '#4338ca'];
            return colors[Math.floor(Math.random() * colors.length)];
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
            ctx.fillStyle = this.color;
            ctx.fill();
            
            // Dibujar conexiones
            this.connections.forEach(neuron => {
                const distance = Math.sqrt(Math.pow(this.x - neuron.x, 2) + Math.pow(this.y - neuron.y, 2));
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(neuron.x, neuron.y);
                    
                    // Gradiente para la conexión
                    const gradient = ctx.createLinearGradient(this.x, this.y, neuron.x, neuron.y);
                    gradient.addColorStop(0, this.color);
                    gradient.addColorStop(1, neuron.color);
                    
                    ctx.strokeStyle = gradient;
                    ctx.globalAlpha = 1 - distance/150;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            });
        }
    }
    
    // Crear neuronas
    const neurons = [];
    const neuronCount = Math.floor(window.innerWidth * window.innerHeight / 10000);
    
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

    // Contador regresivo
    function updateCountdown() {
        // Fecha objetivo (15 días a partir de ahora)
        const now = new Date();
        const targetDate = new Date();
        targetDate.setDate(now.getDate() + 15);
        
        // Calcular diferencia de tiempo
        const difference = targetDate - now;
        
        // Calcular días, horas, minutos y segundos
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Actualizar elementos HTML
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // Actualizar contador cada segundo
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Actualizar inmediatamente
    
    // Animación de transmisión sináptica adicional
    function createSynapseTransmission() {
        const synapses = document.querySelectorAll('.synapse-path');
        
        synapses.forEach(synapse => {
            // Eliminar puntos existentes
            const existingDots = synapse.querySelectorAll('.pulse-dot');
            existingDots.forEach(dot => dot.remove());
            
            // Crear nuevo punto
            const dot = document.createElement('div');
            dot.classList.add('pulse-dot');
            synapse.appendChild(dot);
        });
    }
    
    // Crear transmisiones sinápticas periódicamente
    setInterval(createSynapseTransmission, 3000);
    createSynapseTransmission(); // Crear inmediatamente
    
    // Formulario de notificación
    const notifyForm = document.querySelector('.notify-form form');
    if (notifyForm) {
        notifyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Aquí normalmente enviarías el email a un servidor
            // Por ahora, solo mostramos un mensaje
            alert(`¡Gracias! Te notificaremos en ${email} cuando el sitio esté listo.`);
            this.reset();
        });
    }
});