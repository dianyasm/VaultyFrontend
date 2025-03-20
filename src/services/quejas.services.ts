import Quejas from '../models/Quejas';
import { fetchAPI } from '../utils/FetchAPI';

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

export class QuejasService {

    static async search(motivo?: string) {
        let url = API_URL_BASE + '/quejas?'
        if (motivo) url += 'motivo=' + motivo

        return await fetchAPI(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

    static async getById(id: number) {
        return await fetchAPI(API_URL_BASE + '/quejas/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

    static async create(queja: Partial<Quejas>) {
        return await fetchAPI(API_URL_BASE + '/quejas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(queja),
            credentials: 'include'
        })
    }

    static async update(id: number, queja: Partial<Quejas>) {
        return await fetchAPI(API_URL_BASE + '/quejas/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(queja),
            credentials: 'include'
        })
    }

    static async delete(id: number) {
        return await fetchAPI(API_URL_BASE + '/quejas/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

    static async getAll() {
        return await fetchAPI(API_URL_BASE + "/quejas", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
    }

}