import { Module } from '@nestjs/common';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pages } from './pages.model';
import { Contents } from '../contents/contents.model';
import { PageContents } from '../contents/page-contents.model';

@Module({
  imports: [SequelizeModule.forFeature([Pages, Contents, PageContents])],
  controllers: [PagesController],
  providers: [PagesService],
  exports: [PagesService],
})
export class PagesModule {}
