import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleDto } from './dto/role.dto';

@ApiBearerAuth()
@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() rolesDto: RoleDto) {
    return this.rolesService.add(rolesDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() rolesDto: RoleDto) {
    return this.rolesService.update(id, rolesDto);
  }

  @Get()
  getAll() {
    return this.rolesService.getAll();
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.rolesService.delete(id);
  }
}
