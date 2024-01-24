import { Body, Controller, Delete, Get, Put, Param, Post} from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from "./dto/create-page.dto";
import {UpdatePageDto} from "./dto/update-page.dto";
import {Public} from "../common";

@Controller('pages')
export class PagesController {
  constructor(
      private readonly pagesService: PagesService,
  ) {}

  @Post()
  create(@Body() pageDto: CreatePageDto) {
    return this.pagesService.add(pageDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() pageDto: UpdatePageDto) {
    return this.pagesService.update(id, pageDto);
  }

  @Public()
  @Get()
  getAll() {
    return this.pagesService.getAll()
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.pagesService.delete(id)
  }
}
