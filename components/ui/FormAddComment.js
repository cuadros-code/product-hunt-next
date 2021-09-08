import React, { useState } from 'react'

export const FormAddComment = ({ setFormComment, onSubmitComment }) => {

    const [formValue, setFormValue] = useState({
        comentario: ''
    })

    const { comentario } = formValue

    const handleOnSubmitComment = (e) => {
        e.preventDefault()
        if (comentario.length === 0) return
        onSubmitComment(formValue)
    }

    const handleOnChange = ({ target }) => {
        setFormValue({
            ...formValue,
            [target.name]: target.value
        })
    }
    return (
        <>
            <label htmlFor="comentario">Agrega tu comentario</label>
            <form
                onSubmit={handleOnSubmitComment}
                autoComplete="off"
            >
                <input
                    type="text"
                    id="comentario"
                    name="comentario"
                    value={comentario}
                    onChange={handleOnChange}
                />
                <button
                    className="boton bg-color"
                    type="submit"
                >
                    Agregar
                </button>
            </form>

            <style jsx>{`
                .boton{
                    display: block;
                    width: 100%;
                    text-align: center;
                }
                label{
                    font-size:1.5rem;
                    margin-bottom: 1rem;
                }

                input{
                    height: 35px;
                    margin-bottom: 1rem;
                    width: 100%;

                }
                button{
                    width: 100%;
                    font-size:1rem;
                }

                .formulario{
                    display: inline-flex;
                    flex-direction: column;
                    width: 100%;
                }
                `}
            </style>
        </>
    )
}
