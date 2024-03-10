import { BadRequestException, Injectable } from '@nestjs/common';
import { Educations } from './educations.model';
import { InjectModel } from '@nestjs/sequelize';
import { EducationDto } from './dto/education.dto';
import { validate } from 'class-validator';

@Injectable()
export class EducationsService {
  constructor(
    @InjectModel(Educations) private educationsRepository: typeof Educations,
  ) {}

  async add(dto: EducationDto) {
    const errors = await validate(dto);
    if (errors.length > 0) {
      const errorMessage = errors
        .map((error) => Object.values(error.constraints))
        .join(', ');
      throw new BadRequestException(errorMessage);
    }
    await this.educationsRepository.create(dto);
  }

  async update(id: number, dto: EducationDto) {
    const errors = await validate(dto);
    if (errors.length > 0) {
      const errorMessage = errors
        .map((error) => Object.values(error.constraints))
        .join(', ');
      throw new BadRequestException(errorMessage);
    }
    const content = await this.educationsRepository.findByPk(id);
    await content.update(dto);
  }

  async getAll() {
    const contents = await this.educationsRepository.findAll({
      include: { all: true },
    });
    return contents;
  }

  async delete(id) {
    const row = await this.educationsRepository.findOne({
      where: { id },
    });
    if (row) {
      await row.destroy(); // deletes the row
    }
  }
}
