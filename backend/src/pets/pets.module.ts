import { Module } from '@nestjs/common';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pets } from './pets.model';

@Module({
  imports: [SequelizeModule.forFeature([Pets])],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [PetsService],
})
export class PetsModule {}
