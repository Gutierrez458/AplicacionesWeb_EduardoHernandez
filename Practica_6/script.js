const form = document.getElementById("formContacto");
const modal = document.getElementById("modal");
const mensaje = document.getElementById("mensajeModal");
const cerrar = document.getElementById("btnCerrar");

form.addEventListener("submit", function (e) {

  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;

  if (nombre === "" || correo === "") {
    mensaje.textContent = "Error: todos los campos son obligatorios.";
  } else {
    mensaje.textContent = "Formulario enviado correctamente.";
  }

  modal.style.display = "block";
});

cerrar.addEventListener("click", function () {
  modal.style.display = "none";
});
