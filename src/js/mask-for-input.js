// mascaras para evento de input

/**
 * Mascara para CPF
 * @param {InputEvent} input 
 */
function mask_cpf(input) {
  // XX.XXX.XXX-XX
  let value = input.currentTarget.value;
  let result = value.replace(/\D/g, "");

  result = result.replace(/(\d{3})(\d{1})/, "$1.$2");
  result = result.replace(/(\d{3})(\d{1})/, "$1.$2");
  result = result.replace(/(\d{3})(\d{1})/, "$1-$2");

  input.currentTarget.value = result;
}

/**
 * Mascara para telefone
 * @param {InputEvent} input 
 */
function mask_phone(input) {
  let value = input.currentTarget.value;
  let result = value.replace(/\D/g, "");
  result = result.replace(/^0/, "");

  result = result.replace(/(\d{2})(\d{1})/, "($1) $2");
  result = result.replace(/(\d{5})(\d{1})/, "$1-$2");

  input.currentTarget.value = result;
}
