import { Module } from '@nestjs/common';
import { KnowledgesController } from './knowledges.controller';
import { KnowledgesService } from './knowledges.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Knowledges } from './knowledges.model';

@Module({
  imports: [SequelizeModule.forFeature([Knowledges])],
  controllers: [KnowledgesController],
  providers: [KnowledgesService],
  exports: [KnowledgesService],
})
export class KnowledgesModule {}
