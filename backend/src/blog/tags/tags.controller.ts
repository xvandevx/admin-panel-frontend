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
import { Public } from '../../common';
import { GetTagsType } from '../../../types/blog/tag';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TagDto } from './dto/tag.dto';

@ApiBearerAuth()
@ApiTags('blog')
@Controller('blog/tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() skillsDto: TagDto) {
    return this.tagsService.add(skillsDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() tagsDto: TagDto) {
    return this.tagsService.update(id, tagsDto);
  }

  @Public()
  @Get()
  getAll(): Promise<GetTagsType> {
    return this.tagsService.getAll();
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.tagsService.delete(id);
  }
}
