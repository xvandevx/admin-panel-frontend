import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillsDto } from "./dto/create-skills.dto";
import {CreateContentDto} from "../contents/dto/create-content.dto";
import {UpdateContentDto} from "../contents/dto/update-content.dto";
import {UpdateSkillsDto} from "./dto/update-skills.dto";
import {Public} from "../common";

@Controller('skills')
export class SkillsController {
  constructor(
      private readonly skillsService: SkillsService,
  ) {}

  @Post()
  create(@Body() skillsDto: CreateSkillsDto) {
    return this.skillsService.add(skillsDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() skillsDto: UpdateSkillsDto) {
    return this.skillsService.update(id, skillsDto);
  }

  @Public()
  @Get()
  getAll() {
    return this.skillsService.getAll()
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.skillsService.delete(id)
  }
}
