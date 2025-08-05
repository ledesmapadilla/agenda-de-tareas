export default class Tarea {
  /* propiedades */
  #id;
  #tarea;
  #fechaEdicion;
  #estado;
  #responsable;
  #urgencia;
  #fechaCrea;

  constructor(
    /* parametros */
    tarea,
    estado,
    responsable,
    urgencia,
    fechaCrea,
    fechaEdicion
  ) {
    this.#id = crypto.randomUUID();
    this.#tarea = tarea;
    this.#estado = estado;
    this.#responsable = responsable;
    this.#urgencia = urgencia;
    this.#fechaCrea = fechaCrea;
    this.#fechaEdicion = fechaEdicion;
  }

  // Getters
  get id() {
    return this.#id;
  }

  get tarea() {
    return this.#tarea;
  }

  get fechaEdicion() {
    return this.#fechaEdicion;
  }

  get estado() {
    return this.#estado;
  }
  get responsable() {
    return this.#responsable;
  }
  get urgencia() {
    return this.#urgencia;
  }
  get fechaCrea() {
    return this.#fechaCrea;
  }

  // Setters
  set id(nuevoId) {
    this.#id = nuevoId;
  }

  set tarea(nuevaTarea) {
    this.#tarea = nuevaTarea;
  }

  set fechaEdicion(nuevafechaEdicion) {
    this.#fechaEdicion = nuevafechaEdicion;
  }

  set estado(nuevoEstado) {
    this.#estado = nuevoEstado;
  }
  set responsable(nuevoResponsable) {
    this.#responsable = nuevoResponsable;
  }
  set urgencia(nuevoUrgencia) {
    this.#urgencia = nuevoUrgencia;
  }
  set fechaCrea(nuevafechaCrea) {
    this.#fechaCrea = nuevafechaCrea;
  }

  //    metodo para almacenar el objeto en el localstorage/sessionstorage
  toJSON() {
    return {
      id: this.id,
      tarea: this.tarea,
      fechaEdicion: this.fechaEdicion,
      estado: this.estado,
      responsable: this.responsable,
      urgencia: this.#urgencia,
      fechaCrea: this.#fechaCrea,
    };
  }
}
