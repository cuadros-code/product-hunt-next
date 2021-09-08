import React, { useState } from 'react'
import Router from 'next/router';
export const Buscador = () => {

    const [valueForm, setValueForm] = useState({
        buscador: ''
    })
    const { buscador } = valueForm

    const handleOnChange = ({ target }) => {
        setValueForm({
            ...valueForm,
            [target.name]: target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (buscador.trim() === '') return

        Router.push({
            pathname: '/buscar',
            query: { q: buscador }
        })

    }

    return (
        <>
            <form
                autoComplete="off"
                onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Buscar Productos"
                    name="buscador"
                    onChange={handleOnChange}
                    value={buscador}
                />
                <button>Buscar</button>
            </form>

            <style jsx>{`
                form{
                    position: relative;
                }
            input{
                border: 1px solid var(--gris3);
                padding:0.8rem;
                min-width : 300px;
            }

            button{
                height: 2.4rem;
                width: 2.4rem;
                display: block;
                background-size: 2.9rem;
                background-image: url('static/img/buscar.png');
                background-repeat: no-repeat;
                position: absolute;
                right: 0.8rem;
                top: 2px;
                background-color: white;
                border:none;
                text-indent: -9999px;
            }

             button:hover{
                cursor: pointer;
            }

        `}
            </style>
        </>
    )
}
