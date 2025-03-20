import { ChangeEvent, useState } from 'react'



function useFormHook<T>(initialform: T) {

    //Estados
    const [dataForm, setDataForm] = useState(initialform)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    //Control formulario

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

        const { value, name } = e.target
        setDataForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));

    }

    const reset = () => { setDataForm(initialform) }

    return { dataForm: dataForm, handleChange, setDataForm: setDataForm, error, setError, loading, setLoading, reset }
}

export default useFormHook