import { useEffect, useState } from "react";
import { QuejasService } from "../services/quejas.services";
import Quejas from "../models/Quejas";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function QuejasList() {
  
  const {user, isAdmin, isAuthenticated } = useAuth()
  const [quejas, setQuejas] = useState<Quejas[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function call(){
      if(!isAuthenticated){
        setQuejas([])
        setLoading(false)
        return
      }
    
    try {
      const allQuejas = await QuejasService.getAll()
      
      let userQuejas = allQuejas
      if(!isAdmin){
        userQuejas = allQuejas.filter((queja: Quejas) => queja.idUser === user?.id)
      }
      setQuejas(userQuejas)
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Error desconocido"
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  call()
}, [isAdmin, isAuthenticated, user])

  return (
    <div>
      <h1 className="dark:text-amber-100 py-3 font-bold text-2xl" >Lista de Quejas</h1>

      <Link
        to="/quejas/new"
        className="text-white w-fit bg-red-900 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-900 dark:hover:bg-red-800 dark:focus:ring-blue-800"
      >
        Añadir nueva queja
      </Link>


      {loading && <p className="dark:text-white">Cargando....</p>}
      {error && <p className="dark:text-white">{error}</p>}
      {quejas?.length === 0 && <p className="dark:text-white py-2">No tienes ninguna queja</p>}
      <div className="flex flex-wrap flex-row gap-4 items-center justify-center">

        {quejas?.map((queja) => (
          <div key={queja.id} className="py-6">
              <div
                className="block max-w-sm p-5 bg-white border border-yellow-600 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-amber-900 dark:border-grey-500 dark:hover:bg-amber-800">

                <h5 className="mb-2 text-lg font-bold tracking-tight text-amber-100 dark:text-amber-100">
                  {queja.motivo}
                </h5>
                <p className="font-normal text-amber-700 dark:text-amber-100">
                  {queja.descripcion}
                </p>
              </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default QuejasList;