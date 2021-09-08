export const formarDate = (fecha) => {

    const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    const formatoDeFecha = new Intl.DateTimeFormat('es-Es', opciones)
    return formatoDeFecha.format(fecha)
}
