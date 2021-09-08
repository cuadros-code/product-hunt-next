import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layout/Layout'
import { DetallesProducto } from '../../components/ui/DetallesProducto'
import { obtenerProductoFirebase } from '../../firebase/firebase-actions'
import Router from 'next/router'

export default function Populares() {

    const [products, setProducts] = useState([])

    useEffect(() => {

        const obtenerProductos = async () => {
            const productos = await obtenerProductoFirebase('votos')
            if (productos.error) return Router.push('/')
            setProducts(productos)
        }
        obtenerProductos()

    }, [])

    return (
        <Layout>
            <div className="listado-productos">
                <div className="contenedor">
                    <ul className="bg-white">

                        {
                            products.length === 0 &&
                            <h1>No Hay Productos Registrados</h1>
                        }

                        {
                            products?.map(producto => (
                                <DetallesProducto
                                    producto={producto}
                                    key={producto.id}
                                />
                            ))
                        }
                    </ul>
                </div>
            </div>
        </Layout>
    )
}