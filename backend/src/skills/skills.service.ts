import { Injectable } from '@nestjs/common';
import {Skills} from "./skills.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateSkillsDto} from "./dto/create-skills.dto";
import {UpdateSkillsDto} from "./dto/update-skills.dto";

@Injectable()
export class SkillsService {
  constructor(@InjectModel(Skills) private skillsRepository: typeof Skills) {}

  async add(dto: CreateSkillsDto) {
    await this.skillsRepository.create(dto);
  }

  async update(id: number, dto: UpdateSkillsDto) {
    await this.skillsRepository.update(dto, {where: { id }});
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
    return await this.skillsRepository.findOne({where: {id}})
  }
}
