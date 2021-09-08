import { useEffect, useState } from "react"
import { firebase } from '../firebase/config'

export const useFirebaseAuth = () => {

    const [userAuth, setuserAuth] = useState(null)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setuserAuth(user)
            } else {
                setuserAuth(null)
            }
        })

    }, [])

    return userAuth
}

