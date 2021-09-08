export const validationLogin = (inputs) => {
    let errors = {}

    if (!inputs.email) {
        errors.email = "El email es obligatorio"
    }
    if (!inputs.password) {
        errors.password = "El password es obligatorio"
    }
    return errors
}
