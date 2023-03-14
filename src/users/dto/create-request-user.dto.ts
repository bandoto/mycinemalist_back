import {CreateRoleDto} from "../../roles/dto/create-role.dto";
import {CreateCinemaFavoriteDto} from "../../cinema/dto/create-cinema-favorite.dto";

export class CreateRequestUserDto {
    readonly id: number;
    readonly username: string;
    readonly email: string;
    readonly roles: CreateRoleDto[];
    readonly cinemas: CreateCinemaFavoriteDto[];
}