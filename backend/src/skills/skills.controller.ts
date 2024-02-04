import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { Public } from '../common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Skills } from './skills.model';
import { SkillDto } from '../../types/skill';

@ApiBearerAuth()
@ApiTags('skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  create(@Body() skillsDto: SkillDto) {
    return this.skillsService.add(skillsDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() skillsDto: SkillDto) {
    return this.skillsService.update(id, skillsDto);
  }

  @Public()
  @Get()
  getAll(): Promise<Skills[]> {
    return this.skillsService.getAll();
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.skillsService.delete(id);
  }
}
