import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentsDto } from './dto/create-comments.dto';
import { UpdateCommentsDto } from './dto/update-comments.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() commentsDto: CreateCommentsDto) {
    return this.commentsService.add(commentsDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() commentsDto: UpdateCommentsDto) {
    return this.commentsService.update(id, commentsDto);
  }

  @Get()
  getAll() {
    return this.commentsService.getAll();
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.commentsService.delete(id);
  }
}
