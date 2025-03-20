import { fetchAPI } from "../utils/FetchAPI"
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

export class RateService {
    static async getMyRate(seriesId: number) {
        return await fetchAPI(API_URL_BASE+`/serise/${seriesId}/myRate`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

    static async getGlobalRate(seriesId: number) {
        return await fetchAPI(API_URL_BASE+`/series/${seriesId}/rate`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

    static async rate(seriesId: number, value: number) {
        return await fetchAPI(API_URL_BASE+`/series/${seriesId}/rate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({value}),
            credentials: 'include'
        })
    }


}