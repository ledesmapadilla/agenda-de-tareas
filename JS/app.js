import Tarea from "./tarea.js";
// elementos del DOM
const btnAgregarTarea = document.getElementById("btnAgregarTarea");
const modalFormularioTarea = new bootstrap.Modal(
  document.getElementById("tareaModal")
);
const tablaDetalle = document.getElementById("seccionDetalleTarea");
const btnVolverLista = document.getElementById("btnVolverLista");
const detalleTareaTitulo = document.getElementById("detalleTarea");
const detalleDescripcion = document.getElementById("detalleDescripcion");
const detalleResponsable = document.getElementById("detalleResponsable");
const detalleEstado = document.getElementById("detalleEstado");
const detalleFechaEdit = document.getElementById("detalleFechaEdic");
/* const detalleFechaModif = document.getElementById("detalleFechaModif"); */
const detalleFechaCrea = document.getElementById("detalleFechaCreacion");
const formularioTarea = document.getElementById("formTarea");
const inputTarea = document.getElementById("tarea");
const inputResponsable = document.getElementById("responsable");
const inputUrgencia = document.getElementById("urgencia");
let estoyCreando = true;
let idTarea = null;

/* poner fecha actual con formato */
const fechaActual = new Date();
const opcionesFecha = {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};
const fechaFormateada = fechaActual.toLocaleDateString(
  undefined,
  opcionesFecha
);
/* voy a traer el tbody para hacer tabla */
const tbody = document.querySelector(`#tablaTareasBody`);

/* cuando hago F5, que no me borre el array de la agenda */
const agenda = JSON.parse(localStorage.getItem("agendaKey")) || [];

//Funciones
const guardarLocalstorage = () => {
  localStorage.setItem("agendaKey", JSON.stringify(agenda));
};

const crearTarea = () => {
  //buscar los datos del formulario y crear un objeto tarea
  const tareaNueva = new Tarea(
    inputTarea.value,
    `original`,
    inputResponsable.value,
    inputUrgencia.value,
    fechaFormateada,
    null
  );
  //guardar el contacto en la agenda de tareas
  agenda.push(tareaNueva);

  console.log(tareaNueva);

  Swal.fire({
    title: "Has creado una tarea",
    icon: "success",
    confirmButtonText: "OK",
  });

  /* dibujar la tarea en la tabla */
  dibujarFila(tareaNueva, agenda.length);

  //guardar la agenda en el localstorage
  guardarLocalstorage();
};

const editarTarea = () => {
  const indiceTarea = agenda.findIndex((tarea) => tarea.id == idTarea);
  /* creo fecha de edicion */

  const fechaEditada = new Date();
  const opcionesFechaEditada = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const fechaFormateadaEditada = fechaEditada.toLocaleDateString(
    undefined,
    opcionesFechaEditada
  );

  /* modifico la tarea */
  agenda[indiceTarea].tarea = inputTarea.value;
  agenda[indiceTarea].responsable = inputResponsable.value;
  agenda[indiceTarea].urgencia = inputUrgencia.value;
  agenda[indiceTarea].estado = `Editada`;
  agenda[indiceTarea].fechaEdicion = fechaFormateadaEditada;

  /* corrijo en pantalla los cambios */

  const filaNueva = tbody.children[indiceTarea];
  filaNueva.innerHTML = `
    <td>${agenda[indiceTarea].tarea}</td>
    <td>${agenda[indiceTarea].responsable}</td>
    <td>${agenda[indiceTarea].urgencia}</td>
    <td>Editada</td>
    <td>
      <button
        type="button"
        class="btn btn-primary me-1 btn-eliminar"
        onclick="borrarTarea('${agenda[indiceTarea].id}')"
      >
        Eliminar
      </button>
      <button
        type="button"
        class="btn btn-success me-1 btn-editar"
        onclick="prepararTarea('${agenda[indiceTarea].id}')"
      >
        Editar
      </button>
      <button type="button" class="btn btn-secondary btn-finalizar"
      onclick="verTarea('${agenda[indiceTarea].id}')">
        Ver más
      </button>
    </td>`;

  guardarLocalstorage();
  modalFormularioTarea.hide();
};

