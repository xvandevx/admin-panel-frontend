import { Injectable } from '@nestjs/common';
import { Tags } from './tags.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTagsDto } from './dto/create-tags.dto';
import { UpdateTagsDto } from './dto/update-tags.dto';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tags) private tagsRepository: typeof Tags) {}

  async add(dto: CreateTagsDto) {
    await this.tagsRepository.create(dto);
  }

  async update(id: number, dto: UpdateTagsDto) {
    await this.tagsRepository.update(dto, { where: { id } });
  }

  async getAll() {
    return await this.tagsRepository.findAll();
  }

  async delete(id) {
    const row = await this.tagsRepository.findOne({
      where: { id },
    });
    if (row) {
      await row.destroy(); // deletes the row
    }
  }
}
