import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import { ContentsService } from './contents.service';
import { CreateContentDto } from "./dto/create-content.dto";
import {UpdateContentDto} from "./dto/update-content.dto";
import {Public} from "../common";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('contents')
@Controller('contents')
export class ContentsController {
  constructor(
      private readonly contentsService: ContentsService,
  ) {}

  @Post()
  create(@Body() contentDto: CreateContentDto) {
    return this.contentsService.add(contentDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() contentDto: UpdateContentDto) {
    return this.contentsService.update(id, contentDto);
  }

  @Public()
  @Get()
  getAll() {
    return this.contentsService.getAll()
  }

  @Get(':code')
  getByCode(@Param('code') code: string) {
    return this.contentsService.getByCode(code)
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.contentsService.delete(id)
  }
}
