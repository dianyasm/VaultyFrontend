import { FormEvent, useEffect, useState } from "react"
import { GenreService } from "../services/genreService"
import Genre from "../models/Genre"

interface GenreFormProps{
    onSubmit: (e:FormEvent, name: string) => void
}
function GenreForm({onSubmit}:GenreFormProps) {
    const [name, setName] = useState('')
    return (
        <form onSubmit={(e)=>onSubmit(e, name)} className="text-white">
            <label htmlFor="name">Nombre:</label>
            <input id="name" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <button>Guardar</button>
        </form>
    )
}

interface GenreListProps{
    genres: Genre[]
    onDelete: (id: number) => void
}
function GenreList({genres, onDelete}: GenreListProps) {
    return (
        <div className="text-white">
        {genres.map(genre =>  
            <div key={genre.id}>
                {genre.name} -
                <button onClick={()=>onDelete(genre.id)}>Borrar</button>
            </div>
        )}
        </div>
    )
}


function GenreManager() {
    const [genres, setGenres] = useState<Genre[]>([])

    useEffect(()=>{ // cargar las categorias de la BD
        GenreService
            .getAll()
            .then(setGenres)
    }, [])

    const handleCreate = async (e: FormEvent, name: string) => { // guardar una categoria
        e.preventDefault()
        const nuevaCategory = await GenreService.create({name})
        setGenres([...genres, nuevaCategory])
    }
    
    const handleDelete = (id: number) => { // borrar una categoria
        if (!window.confirm("¿Estás seguro que quieres borrar esta categoría?"))
            return;
        GenreService.delete(id)
        setGenres(genres?.filter((genre) => genre.id !== id));
    }
    
    return (
        <div>
            <h1 className="text-4xl font-extrabold dark:text-white py-5">Gestión de generos</h1>
            <GenreForm onSubmit={handleCreate}></GenreForm>
            <GenreList genres={genres} onDelete={handleDelete}></GenreList>
        </div>
    )
}

export default GenreManager