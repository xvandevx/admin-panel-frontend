import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import { EducationsService } from './educations.service';
import { CreateEducationsDto } from "./dto/create-educations.dto";

@Controller('educations')
export class EducationsController {
  constructor(
      private readonly educationsService: EducationsService,
  ) {}

  @Post()
  create(@Body() workDto: CreateEducationsDto) {
    return this.educationsService.add(workDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() workDto: CreateEducationsDto) {
    return this.educationsService.update(id, workDto);
  }

  @Get()
  getAll() {
    return this.educationsService.getAll()
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.educationsService.delete(id)
  }
}
