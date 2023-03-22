import {Injectable,} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {firstValueFrom, map} from "rxjs";
import * as process from "process";
import {InjectModel} from "@nestjs/sequelize";
import {Cinema} from "./cinema.model";
import {CinemaResponse, CinemaModel, ResultResponse} from "./interfaces/cinema.interface";
import {CinemaQueryDto} from "./dto/cinema-query.dto";

@Injectable()
export class CinemaService {

    constructor(private readonly httpService: HttpService,
                @InjectModel(Cinema) private cinemaRepository: typeof Cinema) {
    }

    async getAllCinemas(query: CinemaQueryDto): Promise<CinemaResponse<CinemaModel>> {
        const response = await firstValueFrom(
                this.httpService
                .get<CinemaResponse<ResultResponse>>(`${process.env.API_LINK}/movie/${query.tag}?api_key=${process.env.API_KEY}&page=${query.page}&language=uk-UA`)
                .pipe(
                    map(response => response.data),
                    map(data => {
                        const sortedData = data.results.map(item => {
                            return {
                                description: item.overview.slice(0, 50),
                                name: item.title,
                                cinemaNumber: item.id,
                                image: item.poster_path,
                                date: item.release_date,
                                language: item.original_language,
                                rate: Number((item.vote_average * 10).toFixed(1))
                            }
                        })
                        return {
                            page: data.page,
                            results: sortedData,
                            total_pages: data.total_pages,
                            total_results: data.total_results
                        }
                    })
                )
        )
        return response
    }

    async getOneCinema(id: number): Promise<CinemaModel> {
        const response = await firstValueFrom(
            this.httpService
                .get<ResultResponse>(`${process.env.API_LINK}/movie/${id}?api_key=${process.env.API_KEY}&language=uk-UA`)
                .pipe(
                    map(response => response.data),
                    map(data => {
                        return {
                            description: data.overview,
                            name: data.title,
                            cinemaNumber: data.id,
                            image: data.poster_path,
                            date: data.release_date,
                            language: data.original_language,
                            rate: Number((data.vote_average * 10).toFixed(1))
                        }
                    })
                )
        )
        return response
    }

    async getCinemaFromDataBase(cinemaNumber: number): Promise<Cinema> {
        const cinema = await this.cinemaRepository.findOne({where: {cinemaNumber}})
        return cinema
    }

    async getCinemaByName(cinemaName: string): Promise<CinemaResponse<CinemaModel>> {
        const response = await firstValueFrom(
            this.httpService
                .get<CinemaResponse<ResultResponse>>(`${process.env.API_LINK}/search/movie?api_key=${process.env.API_KEY}&query=${cinemaName}&language=uk-UA`)
                .pipe(
                    map(response => response.data),
                    map(data => {
                        const sortedData = data.results.map(item => {
                            return {
                                description: item.overview.slice(0, 50),
                                name: item.title,
                                cinemaNumber: item.id,
                                image: item.poster_path,
                                date: item.release_date,
                                language: item.original_language,
                                rate: Number((item.vote_average * 10).toFixed(1))
                            }
                        })
                        return {
                            page: data.page,
                            results: sortedData,
                            total_pages: data.total_pages,
                            total_results: data.total_results
                        }
                    })
                )
        )
        return response
    }

}