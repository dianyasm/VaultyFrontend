// src/components/StarRating.tsx
import { useEffect, useState } from "react";
import { RateService } from "../services/rate.services";
import { IconStar, IconStarFilled } from "@tabler/icons-react";

interface StarRatingProps {
  idSerie: number;
  /* value: number;
    onRate?: (rating: number) => void; // Callback al seleccionar una calificación
    interactive?: boolean; */
}

export function StarRating({ idSerie }: StarRatingProps) {
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [totalRatings, setTotalRatings] = useState<number>(0);
  const [myRate, setMyRate] = useState<number>(0);

  useEffect(() => {
    //if(!id) return
     RateService.getGlobalRate(idSerie).then((data) => {
      console.log("rate", data);
      setAverageRating(data.averageRating);
      setTotalRatings(data.totalRatings);
    }); 

    RateService.getMyRate(idSerie).then((rate) => setMyRate(rate.value));
  }, [idSerie, myRate]);

  const handleRate =async(rating: number) => {
    await RateService.rate(idSerie, rating);
    setMyRate(rating);
  }

  return (
    <div className="flex space-x-1 my-5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className="cursor-pointer"
          onClick={() => handleRate(star)}
        >
          {star <= myRate ? <IconStarFilled size={20} className="text-yellow-500" /> : <IconStar size={20} className="text-gray-400" />}
        </span>
      ))}
      <strong>Promedio:</strong> {averageRating ?? "N/A"} ⭐ ({totalRatings} votos)
    </div>
  );
}