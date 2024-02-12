import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Roles } from './roles.model';
import { UserRoles } from './user-roles';
import { Users } from '../users/users.model';

@Module({
  imports: [SequelizeModule.forFeature([Roles, Users, UserRoles])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
