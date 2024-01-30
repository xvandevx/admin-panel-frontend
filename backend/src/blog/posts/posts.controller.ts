import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostsDto } from './dto/create-posts.dto';
import { UpdatePostsDto } from './dto/update-posts.dto';
import { Public } from '../../common';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() skillsDto: CreatePostsDto) {
    return this.postsService.add(skillsDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() skillsDto: UpdatePostsDto) {
    return this.postsService.update(id, skillsDto);
  }

  @Public()
  @Get()
  getAll() {
    return this.postsService.getAll();
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.postsService.delete(id);
  }
}
