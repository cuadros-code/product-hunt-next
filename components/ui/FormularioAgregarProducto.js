import React, { useContext, useEffect, useState } from 'react'
import { contextFirebase } from '../../firebase/contextFirebase'
import Router from 'next/router'
import { useForm } from '../../hooks/useForm'
import { validationNewProduct } from '../../validation/validationNewProduct'
import { addProductFirebase, uploadImage } from '../../firebase/firebase-actions'
import FileUploader from "react-firebase-file-uploader";
import { storage } from '../../firebase/config'

const initialState = {
    nombre: '',
    empresa: '',
    url: 'https://planetatecnologico.tech/',
    imagen: '',
    descripcion: '',
}

export const FormularioAgregarProducto = () => {

    const [, setNombreImagen] = useState('')
    const [, setSubiendo] = useState(false)
    const [, setProgreso] = useState(0)
    const [urlImagen, setUrlImagen] = useState('')

    const [errorState,] = useState(null)

    const { userAuth } = useContext(contextFirebase)



    useEffect(() => {
        if (!userAuth) {
            return Router.push('/iniciar-sesion')
        }
    }, [])


    const addProduct = () => {

        if (!userAuth) {
            return Router.push('/iniciar-sesion')
        }
        const producto = {
            nombre,
            empresa,
            url,
            urlImagen,
            descripcion,
            votos: 0,
            comentarios: [],
            creado: Date.now(),
            creador: {
                id: userAuth.uid,
                nombre: userAuth.displayName
            },
            haVotado: []
        }

        addProductFirebase(producto)
        reset()
        Router.push('/')
    }

    const {
        valueForm,
        error,
        handleSubmit,
        handleChange, reset } = useForm(initialState, validationNewProduct, addProduct)

    const { nombre, empresa, url, descripcion } = valueForm

    const handleUploadStart = () => {
        setProgreso(0)
        setSubiendo(true)
    }

    const handleProgress = (progreso) => {
        setProgreso(progreso)
    }

    const handleUploadError = (error) => {
        setSubiendo(error)
        console.log(error)
    }

    const handleUploadSuccess = async (nombre) => {
        setProgreso(100)
        setSubiendo(false)
        setNombreImagen(nombre)
        try {
            const urlImagenReady = await uploadImage(nombre)
            setUrlImagen(urlImagenReady)
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div>
            <div >
                <h1>Agregar Producto</h1>
                <form
                    className="formulario"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
                    <fieldset>
                        <legend>Información general</legend>

                        <div
                            className="campo-formulario"
                        >
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                id="nombre"
                                placeholder="Nombre del producto"
                                onChange={handleChange}
                                value={nombre}
                            />
                        </div>
                        {error.nombre && <p className="alerta-error" >{error.nombre}</p>}

                        <div
                            className="campo-formulario"
                        >
                            <label htmlFor="empresa">Empresa</label>
                            <input
                                type="text"
                                name="empresa"
                                id="empresa"
                                placeholder="Empresa del producto"
                                onChange={handleChange}
                                value={empresa}
                            />
                        </div>
                        {error.empresa && <p className="alerta-error" >{error.empresa}</p>}

                        <div
                            className="campo-formulario"
                        >
                            <label htmlFor="imagen">Imagen</label>
                            <FileUploader
                                accept="image/*"
                                randomizeFilename
                                storageRef={storage.ref('productos')}
                                onUploadStart={handleUploadStart}
                                onUploadError={handleUploadError}
                                onUploadSuccess={handleUploadSuccess}
                                onProgress={handleProgress}
                                name="imagen"
                                id="imagen"

                            />
                        </div>
                        {/* {error.imagen && <p className="alerta-error" >{error.imagen}</p>} */}

                        <div
                            className="campo-formulario"
                        >
                            <label htmlFor="url">Url del producto</label>
                            <input
                                type="url"
                                name="url"
                                id="url"
                                placeholder="Url del producto"
                                onChange={handleChange}
                                value={url}
                            />
                        </div>
                        {error.url && <p className="alerta-error" >{error.url}</p>}

                    </fieldset>

                    <fieldset>
                        <legend>Sobre tu producto</legend>

                        <div
                            className="campo-formulario"
                        >
                            <label htmlFor="descripcion">Descripción</label>
                            <textarea
                                name="descripcion"
                                id="descripcion"
                                placeholder="Descripcion del producto"
                                onChange={handleChange}
                                value={descripcion}
                            />
                        </div>
                        {error.descripcion && <p className="alerta-error" >{error.descripcion}</p>}

                    </fieldset>


                    {errorState && <p className="alerta-error" >{errorState}</p>}

                    <button
                        type="submit"
                        className="btn-registro mb-5"
                    >
                        Agregar Producto
                    </button>
                </form>
            </div>
            <style jsx>{`

                fieldset{
                    font-size: 1rem;
                    margin-top: 1rem;
                    border: 1px solid #e1e1e1;
                }
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
                
                textarea{
                    width: 100%;
                    height:110px;
                    resize: none;
                }

                .mb-5{
                    margin-bottom: 3rem;
                    margin-top: 2rem;
                }
                `}
            </style>
        </div>
    )
}
