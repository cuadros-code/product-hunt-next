import React, { useEffect, useState } from 'react'

export const ShowComments = ({ comentario, productoId }) => {

	const [equalUser, setEqualUser] = useState(false)

	useEffect(() => {

		if (productoId === comentario.uid) {
			return setEqualUser(true)
		}
		setEqualUser(false)

	}, [comentario])


	return (
		<>
			<div>
				<p>{comentario.comentario} {equalUser && <span className="creador">creador</span>} </p>
				<p><span> Escrito por:</span>  {comentario.nombreUsuario}</p>
			</div>

			<style jsx>{`

            .creador{
							background-color: rgba(0,179,126,.2);
							padding: 0 7px 0 7px;
							font-size: 14px;
							border-radius: 5px;
							color: #056d4e;
            }
            div{
                 border-bottom: 1px solid #e1e1e1;
            }
            span{
                font-weight: bold;
                }
            `}
			</style>
		</>
	)
}
