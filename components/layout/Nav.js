import React, { useContext } from 'react'
import Link from 'next/link'
import { contextFirebase } from '../../firebase/contextFirebase'

export const Nav = () => {

    const { userAuth } = useContext(contextFirebase)
    return (
        <>
            <nav>
                <div>
                    <Link href="/" >  Inicio </Link>
                    <Link href="/populares" >  Populares </Link>
                    {
                        userAuth
                        &&
                        <Link href="/nuevo-producto" >  Nuevo Producto </Link>
                    }
                </div>
            </nav>

            <style jsx>{`
                nav{
                    padding-left: 2rem;
                    
                }
                a {
                    padding-left: 2rem;
                }
               
            `}
            </style>
        </>
    )
}
