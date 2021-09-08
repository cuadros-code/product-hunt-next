import { firebase, db, storage } from './config'


export const registerEmailAndPassword = async (nombre, email, password) => {
    const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password)
    await user.updateProfile({ displayName: nombre })

}

export const loginWithEmailAndPassword = async (email, password) => {
    const user = await firebase.auth().signInWithEmailAndPassword(email, password)
    return user
}

export const signOutSession = async () => {
    return await firebase.auth().signOut()
}

export const addProductFirebase = (product) => {
    db.collection('producto').add(product)
}

export const uploadImage = (nombre) => {
    return storage
        .ref('productos')
        .child(nombre)
        .getDownloadURL()
        .then(url => {
            return url
        })
}

export const obtenerProductoFirebase = async (tipoOrden) => {

    try {
        const productosSnap = await db.collection('producto')
            .orderBy(tipoOrden, 'desc')
            .get()

        const productos = []
        productosSnap.forEach(snap => {
            productos.push({
                id: snap.id,
                ...snap.data()
            })
        })
        return productos

    } catch (error) {
        return {
            error: true
        }
    }
}

export const obtenerProductoById = async (id) => {

    try {
        const query = await db.collection('producto').doc(id)
        const producto = (await query.get()).data()
        producto.id = (await query.get()).id
        return producto
    } catch (error) {
        console.log(error)
        return {
            error: true
        }
    }

}

export const actualizarVotos = async (id, data) => {
    await db.collection('producto')
        .doc(id)
        .update({
            votos: data.totalVotos,
            haVotado: data.registrarVoto
        })
}


export const actualizarComentarios = async (id, comentarios) => {
    await db.collection('producto')
        .doc(id)
        .update({ comentarios })
}

export const eliminarProducto = async (id) => {
    await db.collection('producto')
        .doc(id)
        .delete()
}