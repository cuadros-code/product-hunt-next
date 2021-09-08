import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { contextFirebase } from '../../firebase/contextFirebase'
import { signOutSession } from '../../firebase/firebase-actions'
import { Buscador } from '../ui/Buscador'
import { Nav } from './Nav'

export const Header = () => {

    const { userAuth } = useContext(contextFirebase)

    const handleOnSignOut = () => {
        try {
            signOutSession()
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <header>
                <div className="container">
                    <div
                        className="content-buscador"
                    >
                        <Link href="/">
                            <p className="logo">P</p>
                        </Link>

                        <Buscador />
                        <Nav />
                    </div>
                    <div className="admin-panel">
                        {
                            userAuth
                                ?
                                (
                                    <>
                                        <p className="nombre-usuario" >Hola: <strong> {userAuth.displayName}</strong></p>
                                        <button
                                            onClick={handleOnSignOut}
                                            className="boton"
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <Link href="/iniciar-sesion" >
                                            <a className="boton bg-color" >Iniciar sesión</a>
                                        </Link>
                                        <Link href="/registro.js" >
                                            <a className="boton" >Registrarse</a>
                                        </Link>
                                    </>
                                )
                        }

                    </div>
                </div>
            </header>

            <style jsx>{`
                header{
                    border-bottom: 2px solid var(--gris3);
                    padding: 0.1rem 0;
                }

                .logo{
                    color: var(--naranja);
                    font-size: 3rem;
                    line-height: 0;
                    font-weight: 700;
                    font-family: 'Roboto Slab';
                    margin-right: 2rem;
                    cursor: pointer;
                }

                .container{
                    max-width: 1200px;
                    width: 95%;
                    margin: 0 auto;
                }
                .admin-panel{
                    display: flex;
                    align-items: center;
                }
                .nombre-usuario{
                    margin-right: 2rem;
                }

                .content-buscador{
                    display: flex;
                    align-items: center;

                }
                @media (min-width: 768px){
                    .container{
                        display: flex;
                        justify-content: space-between;
                    }
                }
            `}
            </style>

        </>
    )
}
