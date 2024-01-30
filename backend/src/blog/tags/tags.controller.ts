import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagsDto } from './dto/create-tags.dto';
import { UpdateTagsDto } from './dto/update-tags.dto';
import { Public } from '../../common';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() skillsDto: CreateTagsDto) {
    return this.tagsService.add(skillsDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() tagsDto: UpdateTagsDto) {
    return this.tagsService.update(id, tagsDto);
  }

  @Public()
  @Get()
  getAll() {
    return this.tagsService.getAll();
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.tagsService.delete(id);
  }
}
