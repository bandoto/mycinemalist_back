import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {CreateUserDto, LoginUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {UserRequestDecorator} from "../users/user-request.decorator";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {CreateRequestUserDto} from "../users/dto/create-request-user.dto";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('/login')
    login(@Body() userDto: LoginUserDto) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/me')
    getMe(@UserRequestDecorator() req: CreateRequestUserDto) {
        return this.authService.getMe(req)
    }
}
