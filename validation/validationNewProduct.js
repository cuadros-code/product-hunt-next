export const validationNewProduct = (inputs) => {
    let errors = {}

    if (!inputs.nombre) {
        errors.nombre = "El nombre del producto es obligatorio"
    }
    if (!inputs.empresa) {
        errors.empresa = "El nombre de la empresa es obligatorio"
    }
    if (!inputs.url) {
        errors.url = "La url es obligatorio"
    }
    // if (!inputs.imagen) {
    //     errors.imagen = "La Imagen es obligatoria"
    // }
    if (!inputs.descripcion) {
        errors.descripcion = "La descripción es obligatorio"
    }



    return errors
}
