import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {CreateRequestUserDto} from "./dto/create-request-user.dto";
import {CinemaService} from "../cinema/cinema.service";
import {Cinema} from "../cinema/cinema.model";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                @InjectModel(Cinema) private cinemaRepository: typeof Cinema,
                private roleService: RolesService,
                private cinemaService: CinemaService) {}

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = await this.userRepository.create(dto)
        const role = await this.roleService.getRoleByValue("USER")
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user
    }

    async setToFavorite(id: number, req: CreateRequestUserDto): Promise<User> {
        const user = await this.getUserByEmail(req.email)
        const cinemaOne = await this.cinemaService.getOneCinema(id)
        const [cinema, created] = await this.cinemaRepository.findOrCreate({
            where: {cinemaNumber: cinemaOne.cinemaNumber},
            defaults: cinemaOne
        })

        await user.$add('cinemas', [cinema.id])
        user.cinemas = [cinema]

        return user
    }

    async deleteFromFavorite(id: number, req: CreateRequestUserDto): Promise<User> {
        const user = await this.getUserByEmail(req.email)
        const cinema = await this.cinemaService.getCinemaFromDataBase(id)
        await user.$remove('cinemas', [cinema.id])

        return user
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userRepository.findAll({include: {all: true}})
        return users
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user
    }
}
