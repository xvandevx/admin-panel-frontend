import { Injectable } from '@nestjs/common';
import { Works } from './works.model';
import { InjectModel } from '@nestjs/sequelize';
import { WorkDto } from '../../types/work';

@Injectable()
export class WorksService {
  constructor(@InjectModel(Works) private worksRepository: typeof Works) {}

  async add(dto: WorkDto) {
    const work = await this.worksRepository.create(dto);
    await work.$set(
      'skills',
      dto.skills.split(',').map((id) => Number(id)),
    );
  }

  async update(id: number, dto: WorkDto) {
    const content = await this.worksRepository.findByPk(id);
    // @ts-ignore
    await content.update(dto);
    await content.$set(
      'skills',
      dto.skills.split(',').map((id) => Number(id)),
    );
  }

  async getAll() {
    const contents = await this.worksRepository.findAll({
      include: { all: true },
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
