import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Param,
  Post,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { Public } from '../common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PageDto } from './dto/page.dto';

@ApiBearerAuth()
@ApiTags('pages')
@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  create(@Body() pageDto: PageDto) {
    return this.pagesService.add(pageDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() pageDto: PageDto) {
    return this.pagesService.update(id, pageDto);
  }

  @Public()
  @Get()
  getAll() {
    return this.pagesService.getAll();
  }

  @Public()
  @Get('/:code')
  getByCode(@Param('code') code: string) {
    return this.pagesService.getByCode(code);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.pagesService.delete(id);
  }
}
