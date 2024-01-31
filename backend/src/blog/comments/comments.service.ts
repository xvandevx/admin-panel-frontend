import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comments } from './comments.model';
import { CommentDto } from '../../../types/blog/comment';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments) private commentsRepository: typeof Comments,
  ) {}

  async add(dto: CommentDto) {
    await this.commentsRepository.create(dto);
  }

  async update(id: number, dto: CommentDto) {
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
