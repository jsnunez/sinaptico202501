document.addEventListener("DOMContentLoaded", () => {
  // Tab switching
  const tabTriggers = document.querySelectorAll(".tab-trigger")
  const tabPanes = document.querySelectorAll(".tab-pane")

  tabTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      // Remove active class from all triggers and panes
      tabTriggers.forEach((t) => t.classList.remove("active"))
      tabPanes.forEach((p) => p.classList.remove("active"))

      // Add active class to clicked trigger
      trigger.classList.add("active")

      // Show corresponding tab pane
      const tabId = trigger.getAttribute("data-tab")
      document.getElementById(tabId).classList.add("active")
    })
  })

  // Form submission
  const loginForm = document.getElementById("loginForm")
  const registerForm = document.getElementById("registerForm")

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    console.log("Login attempt:", { email, password });
  
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          credentials: "include", // 🔥 importante
          "Content-Type": "application/json"
          
        },
        body: JSON.stringify({ email, password })
      });
  
      if (!res.ok) {
        const data = await res.json(); // intenta extraer mensaje del backend
        throw new Error(data.message || "Correo o contraseña incorrectos");
      }
  
      const resJson = await res.json();
  
      // Si hay redirección, ir al destino
      if (resJson.redirect) {
        Swal.fire({
          title: '¡Bienvenido!',
          text: 'Inicio de sesión exitoso.',
          icon: 'success',
          confirmButtonText: 'Continuar'
        }).then(() => {
          window.location.href = resJson.redirect;
        });
      }
  
    } catch (error) {
      Swal.fire({
        title: 'Error de inicio de sesión',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo'
      });
  
      // Si querés seguir mostrando el mensaje de error en la página también:
      const mensajeError = document.getElementsByClassName("error")[0];
      if (mensajeError) {
        mensajeError.classList.remove("escondido");
        mensajeError.textContent = error.message;
      }
    }
  });
  

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const name = document.getElementById("user").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const telefono = document.getElementById("telefono").value;
  
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: '¡Oops!',
        text: 'Las contraseñas no coinciden',
        confirmButtonText: 'Entendido'
      });
      return;
    }
  
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          telefono
        })
      });
  
      if (!res.ok) {
        const data = await res.json(); // Intenta obtener mensaje de error del servidor
        throw new Error(data.message || "Error desconocido");
      }
  
      // Si todo va bien:
      Swal.fire({
        title: '¡Éxito!',
        text: `Tu información ha sido guardada correctamente. El email registrado fue ${email}`,
        icon: 'success',
        confirmButtonText: 'Entendido'
      }).then(() => {
        window.location.reload();
      });
  
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: `No se pudo registrar: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
    }
  });
  

  // // Neuron animation
  // const canvas = document.getElementById("neuronCanvas")
  // const ctx = canvas.getContext("2d")

  // // Set canvas dimensions to match parent
  // function resizeCanvas() {
  //   const parent = canvas.parentElement
  //   canvas.width = parent.offsetWidth
  //   canvas.height = parent.offsetHeight
  // }

  // resizeCanvas()
  // window.addEventListener("resize", resizeCanvas)

  // // Neuron class
  // class Neuron {
  //   constructor(x, y, size) {
  //     this.x = x
  //     this.y = y
  //     this.size = size
  //     this.connections = []
  //     this.speed = {
  //       x: (Math.random() - 0.5) * 0.3,
  //       y: (Math.random() - 0.5) * 0.3,
  //     }
  //     this.pulseTime = 0
  //     this.isPulsing = false
  //     this.pulseRadius = 0
  //     this.maxPulseRadius = 40 + Math.random() * 20
  //   }

  //   update(width, height) {
  //     // Move neuron
  //     this.x += this.speed.x
  //     this.y += this.speed.y

  //     // Bounce off edges
  //     if (this.x <= 0 || this.x >= width) this.speed.x *= -1
  //     if (this.y <= 0 || this.y >= height) this.speed.y *= -1

  //     // Update pulse
  //     if (this.isPulsing) {
  //       this.pulseRadius += 0.5
  //       if (this.pulseRadius > this.maxPulseRadius) {
  //         this.isPulsing = false
  //         this.pulseRadius = 0
  //       }
  //     } else if (Math.random() < 0.001) {
  //       // Randomly start pulsing
  //       this.isPulsing = true
  //     }
  //   }

  //   draw() {
  //     // Draw neuron
  //     ctx.beginPath()
  //     ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
  //     ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
  //     ctx.fill()

  //     // Draw pulse
  //     if (this.isPulsing) {
  //       ctx.beginPath()
  //       ctx.arc(this.x, this.y, this.pulseRadius, 0, Math.PI * 2)
  //       const alpha = 1 - this.pulseRadius / this.maxPulseRadius
  //       ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`
  //       ctx.lineWidth = 1
  //       ctx.stroke()
  //     }
  //   }

  //   connectTo(neuron) {
  //     if (!this.connections.includes(neuron)) {
  //       this.connections.push(neuron)
  //     }
  //   }

  //   drawConnections() {
  //     this.connections.forEach((neuron) => {
  //       const dx = this.x - neuron.x
  //       const dy = this.y - neuron.y
  //       const distance = Math.sqrt(dx * dx + dy * dy)

  //       if (distance < 150) {
  //         ctx.beginPath()
  //         ctx.moveTo(this.x, this.y)
  //         ctx.lineTo(neuron.x, neuron.y)

  //         // Fade based on distance
  //         const alpha = 1 - distance / 150
  //         ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.3})`
  //         ctx.lineWidth = 0.5
  //         ctx.stroke()

  //         // Draw pulse along connection if either neuron is pulsing
  //         if (this.isPulsing || neuron.isPulsing) {
  //           const pulsingNeuron = this.isPulsing ? this : neuron
  //           const pulseProgress = pulsingNeuron.pulseRadius / pulsingNeuron.maxPulseRadius

  //           if (pulseProgress > 0 && pulseProgress < 1) {
  //             const pulseX = this.isPulsing
  //               ? this.x + (neuron.x - this.x) * pulseProgress
  //               : neuron.x + (this.x - neuron.x) * pulseProgress
  //             const pulseY = this.isPulsing
  //               ? this.y + (neuron.y - this.y) * pulseProgress
  //               : neuron.y + (this.y - neuron.y) * pulseProgress

  //             ctx.beginPath()
  //             ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2)
  //             ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
  //             ctx.fill()
  //           }
  //         }
  //       }
  //     })
  //   }
  // }

  // // Create neurons
  // const neuronCount = Math.floor((canvas.width * canvas.height) / 5000)
  // const neurons = []

  // for (let i = 0; i < neuronCount; i++) {
  //   const x = Math.random() * canvas.width
  //   const y = Math.random() * canvas.height
  //   const size = 1 + Math.random() * 2
  //   neurons.push(new Neuron(x, y, size))
  // }

  // // Connect neurons
  // neurons.forEach((neuron) => {
  //   neurons.forEach((otherNeuron) => {
  //     if (neuron !== otherNeuron) {
  //       const dx = neuron.x - otherNeuron.x
  //       const dy = neuron.y - otherNeuron.y
  //       const distance = Math.sqrt(dx * dx + dy * dy)

  //       if (distance < 150) {
  //         neuron.connectTo(otherNeuron)
  //       }
  //     }
  //   })
  // })

  // // Animation loop
  // function animate() {
  //   ctx.clearRect(0, 0, canvas.width, canvas.height)

  //   // Update and draw connections
  //   neurons.forEach((neuron) => {
  //     neuron.update(canvas.width, canvas.height)
  //     neuron.drawConnections()
  //   })

  //   // Draw neurons
  //   neurons.forEach((neuron) => {
  //     neuron.draw()
  //   })

  //   requestAnimationFrame(animate)
  // }

  // animate()
})

