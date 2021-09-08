export const validationRegister = (inputs) => {
    let errors = {}

    if (!inputs.nombre) {
        errors.nombre = "El nombre es obligatorio"
    }
    if (!inputs.email) {
        errors.email = "El email es obligatorio"
    }
    if (!inputs.password) {
        errors.password = "El password es obligatorio"
    } else if (inputs.password.length < 6) {
        errors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    return errors
}
