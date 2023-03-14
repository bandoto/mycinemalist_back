export interface CinemaResponse {
    page: number,
    results: ResultResponse[]
}

export interface ResultResponse {
    id: number;
    overview: string;
    title: string;
    poster_path: string | null
}

export interface CinemaModel {
    cinemaNumber: number,
    name: string,
    description: string,
    image: string | null
}