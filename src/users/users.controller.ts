import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {UserRequestDecorator} from "./user-request.decorator";
import {CreateRequestUserDto} from "./dto/create-request-user.dto";

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.userService.getAllUsers()
    }

    @Roles("USER")
    @UseGuards(RolesGuard)
    @Post('movieId/:id/add')
    setCinemaToFavorite(@Param('id') id: number, @UserRequestDecorator() req: CreateRequestUserDto) {
        return this.userService.setToFavorite(id, req)
    }

    @Roles("USER")
    @UseGuards(RolesGuard)
    @Delete('movieId/:id/delete')
    deleteCinemaFromFavorite(@Param('id') id: number, @UserRequestDecorator() req: CreateRequestUserDto) {
        return this.userService.deleteFromFavorite(id, req)
    }
}
