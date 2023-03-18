import {Controller, Get, Param, Query} from '@nestjs/common';
import {CinemaService} from "./cinema.service";
import {CinemaQueryDto} from "./dto/cinema-query.dto";

@Controller('cinemas')
export class CinemaController {

    constructor(private cinemaService: CinemaService) {}

    @Get('')
    getAll(@Query() query: CinemaQueryDto) {
        return this.cinemaService.getAllCinemas(query)
    }

    @Get('movieId/:id')
    getOne(@Param('id') id: number) {
        return this.cinemaService.getOneCinema(id)
    }

    @Get('search/:cinemaName')
    getByName(@Param('cinemaName') cinemaName: string) {
        return this.cinemaService.getCinemaByName(cinemaName)
    }

}
