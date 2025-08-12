export const validarCantidadCaracteres = (input, min, max) => {
  if (input.value.length >= min && input.value.length <= max) {
    input.classList.add(`is-valid`);
    input.classList.remove(`is-invalid`);
    return true;
  }
  else{
    input.classList.add(`is-invalid`);
    input.classList.remove(`is-valid`);
    return false;
  }
};
