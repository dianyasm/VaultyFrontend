import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { QuejasService } from '../services/quejas.services';
import Quejas from '../models/Quejas';
import useFormHook from '../components/FormHook';

function QuejasForm() {

  const { dataForm, handleChange, setDataForm } = useFormHook<Partial<Quejas>>({
    motivo: '',
    descripcion: '',
  })

  const { id } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      QuejasService.getById(Number(id))
        .then((data) => setDataForm({ ...data }))
        .catch((error: Error) => setError(error.message))
        .finally(() => setLoading(false));
    } else { setLoading(false) }
  }, [id, setDataForm]);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const form = {
        ...dataForm
      }
      if (id) QuejasService.update(Number(id), form)
      else QuejasService.create(form)
      navigate('/quejas');
      toast.success('Queja guardada correctamente!')
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido")
      toast.error('Error al guardar la queja')
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="text-center text-white">Cargando...</p>;

  return (
    <>
      <div className="text-white flex flex-col">
        <h2 className="text-4xl font-extrabold dark:text-white">
          Nueva Queja
        </h2>
        <form className="max-w-sm mx-auto min-w-sm" onSubmit={handleSubmit}>
          {error && <p>{error}</p>}
          <div className="mb-5">
            <label htmlFor="motivo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Motivo</label>
            <input id="motivo" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-yellow-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required name="motivo" value={dataForm.motivo} onChange={handleChange} />
          </div>
          <div className="mb-5">
            <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
            <input id="descripcion" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-yellow-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required name="descripcion" value={dataForm.descripcion} onChange={handleChange} />
          </div>
          <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-900 dark:hover:bg-red-800 dark:focus:ring-red-800"
      >
        Guardar
      </button>
        </form>
      </div>
    </>
  )
}

export default QuejasForm;