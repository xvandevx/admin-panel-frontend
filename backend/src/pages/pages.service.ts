import { Injectable } from '@nestjs/common';
import {Pages} from "./pages.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreatePageDto} from "./dto/create-page.dto";
import {UpdatePageDto} from "./dto/update-page.dto";

@Injectable()
export class PagesService {
  constructor(@InjectModel(Pages) private pagesRepository: typeof Pages) {}

  async add(dto: CreatePageDto) {
    await this.pagesRepository.create(dto);
  }

  async update(id: number, dto: UpdatePageDto) {
    await this.pagesRepository.update(dto, {where: { id }});
  }

  async getAll() {
    return await this.pagesRepository.findAll();
  }

  async delete(id) {
    const row = await this.pagesRepository.findOne({
      where: { id },
    });
    if (row) {
      await row.destroy(); // deletes the row
    }
  }

  async getPagesById(id: number) {
    return await this.pagesRepository.findOne({where: {id}})
  }
}
