import { conexionAPI } from "./conexionAPI.js";

const lista = document.querySelector("[data-lista]");

function crearElementoLista(nombre, precio, imagen,id) {
  const articulo = document.createElement("li");
  articulo.className = "articulo";
  articulo.dataset.id = id;
  articulo.innerHTML = `
    <img src="${imagen}" alt="">
    <h4>${nombre}</h4>
    <div class="footer_card">
        <p>$${precio}</p>
        <button>Eliminar</button>
    </div>
`;
  return articulo;
}

async function listarArticulosEnLista() {
  try {
    const listaAPI = await conexionAPI.listarArticulos();
    listaAPI.forEach((articulo) =>
      lista.appendChild(
        crearElementoLista(articulo.nombre, articulo.precio, articulo.imagen,articulo.id)
      )
    );
  } catch (error) {
    console.log(error);
  }
}

listarArticulosEnLista();

// Insertar Articulo en la lista --------------------------------------

const formulario = document.querySelector("[data-formulario]");
async function crearArticulo(evento) {
  evento.preventDefault();
  const nombre = document.querySelector("[data-nombre]").value;
  const precio = document.querySelector("[data-precio]").value;
  const imagen = document.querySelector("[data-imagen]").value;

  try {
    await conexionAPI.enviarArticulo(nombre, precio, imagen);
    window.location.href = "index.html";
  } catch (e) {
    alert(e);
  }
}

formulario.addEventListener("submit", (evento) => crearArticulo(evento));

// Eliminar Articulo de la lista --------------------------------------

lista.addEventListener("click", (evento) => {
    if (evento.target.tagName === 'BUTTON' && evento.target.textContent === 'Eliminar') {
        eliminarArticulo(evento);
    }
});

async function eliminarArticulo(evento) {
    evento.preventDefault();
    const botonEliminar = evento.target;
    const articulo = botonEliminar.closest('.articulo');
    const id = articulo.dataset.id;
    console.log(id);
    try {
        await conexionAPI.eliminarArticulo(id);
        articulo.remove();
    } catch (e) {
        alert(e);
    }

}

// Vaciar formulario -------------------------------------------------

const botonVaciar = document.querySelector("[data-vaciar]");
botonVaciar.addEventListener("click", (evento) => vaciarFormulario(evento));

function vaciarFormulario(evento) {
  evento.preventDefault();
  document.querySelector("[data-nombre]").value = "";
  document.querySelector("[data-precio]").value = "";
  document.querySelector("[data-imagen]").value = "";
}
