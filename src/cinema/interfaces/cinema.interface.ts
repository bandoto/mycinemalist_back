export interface CinemaResponse<T> {
    page: number,
    results: T[],
    total_results: number,
    total_pages: number,
    dates?: Dates
}

export interface Dates {
    maximum: string,
    minimum: string
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
