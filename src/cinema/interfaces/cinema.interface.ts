export interface CinemaResponse {
    page: number,
    results: ResultResponse[]
}

export interface ResultResponse {
    id: number;
    overview: string;
    title: string;
    poster_path: string | null,
    release_date: string,
    original_language: string,
    vote_average: number
}

export interface CinemaModel {
    cinemaNumber: number,
    name: string,
    description: string,
    image: string | null,
    date: string,
    language: string,
    rate: number
}