// import Head from 'next/head'

import { memo, useEffect, useState } from "react";
import { Layout } from "../components/layout/Layout";
import { DetallesProducto } from "../components/ui/DetallesProducto";
import { obtenerProductoFirebase } from "../firebase/firebase-actions";

const Home = memo(() => {

  const [products, setProducts] = useState([])

  useEffect(() => {

    const obtenerProductos = async () => {
      const productos = await obtenerProductoFirebase('creado')
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
})

export default Home