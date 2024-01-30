import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Posts } from './posts.model';
import { Tags } from '../tags/tags.model';
import { PostTags } from '../tags/post-tags';
import { Comments } from '../comments/comments.model';

@Module({
  imports: [SequelizeModule.forFeature([Posts, Tags, PostTags, Comments])],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
