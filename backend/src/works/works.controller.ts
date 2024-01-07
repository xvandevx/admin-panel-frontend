import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import { WorksService } from './works.service';
import { CreateWorksDto } from "./dto/create-works.dto";
import {CreatePageDto} from "../pages/dto/create-page.dto";
import {UpdatePageDto} from "../pages/dto/update-page.dto";

@Controller('works')
export class WorksController {
  constructor(
      private readonly worksService: WorksService,
  ) {}

  @Post()
  create(@Body() workDto: CreateWorksDto) {
    return this.worksService.add(workDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() workDto: CreateWorksDto) {
    return this.worksService.update(id, workDto);
  }

  @Get()
  getAll() {
    return this.worksService.getAll()
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.worksService.delete(id)
  }
}
