import { Module } from '@nestjs/common';
import { ContentsController } from './contents.controller';
import { ContentsService } from './contents.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contents } from './contents.model';
import { PageContents } from './page-contents.model';
import { PagesModule } from '../pages/pages.module';

@Module({
  imports: [SequelizeModule.forFeature([Contents, PageContents]), PagesModule],
  controllers: [ContentsController],
  providers: [ContentsService],
  exports: [ContentsService],
})
export class ContentsModule {}
