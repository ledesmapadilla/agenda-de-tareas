export default class Tarea {
  /* propiedades */
  #id;
  #tarea;
  #fechaHora;
  #estado;

  constructor(
    /* parametros */
    tarea,
    fechaHora,
    estado
  ) {
    this.#id = crypto.randomUUID();
    this.#tarea = tarea;
    this.#fechaHora = fechaHora;
    this.#estado = estado;
  }

  // Getters
  get id() {
    return this.#id;
  }

  get tarea() {
    return this.#tarea;
  }

  get fechaHora() {
    return this.#fechaHora;
  }

  get estado() {
    return this.#estado;
  }

  // Setters
  set id(nuevoId) {
    this.#id = nuevoId;
  }

  set tarea(nuevaTarea) {
    this.#tarea = nuevaTarea;
  }

  set fechaHora(nuevaFechaHora) {
    this.#fechaHora = nuevaFechaHora;
  }

  set estado(nuevoEstado) {
    this.#estado = nuevoEstado;
  }

  //    metodo para almacenar el objeto en el localstorage/sessionstorage
  toJSON() {
    return {
      id: this.id,
      tarea: this.tarea,
      fechaHora: this.fechaHora,
      estado: this.estado,
    };
  }
}
