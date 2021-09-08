import { Layout } from "../../components/layout/Layout";
import Link from 'next/link';

export default function Eror404() {

    return (
        <Layout>
            <div>
                <h1> Page Not Found </h1>

                <Link href='/' >
                    <button className="boton bg-color" >Volvel a inicio</button>
                </Link>

            </div>

            <style jsx>{`

                div{
                    margin-top:3rem;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    justify-content: center;
                }
                h1{
                }
                `}
            </style>
        </Layout>
    )

}