import { Module } from '@nestjs/common';
import { CommentsModule } from './comments/comments.module';
import { PostsModule } from './posts/posts.module';
import { TagsModule } from './tags/tags.module';
import { BlogController } from './blog.controller';

@Module({
  imports: [CommentsModule, PostsModule, TagsModule],
  controllers: [BlogController],
  providers: [],
})
export class BlogModule {}
