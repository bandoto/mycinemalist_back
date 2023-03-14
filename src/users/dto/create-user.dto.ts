import {IsEmail, IsNotEmpty, Length} from "class-validator";

export class CreateUserDto {

    @Length(3, 15)
    readonly username: string

    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    readonly password: string
}

export class LoginUserDto {

    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    readonly password: string
}
