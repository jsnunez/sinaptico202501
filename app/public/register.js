const mensajeError = document.getElementsByClassName("error")[0];

document.getElementById("register-form").addEventListener("submit",async(e)=>{
  e.preventDefault();
  console.log(e.target.children.user.value)
  const res = await fetch("/api/register",{

  // const res = await fetch("https://sinaptico-production.up.railway.app/api/register",{
    method:"POST",
    headers:{
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      name: e.target.children.user.value,
      email: e.target.children.email.value,
      password: e.target.children.password.value,
      telefono:e.target.children.telefono.value
    })
  });
  if(!res.ok) return mensajeError.classList.toggle("escondido",false);
  const resJson = await res.json();
  if(res.ok){
   
      document.getElementById("modal").style.display = "block";
      document.getElementById("nombreUsuario").innerText=e.target.children.email.value;

  }
   if(resJson.redirect){
    window.location.href = resJson.redirect;
  }
})

// scripts.js

// Función para simular la carga
function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');

  // Ocultamos el loading y mostramos el contenido
  loadingScreen.style.display = 'none';
  mainContent.style.display = 'flex';
}

// Simulamos una carga (por ejemplo, esperar 3 segundos)
window.onload = function() {
  setTimeout(hideLoadingScreen, 1000);  // Espera 3 segundos antes de mostrar el contenido
};
