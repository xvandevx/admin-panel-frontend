import { BadRequestException, Injectable } from '@nestjs/common';
import { Pets } from './pets.model';
import { InjectModel } from '@nestjs/sequelize';
import { PetsDto } from './dto/pets.dto';
import { validate } from 'class-validator';

@Injectable()
export class PetsService {
  constructor(@InjectModel(Pets) private petsRepository: typeof Pets) {}

  async add(dto: PetsDto) {
    const errors = await validate(dto);
    if (errors.length > 0) {
      const errorMessage = errors
        .map((error) => Object.values(error.constraints))
        .join(', ');
      throw new BadRequestException(errorMessage);
    }
    await this.petsRepository.create(dto);
  }

  async update(id: number, dto: PetsDto) {
    const errors = await validate(dto);
    if (errors.length > 0) {
      const errorMessage = errors
        .map((error) => Object.values(error.constraints))
        .join(', ');
      throw new BadRequestException(errorMessage);
    }
    const content = await this.petsRepository.findByPk(id);
    await content.update(dto);
  }

  async getAll() {
    const contents = await this.petsRepository.findAll({
      include: { all: true },
    });
    return contents;
  }

  async delete(id) {
    const row = await this.petsRepository.findOne({
      where: { id },
    });
    if (row) {
      await row.destroy(); // deletes the row
    }
  }
}
