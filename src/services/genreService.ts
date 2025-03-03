import Genre from "../models/Genre"
import { fetchAPI } from "../utils/FetchAPI"
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

export class GenreService {
    static async getAll() {
        return await fetchAPI(API_URL_BASE+'/genre?',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

    static async getById(id:number) {
        return await fetchAPI(API_URL_BASE+'/genre/'+id,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

    static async create(genre: Partial<Genre>) {
        return await fetchAPI(API_URL_BASE+'/genre/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(genre),
            credentials: 'include'
        })
    }

    static async update(id:number, genre: Partial<Genre>) {
        return await fetchAPI(API_URL_BASE+'/genre/'+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(genre),
            credentials: 'include'
        })
    }
    static async delete(id: number){
        return await fetchAPI(API_URL_BASE+'/genre/'+id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }



}