export default interface Series {
    id: number;
    title: string;
    description?: string;
    active: boolean;
    genreId?: number | null;
    genre?: string;
    episodes?: number;
    seasons?:number;
}