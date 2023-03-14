import {forwardRef, Module} from '@nestjs/common';
import { CinemaController } from './cinema.controller';
import { CinemaService } from './cinema.service';
import {HttpModule} from "@nestjs/axios";
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {UserCinemas} from "./user-cinemas.model";
import {Cinema} from "./cinema.model";
import {AuthModule} from "../auth/auth.module";

@Module({
    controllers: [CinemaController],
    providers: [CinemaService],
    imports: [
        forwardRef(() => AuthModule),
        HttpModule,
        ConfigModule.forRoot({
            envFilePath: '.env.example',
        }),
        SequelizeModule.forFeature([Cinema, User, UserCinemas]),
    ],
    exports: [
        CinemaService
    ]
})
export class CinemaModule {}
