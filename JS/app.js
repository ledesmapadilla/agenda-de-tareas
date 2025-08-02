import Tarea from "./tarea.js";
// elementos del DOM
const btnAgregarTarea = document.getElementById("btnAgregarTarea");
const modalFormularioTarea = new bootstrap.Modal(
  document.getElementById("tareaModal")
);
const formularioTarea = document.getElementById("formTarea");
const inputTarea = document.getElementById("tarea");
const inputResponsable = document.getElementById("responsable");
const inputUrgencia = document.getElementById("urgencia");

/* poner fecha actual con formato */
const fechaActual = new Date();
const opcionesFecha = {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
};
const fechaFormateada = fechaActual.toLocaleDateString(
  undefined,
  opcionesFecha
);

/* cuando hago F5, que no me borre el array de la agenda */
const agenda = JSON.parse(localStorage.getItem("agendaKey")) || [];

/* const tablaTareas = document.getElementById("tablaTarea"); */

/* const agenda = []; */

//Funciones
const guardarLocalstorage = () => {
  localStorage.setItem("agendaKey", JSON.stringify(agenda));
};

const crearTarea = () => {
  //buscar los datos del formulario y crear un objeto tarea
  const tareaNueva = new Tarea(
    inputTarea.value,
    fechaFormateada,
    null,
    inputResponsable.value,
    inputUrgencia.value
  );
  //guardar el contacto en la agenda de tareas
  agenda.push(tareaNueva);

  console.log(tareaNueva);

  Swal.fire({
    title: "Has creado una tarea",
    icon: "success",
    confirmButtonText: "OK",
  });

  //guardar la agenda en el localstorage
  guardarLocalstorage();
};

/* insertar los datos en la tabla */
/*  const tareasTabla = document.createElement("tbody"); */

/*  tareasTabla.innerHTML = `
              <td>${inputTarea.value}</td>
              <td>${inputFechaCrea.value}</td>
              <td>${inputHoraCrea.value}</td>
              <td>${inputEstado.value}</td>
              <td>
                <button type="button" class="btn btn-primary me-1 btn-eliminar">
                  Eliminar
                </button>
                <button type="button" class="btn btn-success me-1 btn-editar">
                  Editar
                </button>
                <button type="button" class="btn btn-secondary btn-finalizar">
                  Finalizar
                </button>
              </td>
              
            `; */

/* borrar tarea */
/* const btnBorraTarea = tareasTabla.querySelector(".btn-primary"); 
  
  btnBorraTarea.addEventListener("click", () => {
    tareasTabla.remove();
  });  */

/* tablaTareas.appendChild(tareasTabla); */

//manejadores de eventos
btnAgregarTarea.addEventListener("click", () => {
  modalFormularioTarea.show();
});
/* cuando creo presiono submit, crear la tarea, vaciar el formulario y cerrar modal */
formularioTarea.addEventListener("submit", (e) => {
  e.preventDefault();
  //aqui tengo que crear/editar una tarea
  crearTarea();
  formularioTarea.reset();
  modalFormularioTarea.hide();
});