function limpiarFormulario() {
  formularioTarea.reset();
}

/* ingresar filas en la tabla */

const cargarTarea = () => {
  console.log(agenda.length);
  if (agenda.length !== 0) {
    /* recorro la agenda y por cada elemento, dibujo una fila */
    agenda.map((itemTarea, indice) => dibujarFila(itemTarea));
  } else {
    Swal.fire({
      title: "La agenda esta vacia",
      icon: "warning",
      confirmButtonText: "OK",
    });
  }
};

const dibujarFila = (itemTarea) => {
  tbody.innerHTML += ` <tr>
 
                <td>${itemTarea.tarea}</td>
                <td>${itemTarea.responsable}</td>
                <td>${itemTarea.urgencia}</td>
                <td>${`Original`}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary me-1 btn-eliminar" onclick="borrarTarea('${
                      itemTarea.id
                    }')"
                  >
                    Eliminar
                  </button>
                  <button type="button" class="btn btn-success me-1 btn-editar"onclick= "prepararTarea('${
                    itemTarea.id
                  }')">
                    Editar
                  </button>
                  <button type="button" class="btn btn-secondary btn-finalizar" onclick="verTarea('${
                    itemTarea.id
                  }')">
                    Ver más
                  </button>
                </td>
              </tr>`;
};

/* borrar tareas con boton */

window.borrarTarea = (id) => {
  Swal.fire({
    title: "Seguro quieres borrar la tarea?",
    text: "No podras revertir este paso",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Borrar",
    cancelButtonText: "cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      /* quiero encontrar la posicion del elemento que quiero borrar */
      const indiceTarea = agenda.findIndex((tarea) => tarea.id == id);
      console.log(indiceTarea);
      console.log(tbody.children[indiceTarea]);

      /* borro el elemento de esa posicion */
      agenda.splice(indiceTarea, 1);
      Swal.fire({
        title: "OK!",
        text: "Tu tarea ha sido borrada",
        icon: "success",
      });

      /* borro en pantalla la fila eliminada */
      tbody.children[indiceTarea].remove();

      /* guardo el nuevo array sin la tarea borrada, en el localStorage */
      guardarLocalstorage();
    }
  });
};

/* para editar una tarea */
/* 1- traigo los elementos al formulario */
/* encuentro el objeto */
window.prepararTarea = (id) => {
  const tareaBuscada = agenda.find((tarea) => tarea.id == id);
  /* muestro los datos del objeto en el formulario */

  inputTarea.value = tareaBuscada.tarea;
  inputResponsable.value = tareaBuscada.responsable;
  inputUrgencia.value = tareaBuscada.urgencia;
  idTarea = id;
  /* cambio la variable que controla si edito o creo */
  estoyCreando = false;

  modalFormularioTarea.show();
};

/* mostrar tabla de detalles */

window.verTarea = (id) => {
  const tarea = agenda.find((tarea) => tarea.id === id);
  tablaDetalle.classList.remove("d-none");
  detalleTareaTitulo.textContent = tarea.tarea;
  detalleDescripcion.textContent = tarea.tarea;
  detalleResponsable.textContent = tarea.responsable;
  detalleEstado.textContent = tarea.estado;
  detalleFechaEdit.textContent = tarea.fechaEdicion ?? "Sin editar";/* ??= "sino" */
  detalleFechaCrea.textContent = tarea.fechaCrea;
};

//manejadores de eventos
btnAgregarTarea.addEventListener("click", () => {
  modalFormularioTarea.show();
});

/* boton para cerrar tabla de detalles de tareas */
btnVolverLista.addEventListener("click", () => {
  tablaDetalle.classList.add("d-none");
});

/* cuando creo presiono submit, crear la tarea, vaciar el formulario y cerrar modal */
formularioTarea.addEventListener("submit", (e) => {
  e.preventDefault();

  //aqui tengo que crear/editar una tarea

  if (estoyCreando == true) {
    crearTarea();
  } else {
    editarTarea();

    estoyCreando = true;
    idTarea = null;
  }

  formularioTarea.reset();
  modalFormularioTarea.hide();
});

cargarTarea();
