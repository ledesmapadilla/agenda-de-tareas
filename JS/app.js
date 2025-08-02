import Tarea from "./tarea.js";
// elementos del DOM
const btnAgregarTarea = document.getElementById("btnAgregarTarea");
const modalFormularioTarea = new bootstrap.Modal(
  document.getElementById("tareaModal")
);
const formularioTarea = document.getElementById("formTarea");

const inputTarea = document.getElementById("tarea");
const inputFechaCrea = document.getElementById("fechaCrea");
const inputHoraCrea = document.getElementById("horaCrea");
const inputEstado = document.getElementById("estado");

const tablaTareas = document.getElementById("tablaTarea");

const agenda = [];

//Funciones
const guardarLocalstorage = () => {
  localStorage.setItem("agendaKey", JSON.stringify(agenda));
};

const crearTarea = () => {
  //buscar los datos del formulario y crear un objeto tarea
  const tareaNueva = new Tarea(
    inputTarea.value,
    inputFechaCrea.value,
    inputHoraCrea.value,
    inputEstado.value
  );
  //guardar el contacto en la agenda de tareas
  agenda.push(tareaNueva);

  /* insertar los datos en la tabla */
  const tareasTabla = document.createElement("tbody");
  

  tareasTabla.innerHTML = `
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
              
            `;

  /* borrar tarea */
  const btnBorraTarea = tareasTabla.querySelector(".btn-primary"); 
  
  btnBorraTarea.addEventListener("click", () => {
    tareasTabla.remove();
  }); 

  tablaTareas.appendChild(tareasTabla);

  //guardar la agenda en el localstorage
  guardarLocalstorage();
};

//manejadores de eventos
btnAgregarTarea.addEventListener("click", () => {
  modalFormularioTarea.show();
});

formularioTarea.addEventListener("submit", (e) => {
  e.preventDefault();
  //aqui tengo que crear/editar una tarea
  crearTarea();
  formularioTarea.reset();
  modalFormularioTarea.hide();
});
