import { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';

import { Layout } from "../../components/layout/Layout";
import {
	actualizarComentarios,
	actualizarVotos,
	obtenerProductoById,
	eliminarProducto
} from "../../firebase/firebase-actions";

import { formarDate } from "../../helpers/formatDate";
import { contextFirebase } from "../../firebase/contextFirebase";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { FormAddComment } from "../../components/ui/FormAddComment";
import { ShowComments } from "../../components/ui/ShowComments";

export default function Producto() {

	const [producto, setProducto] = useState([])
	const { userAuth } = useContext(contextFirebase)

	const router = useRouter()
	const { query } = router

	useEffect(async () => {
		if (query.id) {
			const data = await obtenerProductoById(query.id)
			if (data?.error) return router.push('/404')
			if (data) return setProducto(data)
		}
	}, [query.id])

	const fechaFormateada = formarDate(producto.creado)

	const handleClickVoto = async () => {
		if (!userAuth) return router.push('iniciar-sesion')

		if (producto.haVotado.includes(userAuth.uid)) {
			return console.log('usted ya a votado');
		}
		const totalVotos = producto.votos + 1
		const registrarVoto = [...producto.haVotado, userAuth.uid]
		await actualizarVotos(producto.id, { totalVotos, registrarVoto })
		setProducto({
			...producto,
			votos: totalVotos,
			haVotado: registrarVoto
		})

	}

	const onSubmitComment = async (values) => {
		if (!userAuth) return router.push('iniciar-sesion')
		values.uid = userAuth.uid
		values.nombreUsuario = userAuth.displayName
		values.id = new Date().getTime()

		const nuevosComentarios = [values, ...producto.comentarios]
		await actualizarComentarios(producto.id, nuevosComentarios)
		setProducto({
			...producto,
			comentarios: nuevosComentarios
		})
	}

	const handleDeleteProduct = async () => {
		await eliminarProducto(producto.id)
		router.push('/')
	}


	return (
		<>
			<Layout>
				{producto.length === 0 &&
					<div className="loader">
						<Loader type="Rings" color="#00BFFF" height={80} width={80} />
					</div>
				}

				<div className="contenedor">
					<h1>{producto.nombre}</h1>

					<div className="contenedor-prod">
						<div>

							<p>Publicado el: {fechaFormateada}</p>
							<p>Publicado por: {producto?.creador?.nombre} de {producto?.empresa}</p>


							<img src={producto.urlImagen} alt="" />
							<p>{producto.descripcion}</p>

							<div className="formulario">
								{
									userAuth

									&&

									<FormAddComment
										onSubmitComment={onSubmitComment}
									/>
								}
								<h2>Comentarios</h2>
								{
									producto.comentarios &&
									producto?.comentarios.map(comentario => (
										<ShowComments
											comentario={comentario}
											productoId={producto.creador.id}
											key={comentario.id}
										/>
									))
								}


							</div>


						</div>
						<aside className="aside">

							{
								userAuth?.uid === producto?.creador?.id
								&&
								<button
									className="boton bg-color delete-product"
									onClick={handleDeleteProduct}
								>
									Eliminar Producto
							</button>
							}

							<a
								className="boton bg-color url"
								target="_blank"
								href={producto.url}
							>
								Visitar URL
              </a>


							<p className="votos">{producto.votos} Votos</p>
							{
								userAuth
								&&
								<button
									className="boton"
									onClick={handleClickVoto}
								>
									Votar
                </button>
							}
						</aside>
					</div>
				</div>
			</Layout>

			<style jsx>{`

								.delete-product{
									font-size: 12px;
									background-color: #e31a40 !important;
									margin-bottom: 5px;
								}
                .votos{
                    text-align: center;
                }
                .url{
                    margin-bottom: 3rem;
                }
                .aside{
                    padding: 0 1.3rem 0 1.3rem;
                }
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
                .loader{
                    text-align: center;
                    margin-top: 4rem;
                }
                h1{
                    text-align: center;
                }
                h2{
                    margin-top: 2rem;
                }

                @media (min-width: 768px){
                    .contenedor-prod{
                        display: grid;
                        grid-template-columns: 2fr 1fr;
                        column-gap: 1.5rem;
                    }
                }
                `}
			</style>
		</>

	)
}