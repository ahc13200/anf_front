export const EMAIL_VALID = "Entre una direecion de correo valida"
export const EMAIL_REQUIRED = "Email is required"
export const EMAIL_EXISTS = "That email has been taken"

export const USERNAME_REQUIRED = "The username is rquired"
export const USERNAME_EXISTS = "The username has been taken"

export const PASSWORD_LENGTH = (maxLength) => "La contraseña debe tener al menos " + maxLength + ' caracteres'
export const PASSWORD_REQUIRED = "La contraseña no puede estar vacía"
export const PASSWORDS_EQUALS = "Las contraseñas no coinciden"
export const GENERIC_ERROR = "Valor inválido para este campo"

export const VALUE_REQUIRED = "Este campo es requerido"
export const VALUE_INTEGER = "Este valor debe ser un número"
export const VALUE_DECIMAL = "Este valor debe ser decimal"
export const MAX_LENGTH = (maxLength) => "Este campo no puede tener más de " + maxLength + ' caracteres'
export const MIN_LENGTH = (minLength) => "Este campo no puede tener menos de " + minLength + ' caracteres'
export const LENGTH = (length) => "Este campo debe tener " + length + " caracteres"
export const SAME_AS = (campo) => "Este valor debe ser igual al valor del campo " + campo + " "
export const MIN_VALUE = (campo) => "Este valor debe ser mayor que el valor del campo " + campo + " "


export const TextMap = {
  required: VALUE_REQUIRED,
  integer: VALUE_INTEGER,
  decimal:VALUE_DECIMAL
}

export const getTextValidation = (param) => {
  const {
    type
  } = param
  if (type   == 'maxLength') {
    return MAX_LENGTH(param.max)
  } else if (type == 'maxLength') {
    return MIN_LENGTH(param.min)
  } else if (type == 'email') {
    return EMAIL_VALID
  }else if (type == 'sameAs') {
    return SAME_AS(param.eq)
  }else if (type == 'minValue') {
    return MIN_VALUE(param.min)
  }
  return TextMap[type]?TextMap[type]:GENERIC_ERROR
}
