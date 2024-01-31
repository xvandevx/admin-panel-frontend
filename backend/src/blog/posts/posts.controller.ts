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
import { Public } from '../../common';
import { GetPostsType, PostDto } from '../../../types/blog/post';

@Controller('blog/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() post: PostDto) {
    return this.postsService.add(post);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() post: PostDto) {
    return this.postsService.update(id, post);
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
