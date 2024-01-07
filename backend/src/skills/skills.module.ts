import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Skills } from "./skills.model";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    SequelizeModule.forFeature([Skills]),
  ],
  controllers: [SkillsController],
  providers: [SkillsService],
  exports: [SkillsService]
})
export class SkillsModule {}
