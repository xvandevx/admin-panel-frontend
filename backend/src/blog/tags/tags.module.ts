import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tags } from './tags.model';
import { Posts } from '../posts/posts.model';

@Module({
  imports: [SequelizeModule.forFeature([Tags, Posts])],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
