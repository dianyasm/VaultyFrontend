import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Series from '../models/Series'
import { SeriesService } from '../services/series.services'
import { useNavigate, useParams } from 'react-router-dom'
import { Temporal } from 'temporal-polyfill'
import toast from 'react-hot-toast'
import { GenreService } from '../services/genreService'
import Genre from '../models/Genre'
import InputForm from '../components/InputForm'
import ErrorMsgData from '../utils/ErrorMsgData'
import TextAreaInputForm from '../components/TextAreaInputForm'

// - formulario de creación de 1 oferta
// -- Actualizar una oferta


const SeriesForm = () => {
  const { id } = useParams(); // Obtiene el id de la URL
  const [series, setSeries] = useState<Series | null>(null); // Estado para la serie
  const [genres, setGenres] = useState<Genre[]>([]); // Estado para géneros
  const [form, setForm] = useState<Series>({
    title: "",
    description: "",
    genre: "",
    active: true,
    contactEmail: "",
    location: "",
    published: Temporal.Now.plainDateISO().toString(),
    expired: Temporal.PlainDate.from("2025-12-31").toString(),
  });

  const [errorMsg, setErrorMsg] = useState<ErrorMsgData | null>(null); // Estado para errores
  const navigate = useNavigate();

  // Cargar los géneros y la serie si existe un id
  useEffect(() => {
    GenreService.getAll().then(setGenres);

    if (id) {
      SeriesService.getById(Number(id)).then(setSeries);
    }
  }, [id]);

  // Manejar el envío del formulario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newSeries = { ...form, id: Number(id) };
    SeriesService.save(newSeries).then(() => {
      toast.success(id ? "Serie actualizada con éxito!" : "Serie añadida con éxito!");
      navigate("/dashboard");
    }).catch((error) => toast.error("Error al guardar la serie"));
  };

  // Manejar los cambios en los campos del formulario
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-4">
        <InputForm
          label="Título"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Escribe el título de la serie"
          required={true}
        />
        {errorMsg?.title && <span className="text-red-500">{errorMsg.title}</span>}
      </div>

      <div className="mb-4">
        <TextAreaInputForm
          label="Descripción"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Escribe una breve descripción de la serie"
          required={true}
        />
        {errorMsg?.description && <span className="text-red-500">{errorMsg.description}</span>}
      </div>

      <div className="mb-4">
        <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Género</label>
        <select
          id="genre"
          name="genre"
          value={form.genre}
          onChange={handleChange}
          className="mt-2 w-full p-2 border rounded-md"
          required
        >
          {genres.map(genre => (
            <option key={genre.id} value={genre.name}>{genre.name}</option>
          ))}
        </select>
        {errorMsg?.genre && <span className="text-red-500">{errorMsg.genre}</span>}
      </div>

      <div className="mb-4">
        <InputForm
          label="Correo de contacto"
          name="contactEmail"
          value={form.contactEmail}
          onChange={handleChange}
          placeholder="correo@ejemplo.com"
          required={true}
        />
        {errorMsg?.contactEmail && <span className="text-red-500">{errorMsg.contactEmail}</span>}
      </div>

      <button type="submit" className="bg-blue-600 text-white p-3 rounded-md">Guardar Serie</button>
    </form>
  );
};

export default SeriesForm;