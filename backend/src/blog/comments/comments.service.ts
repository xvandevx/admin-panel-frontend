import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommentsDto } from './dto/create-comments.dto';
import { UpdateCommentsDto } from './dto/update-comments.dto';
import { Comments } from './comments.model';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments) private commentsRepository: typeof Comments,
  ) {}

  async add(dto: CreateCommentsDto) {
    await this.commentsRepository.create(dto);
  }

  async update(id: number, dto: UpdateCommentsDto) {
    await this.commentsRepository.update(dto, { where: { id } });
  }

  async getAll() {
    return await this.commentsRepository.findAll();
  }

  async delete(id) {
    const row = await this.commentsRepository.findOne({
      where: { id },
    });
    if (row) {
      await row.destroy(); // deletes the row
    }
  }
}
