import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {UserCinemas} from "../cinema/user-cinemas.model";
import {Cinema} from "../cinema/cinema.model";
import {CinemaModule} from "../cinema/cinema.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      forwardRef(() => AuthModule),
      SequelizeModule.forFeature([User, Role, Cinema, UserRoles, UserCinemas]),
      RolesModule,
      CinemaModule
  ],
    exports: [
        UsersService,
    ]
})

export class UsersModule {}
