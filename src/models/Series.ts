export default interface Series {
    id: number;
    title: string;
    description?: string;
    active: boolean;
    contactEmail?: string;
    location?: string;
    published: string;
    expired: string;
    genreId?: number | null;
}