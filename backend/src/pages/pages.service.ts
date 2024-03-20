import { Injectable } from '@nestjs/common';
import { Pages } from './pages.model';
import { InjectModel } from '@nestjs/sequelize';
import { PageDto } from './dto/page.dto';

@Injectable()
export class PagesService {
  constructor(@InjectModel(Pages) private pagesRepository: typeof Pages) {}

  async add(dto: PageDto) {
    await this.pagesRepository.create(dto);
  }

  async update(id: number, dto: PageDto) {
    await this.pagesRepository.update(dto, { where: { id } });
  }

  async getAll() {
    return await this.pagesRepository.findAll();
  }

  async getByCode(code) {
    const row = await this.pagesRepository.findOne({
      where: { code },
      include: { all: true },
    });
    return row;
  }

  async delete(id) {
    const row = await this.pagesRepository.findOne({
      where: { id },
    });
    if (row) {
      await row.destroy(); // deletes the row
    }
  }
}
