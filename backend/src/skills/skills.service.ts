import { Injectable } from '@nestjs/common';
import { Skills } from './skills.model';
import { InjectModel } from '@nestjs/sequelize';
import { SkillDto } from './dto/skill.dto';

@Injectable()
export class SkillsService {
  constructor(@InjectModel(Skills) private skillsRepository: typeof Skills) {}

  async add(dto: SkillDto) {
    await this.skillsRepository.create(dto);
  }

  async update(id: number, dto: SkillDto) {
    await this.skillsRepository.update(dto, { where: { id } });
  }

  async getAll() {
    return await this.skillsRepository.findAll();
  }

  async delete(id) {
    const row = await this.skillsRepository.findOne({
      where: { id },
    });
    if (row) {
      await row.destroy(); // deletes the row
    }
  }

  async getPagesById(id: number) {
    return await this.skillsRepository.findOne({ where: { id } });
  }
}
