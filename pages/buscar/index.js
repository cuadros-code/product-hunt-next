import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Layout } from "../../components/layout/Layout";
import { obtenerProductoFirebase } from "../../firebase/firebase-actions";
import { DetallesProducto } from "../../components/ui/DetallesProducto";

export default function Buscar() {

    const [products, setProducts] = useState([])
    const [productosFiltrados, setProductosFiltrados] = useState([])

    const router = useRouter()
    const { query: { q: consulta } } = router


    useEffect(() => {
        const busqueda = consulta?.toLowerCase()
        const obtenerProductos = async () => {
            const productos = await obtenerProductoFirebase('votos')
            setProducts(productos)
            const filtro = products.filter(prod =>
                prod.nombre
                    .toLowerCase()
                    .includes(busqueda) ||
                prod.descripcion
                    .toLowerCase()
                    .includes(busqueda)
            )
            setProductosFiltrados(filtro)
        }
        obtenerProductos()
    }, [consulta])

    return (
        <Layout>
            <div className="listado-productos">
                <div className="contenedor">
                    <ul className="bg-white">

                        {
                            productosFiltrados.length === 0 &&
                            <h1>No Hay Productos</h1>
                        }

                        {
                            productosFiltrados?.map(producto => (
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