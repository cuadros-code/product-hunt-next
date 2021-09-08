import React from 'react'
import { formarDate } from '../../helpers/formatDate'
import Link from 'next/link'
import { obtenerProductoFirebase } from '../../firebase/firebase-actions'



export const DetallesProducto = ({ producto }) => {

    // const fecha = formarDate(producto.creado)

    return (
        <>
            <li>
                <div className="">
                    <div className="container-info" >
                        <img
                            className="img-producto"
                            src={producto?.urlImagen}
                            alt=""
                        />
                        <div>
                            <Link href="/producto/[id]" as={`/producto/${producto.id}`}>
                                <p className="nombre-producto" >{producto?.nombre}</p>
                            </Link>
                            <p className="descripcion-producto" >{producto?.descripcion}</p>

                            <button className="btn-comentarios">
                                <img className="img-icon" src="/static/img/Message.ico" alt="" />
                                {producto?.comentarios?.length}
                            </button>
                            {/* <p>Publicado: <span>{fecha}</span></p> */}
                        </div>
                    </div>
                </div>
                <div className="votos">
                    <div className="info-votos">
                        <div className="icono-voto">
                            <div>&#9650;</div>
                        </div>
                        <p>{producto.votos}</p>
                    </div>
                </div>

            </li>

            <style jsx>{`
                li{
                    display: list-item;
                    text-align: -webkit-match-parent;
                    padding: 20px 104px 20px 20px;
                    border-bottom: 1px solid #e8e8e8;
                    cursor: pointer;
                }
                .img-producto{
                    width: 100px;
                    height: 100px;
                    object-fit: cover;
                }
                .container-info{
                    display: flex;
                }
                .nombre-producto{
                    position: relative;
                    font-size: 1.2rem;
                    font-weight: 700;
                    top: -10px;
                    padding-left: 10px;
                }
                .descripcion-producto{
                    padding-left: 10px;
                    position: relative;
                    top: -25px;
                    margin: 0px
                }
                .btn-comentarios{
                    
                    width: auto;
                    margin-left: 10px;
                    height: 25px;
                    border: 1px solid #d1d1d1;
                    border-radius: 5px;
                }
                .img-icon{
                    margin-right: 5px;
                    width: 15px;
                    position: relative;
                    bottom: -2px;
                }
                .votos{
                    
                    position: relative;
        
                }
                .info-votos{
                    position: absolute;
                    right: -80px;
                    height: 70px;
                    width: 70px;
                    border: 1px solid #d1d1d1;
                    top: -80px;
                    text-align: center;
                }
                .icono-voto{
                    position: relative;
                    bottom: -10px;
                }
                `}
            </style>
        </>
    )
}


export async function getServerSideProps() {
    const producto = await obtenerProductoFirebase()
    return { props: { producto } }
}