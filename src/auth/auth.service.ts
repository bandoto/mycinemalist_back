import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto, LoginUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import {User} from "../users/users.model";
import {CreateRequestUserDto} from "../users/dto/create-request-user.dto";

export interface authResponse {
    token: string,
    user: User
}

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService) {}

    async login(userDto: LoginUserDto): Promise<authResponse> {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto): Promise<authResponse> {
        const candidate = await this.userService.getUserByEmail(userDto.email)
        if (candidate) {
            throw new HttpException('Користувач з такою поштою вже існує', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

    private async generateToken(user: User): Promise<authResponse> {
        const payload = {email: user.email, id: user.id, username: user.username, roles: user.roles, cinemas: user.cinemas}
        return {
            user,
            token: this.jwtService.sign(payload),
        }
    }

    private async validateUser(userDto: CreateUserDto | LoginUserDto): Promise<User> {
        const user = await this.userService.getUserByEmail(userDto.email)
        if (!user) {
            throw new UnauthorizedException({message: 'Невірна пошта або пароль'})
        }
        const password = await bcrypt.compare(userDto.password, user.password)
        if (user && password) {
            return user
        }
    }

    async getMe(req: CreateRequestUserDto): Promise<authResponse> {
        const user = await this.userService.getUserByEmail(req.email)
        return this.generateToken(user)
    }
}
