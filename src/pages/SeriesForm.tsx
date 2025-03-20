import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Series from '../models/Series'
import { SeriesService } from '../services/series.services'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { GenreService } from '../services/genreService'
import Genre from '../models/Genre'
import InputForm from '../components/InputForm'
import ErrorMsgData from '../utils/ErrorMsgData'
import TextAreaInputForm from '../components/TextAreaInputForm'


function SeriesForm() {

  //const threeMonthLater = new Date( new Date().setMonth(new Date().getMonth() + 3) )
  //                    .toISOString().slice(0,16)
  const [form, setForm] = useState<Partial<Series>>({
    title: '',
    description: '',
    active: true,
    episodes: 0,
    seasons: 0,
    genreId: undefined
  })
  const [genres, setGenres] = useState<Genre[]>()

  const {id} = useParams()
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    if(id){
      
      setLoading(true)
      SeriesService.getById(Number(id))
      .then(data => setForm({
        ...data,
      }))
      .catch((error) => setErrors(error.message))
      .finally(()=>setLoading(false))

    }
  }, [id])

  useEffect(()=>{
    GenreService.getAll()
      .then(setGenres)
      .catch(error => setErrors(error.message))
  },[])

  const handleSubmit=async (e: FormEvent) =>{
    try{
      setLoading(true)
      setErrors({});
      e.preventDefault()
      const formData = {
        ...form,
        genreId: form.genreId ? Number(form.genreId) : null,
      }
      console.log(formData)
      if(id) await SeriesService.update(Number(id), formData)
        else await SeriesService.create(formData)
      toast.success('Serie guardada correctamente!')
      navigate('/series')
    }catch(error){
      toast.error('Error al guardar la serie!')
       if(Array.isArray(error)){
              const errorObj: Record<string, string> = error?.reduce((acc: Record<string, string>, err: unknown) => {
                const errorDetail = err as ErrorMsgData;
                acc[errorDetail.path] = errorDetail.msg;
                return acc;
              }, {});
              setErrors(errorObj);
            }else if(error instanceof Error){
              const msg = error instanceof Error ? error.message : "Error desconocido"
              setErrors({message: msg || 'Error desconocido'});
            }else{
              setErrors({message: error as string || 'Error desconocido'});
            }
    }finally{
      setLoading(false)
    }
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
    const {value, name} = e.target
    //if(name==='idCategory') valueNew = Number(value) 
    setForm({ ...form, [name]:value,  }) 
  }

  const handleChangeCheckbox = (e:ChangeEvent<HTMLInputElement>) =>{
    const {checked, name} = e.target
    setForm({ ...form, [name]:checked,  }) 
  }

  if(loading) return <p>Loading...</p>

  return (
    <div className='text-white flex flex-col'>
      <h2 className="text-4xl font-extrabold dark:text-white">{id?'Edición de oferta':'Inserción de nueva oferta'}</h2>

      <form className="max-w-sm mx-auto min-w-sm" onSubmit={handleSubmit}>
      
      <InputForm text="Título" name="title" value={form.title || ''} handleChange={handleChange} error={errors.title} /> 
      <TextAreaInputForm type="textarea" rows={6} text="Descripción" name="description" value={form.description || ''} handleChange={handleChange} error={errors.description} /> 
      
      <InputForm type="checkbox" text="Activa" name="active" checked={form.active} handleChange={handleChangeCheckbox} error={errors.active} /> 

      <label htmlFor="genreId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Generos:</label>
      <select id="genreId" name='genreId'  value={form.genreId ?? ""}
            onChange={handleChange}
         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="" >Seleciona categoria</option>
          {genres?.map(genre => 
            <option  key={genre.id} value={genre.id}> {genre.name} </option>
          )}
      </select>

   
      {errors && errors.message && <p className="text-center mt-4 text-red-500">{errors.message}</p>}

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Guardar
      </button>
      </form>
    </div>
  )
}

export default SeriesForm