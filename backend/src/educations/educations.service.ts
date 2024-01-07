import { Injectable } from '@nestjs/common';
import {Educations} from "./educations.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateEducationsDto} from "./dto/create-educations.dto";

@Injectable()
export class EducationsService {
  constructor(@InjectModel(Educations) private educationsRepository: typeof Educations) {}

  async add(dto: CreateEducationsDto) {
    const work =  await this.educationsRepository.create(dto);
  }

  async update(id: number, dto: CreateEducationsDto) {
    const content = await this.educationsRepository.findByPk(id)
    // @ts-ignore
    await content.update(dto);
  }

  async getAll() {
    const contents = await this.educationsRepository.findAll({include: {all: true}});
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
