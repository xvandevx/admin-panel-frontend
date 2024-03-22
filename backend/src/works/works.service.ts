import { BadRequestException, Injectable } from '@nestjs/common';
import { Works } from './works.model';
import { InjectModel } from '@nestjs/sequelize';
import { WorkDto } from './dto/work.dto';
import { validate } from 'class-validator';

@Injectable()
export class WorksService {
  constructor(@InjectModel(Works) private worksRepository: typeof Works) {}

  async add(dto: WorkDto) {
    const errors = await validate(dto);
    if (errors.length > 0) {
      const errorMessage = errors
        .map((error) => Object.values(error.constraints))
        .join(', ');
      throw new BadRequestException(errorMessage);
    }

    const {
      sort,
      companyName,
      link,
      position,
      description,
      startDate,
      endDate,
      location,
      skills,
    } = dto;
    const work = await this.worksRepository.create({
      sort,
      companyName,
      link,
      position,
      description,
      startDate,
      endDate,
      location,
    });

    await work.$set(
      'skills',
      skills ? skills?.split(',').map((id) => Number(id)) : [],
    );
  }

  async update(id: number, dto: WorkDto) {
    const errors = await validate(dto);
    if (errors.length > 0) {
      const errorMessage = errors
        .map((error) => Object.values(error.constraints))
        .join(', ');
      throw new BadRequestException(errorMessage);
    }

    const content = await this.worksRepository.findByPk(id);

    const {
      sort,
      companyName,
      link,
      position,
      description,
      startDate,
      endDate,
      location,
      skills,
    } = dto;

    await content.update({
      sort,
      companyName,
      link,
      position,
      description,
      startDate,
      endDate,
      location,
    });

    await content.$set(
      'skills',
      skills ? skills?.split(',').map((id) => Number(id)) : [],
    );
  }

  async getAll() {
    const contents = await this.worksRepository.findAll({
      include: { all: true },
      order: [['sort', 'ASC']],
    });
    return contents;
  }

  async delete(id) {
    const row = await this.worksRepository.findOne({
      where: { id },
    });
    if (row) {
      await row.destroy(); // deletes the row
    }
  }
}
