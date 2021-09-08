import '../styles/globals.css'
import Head from 'next/head'
import { contextFirebase } from '../firebase/contextFirebase'
import { useFirebaseAuth } from '../hooks/useFirebaseAuth'

function MyApp({ Component, pageProps }) {

  const userAuth = useFirebaseAuth()
  return (
    <>
      <contextFirebase.Provider
        value={{
          userAuth
        }}
      >

        <Head>
          <title>Next and Firebase</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet" />
        </Head>

        <Component {...pageProps} />
      </contextFirebase.Provider>
    </>
  )
}

export default MyApp
