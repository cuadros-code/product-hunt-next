import { useEffect, useState } from "react"

export const useForm = (initialState, validation, fn) => {

    const [valueForm, setValueForm] = useState(initialState)
    const [error, setError] = useState({})
    const [submitForm, setSubmitForm] = useState(false)

    useEffect(() => {
        if (submitForm) {
            const notError = Object.keys(error).length === 0
            if (notError) {
                fn()
                setSubmitForm(false)
            }
        }
    }, [error])


    const handleChange = ({ target }) => {
        setValueForm({
            ...valueForm,
            [target.name]: target.value
        })
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        const errorOnValidation = validation(valueForm)
        setError(errorOnValidation)
        setSubmitForm(true)
    }

    const reset = () => {
        setValueForm(initialState)
    }

    return {
        valueForm,
        error,
        handleSubmit,
        handleChange,
        reset
    }
}
