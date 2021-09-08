import { useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { useForm } from "../../hooks/useForm";
import { validationLogin } from "../../validation/validationLogin";
import { loginWithEmailAndPassword } from '../../firebase/firebase-actions'
import Router from 'next/router'

const initialState = {
    email: '',
    password: ''
}

export default function InicioSesion() {


    const [errorState, setError] = useState(null)

    const login = async () => {
        try {
            await loginWithEmailAndPassword(email, password)
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
        handleChange } = useForm(initialState, validationLogin, login)

    const { email, password } = valueForm


    return (
        <Layout>
            <div >
                <h1>Iniciar Sesión</h1>
                <form
                    className="formulario"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
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
                        Acceder
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