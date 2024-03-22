import { BadRequestException, Injectable } from '@nestjs/common';
import { Knowledges } from './knowledges.model';
import { InjectModel } from '@nestjs/sequelize';
import { KnowledgesDto } from './dto/knowledges.dto';
import { validate } from 'class-validator';

@Injectable()
export class KnowledgesService {
  constructor(
    @InjectModel(Knowledges) private knowledgesRepository: typeof Knowledges,
  ) {}

  async add(dto: KnowledgesDto) {
    const errors = await validate(dto);
    if (errors.length > 0) {
      const errorMessage = errors
        .map((error) => Object.values(error.constraints))
        .join(', ');
      throw new BadRequestException(errorMessage);
    }

    const { sort, name, description, skills } = dto;
    const knowledges = await this.knowledgesRepository.create({
      sort,
      name,
      description,
    });

    await knowledges.$set(
      'skills',
      skills ? skills?.split(',').map((id) => Number(id)) : [],
    );
  }

  async update(id: number, dto: KnowledgesDto) {
    const errors = await validate(dto);
    if (errors.length > 0) {
      const errorMessage = errors
        .map((error) => Object.values(error.constraints))
        .join(', ');
      throw new BadRequestException(errorMessage);
    }

    const content = await this.knowledgesRepository.findByPk(id);

    const { sort, name, description, skills } = dto;

    await content.update({
      sort,
      name,
      description,
    });

    await content.$set(
      'skills',
      skills ? skills?.split(',').map((id) => Number(id)) : [],
    );
  }

  async getAll() {
    const contents = await this.knowledgesRepository.findAll({
      include: { all: true },
      order: [['sort', 'ASC']],
    });
    return contents;
  }

  async delete(id) {
    const row = await this.knowledgesRepository.findOne({
      where: { id },
    });
    if (row) {
      await row.destroy(); // deletes the row
    }
  }
}
