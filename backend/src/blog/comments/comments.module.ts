import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comments } from './comments.model';
import { Posts } from '../posts/posts.model';

@Module({
  imports: [SequelizeModule.forFeature([Comments, Posts])],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
