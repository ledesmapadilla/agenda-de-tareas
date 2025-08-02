export default class Tarea {
  /* propiedades */
  #id;
  #tarea;
  #fecha;
  #estado;
  #responsable;
  #urgencia;

  constructor(
    /* parametros */
    tarea,
    fecha,
    estado,
    responsable,
    urgencia
  ) {
    this.#id = crypto.randomUUID();
    this.#tarea = tarea;
    this.#fecha = fecha;
    this.#estado = `creada`;
    this.#responsable = responsable;
    this.#urgencia = urgencia;
  }

  // Getters
  get id() {
    return this.#id;
  }

  get tarea() {
    return this.#tarea;
  }

  get fecha() {
    return this.#fecha;
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

  // Setters
  set id(nuevoId) {
    this.#id = nuevoId;
  }

  set tarea(nuevaTarea) {
    this.#tarea = nuevaTarea;
  }

  set fecha(nuevaFecha) {
    this.#fecha = nuevaFecha;
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

  //    metodo para almacenar el objeto en el localstorage/sessionstorage
  toJSON() {
    return {
      id: this.id,
      tarea: this.tarea,
      fecha: this.fecha,
      estado: this.estado,
      responsable: this.responsable,
      urgencia: this.#urgencia,
    };
  }
}
