import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Users } from "./users.model";
import {UserRoles} from "../roles/user-roles";
import {Roles} from "../roles/roles.model";
import {RolesModule} from "../roles/roles.module";
import {JwtStrategy} from "../auth/jwt.strategy";
import {AuthGuard} from "../auth/auth.guard";
import {AuthService} from "../auth/auth.service";

@Module({
  imports: [
    SequelizeModule.forFeature([Users, Roles, UserRoles]),
    RolesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService]
})
export class UsersModule {}
