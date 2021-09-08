import React, { useState } from 'react'
import Router from 'next/router'
import { Layout } from '../../components/layout/Layout'
import { registerEmailAndPassword } from '../../firebase/firebase-actions'
import { useForm } from '../../hooks/useForm'
import { validationRegister } from '../../validation/validationRegister'
import { contextFirebase } from '../../firebase/contextFirebase'

const initialState = {
    nombre: '',
    email: '',
    password: '',
}

export default function Registro() {

    const [errorState, setError] = useState(null)

    const register = async () => {
        try {
            await registerEmailAndPassword(nombre, email, password)
            Router.push('/')
            setError(null)
        } catch (error) {
            setError(error.message)
        }
    }

    const {
        valueForm,
        error,
        handleSubmit,
        handleChange } = useForm(initialState, validationRegister, register)

    const { nombre, email, password } = valueForm

    return (
        <Layout>
            <div >
                <h1>Registro</h1>
                <form
                    className="formulario"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
                    <div
                        className="campo-formulario"
                    >
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            placeholder="Tu Nombre"
                            onChange={handleChange}
                            value={nombre}
                        />
                    </div>
                    {error.nombre && <p className="alerta-error" >{error.nombre}</p>}
                    <div
                        className="campo-formulario"
                    >
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Tu Email"
                            onChange={handleChange}
                            value={email}
                        />
                    </div>
                    {error.email && <p className="alerta-error" >{error.email}</p>}
                    <div
                        className="campo-formulario"
                    >
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Tu Contraseña"
                            onChange={handleChange}
                            value={password}
                        />
                    </div>
                    {error.password && <p className="alerta-error" >{error.password}</p>}

                    {errorState && <p className="alerta-error" >{errorState}</p>}

                    <button
                        type="submit"
                        className="btn-registro"
                    >
                        Registrarse
                    </button>
                </form>
            </div>

            <style jsx>{`
                h1{
                    text-align: center;
                    margin-top: 3rem;
                }
                .alerta-error{
                    background-color: #FD6A72;
                    text-align: center;
                    color: white;
                    height: 30px;
                    line-height: 30px;
                    border-radius: 15px;
                    margin: 1.5rem 0 1.5rem 0;
                }
                `}
            </style>
        </Layout>
    )
}
