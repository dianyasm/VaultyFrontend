import Series from "../models/Series";
import { fetchAPI } from "../utils/FetchAPI";
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

export class SeriesService {
  static async search(title?: string) {
    let url = API_URL_BASE+'/series?'
    if(title) url += 'title='+title

    return await fetchAPI(url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
}

static async getById(id:number) {
    return await fetchAPI(API_URL_BASE+'/series/'+id,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
}

static async create(serie: Partial<Series>) {
    return await fetchAPI(API_URL_BASE+'/series', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(serie),
        credentials: 'include'
    })
}

static async update(id:number, serie: Partial<Series>) {
    return await fetchAPI(API_URL_BASE+'/series/'+id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(serie),
        credentials: 'include'
    })
}

static async delete(id:number){
    return await fetchAPI(API_URL_BASE+'/series/'+id, {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
}
}