import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { SeriesService } from "../services/series.services"
import Series from "../models/Series"
import { StarRating } from "../components/StarRating"

function SeriesDetail() {
  const {id} = useParams()
  const [series, setSeries] = useState<Series>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(()=>{
    setLoading(true)
    //if(!id) return
    SeriesService
      .getById(Number(id))
      .then(setSeries)
      .catch((error) => setError(error.message))
      .finally(()=>setLoading(false))
  },[id])




  if(loading) return <div>Loading...</div>
  if(error) return <div>Error: {error}</div>
  if(!series) return <div>Serie no encontrada</div>

  return (
    <div className="text-white">
      <div className="text-4xl font-extrabold dark:text-white">{series.title}</div>
      <div className="text-2xl font-extrabold dark:text-white">{series.description}</div>
      <StarRating idSeries={Number(id)} />
      <div>Activa: {series.active?'SI':'NO'}</div>
      <div>Email de contacto: {series.contactEmail}</div>
      <div>Fecha publicación: {new Date(series.published).toLocaleString()}</div>
      <div>Fecha finalización: {new Date(series.expired).toLocaleString()}</div>
      {series.location &&
      <div>
        Localización:
      <iframe width="100%" height="300" loading="lazy" 
      src={`https://www.google.com/maps?q=${series.location}&output=embed`}
      >
      </iframe>
    </div>
  }
    </div>
  )
}

export default SeriesDetail