import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SeriesService } from "../services/series.services";
import Series from "../models/Series";
import { StarRating } from "../components/StarRating";

function SeriesDetail() {
  const { id } = useParams();
  const [series, setSeries] = useState<Series>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    SeriesService
      .getById(Number(id))
      .then(setSeries)
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!series) return <div>Serie no encontrada</div>;

  return (
    <div className="text-white p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-4">{series.title}</h1>
      <p className="text-lg italic mb-4">{series.description}</p>
      <StarRating idSerie={Number(id)} />
      <div className="mt-4">
        <strong>Estado:</strong> {series.active ? 'Activa' : 'Finalizada'}
      </div>
      {series.genre && (
        <div className="mt-2">
          <strong>Género:</strong> {series.genre}
        </div>
      )}
      {series.episodes && (
        <div className="mt-2">
          <strong>Número de episodios:</strong> {series.episodes}
        </div>
      )}
      {series.seasons && (
        <div className="mt-2">
          <strong>Número de temporadas:</strong> {series.seasons}
        </div>
      )}
  
    </div>
  );
}

export default SeriesDetail;