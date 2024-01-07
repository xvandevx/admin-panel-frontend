import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";

@Controller('roles')
export class RolesController {
  constructor(
      private readonly rolesService: RolesService,
  ) {}

  @Post()
  create(@Body() rolesDto: CreateRoleDto) {
    return this.rolesService.add(rolesDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() rolesDto: UpdateRoleDto) {
    return this.rolesService.update(id, rolesDto);
  }

  @Get()
  getAll() {
    return this.rolesService.getAll()
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.rolesService.delete(id)
  }
}