// Show modal on "Retos" button click
const retosButton = document.getElementById("retosButton");
const eventosButton = document.getElementById("eventosButton");
const serviciosButton = document.getElementById("serviciosButton");
const recupearPass= document.getElementById("recuperarPass");
const retosModal = document.getElementById("modal");
const closeModalButton = document.getElementById("closeModalButton");

// retosButton.addEventListener("click", () => {
//   Swal.fire({
//     icon: 'info',
//     title: 'Registrate para obtener mas informacion',
//     confirmButtonText: 'Cerrar'
//   });
// });
// eventosButton.addEventListener("click", () => {
//   Swal.fire({
//     icon: 'info',
//     title: 'Registrate para obtener mas informacion',
//     confirmButtonText: 'Cerrar'
//   });
// });

// serviciosButton.addEventListener("click", () => {
//   Swal.fire({
//     icon: 'info',
//     title: 'Registrate para obtener mas informacion',
//     confirmButtonText: 'Cerrar'
//   });
// });

recupearPass.addEventListener("click", async () => {
  const { value: email } = await Swal.fire({
    title: 'Recuperar contraseña',
    text: 'Ingresá tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.',
    input: 'email',
    inputLabel: 'Correo electrónico',
    inputPlaceholder: 'ejemplo@correo.com',
    showCancelButton: true,
    confirmButtonText: 'Enviar',
    cancelButtonText: 'Cancelar',
    inputValidator: (value) => {
      if (!value) {
        return 'Por favor ingresá un correo válido';
      }
    }
  });

  if (email) {
    // Aquí podés enviar el email al servidor
    try {
      const res = await fetch("/api/recuperarPass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (!res.ok) {
        throw new Error("No se pudo enviar el correo.");
      }

      Swal.fire({
        icon: 'success',
        title: 'Correo enviado',
        text: 'Revisá tu bandeja de entrada para continuar con el restablecimiento.'
      });

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      });
    }
  }
});

// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
  if (event.target === retosModal) {
    retosModal.style.display = "none";
  }
});



// Seleccionar elementos
const userLogo = document.getElementById('user-logo');
const authPanel = document.getElementById('auth-panel');
const sidePanel = document.getElementById('side-panel');

// // Añadir un evento de clic al logo del usuario
// userLogo.addEventListener('click', () => {
//   // Cambiar el estado del panel de autenticación
//   authPanel.style.display = 'block'; // Asegura que el panel sea visible
//   authPanel.classList.toggle('active'); // Desliza el panel hacia la derecha

//   // Expandir o contraer el panel lateral
//   sidePanel.classList.toggle('expanded');
// });


 function mensajeRegistrar() {
                Swal.fire({
                    icon: 'info',
                    title: 'Registrate para obtener más información',
                    showCancelButton: true,
                    confirmButtonText: 'Registrarme',
                    cancelButtonText: 'Cerrar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        document.getElementById("authModal").style.display = "block";
                        // Cambia a la pestaña de registro
                        document.querySelector('.tab-trigger[data-tab="register"]').click();
                    }
                });

            }

            document.addEventListener('DOMContentLoaded', function () {
                // Cargar el mapa SVG
                fetch('mapa/mapa1.svg')
                    .then(response => response.text())
                    .then(svg => {
                        document.getElementById('mapa').innerHTML = svg;
                        agregarInteractividad();
                    });
            });
       
            function inicioSesion() {
                document.getElementById("authModal").style.display = "block";
            }

            function closeModal() {
                document.getElementById("authModal").style.display = "none";
            }

            // Cerrar al hacer clic fuera del contenido
            window.onclick = function (event) {
                const modal = document.getElementById("authModal");
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            }


