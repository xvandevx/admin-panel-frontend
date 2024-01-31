import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Posts } from './posts.model';
import { PostDto } from '../../../types/blog/post';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Posts) private postsRepository: typeof Posts) {}

  async add(dto: PostDto) {
    const post = await this.postsRepository.create({
      isActive: dto.isActive,
      name: dto.name,
      image: dto.image,
      date: dto.date,
      text: dto.text,
    });
    if (dto.tags) {
      await post.$set('tags', dto.tags);
    }
  }

  async update(id: number, dto: PostDto) {
    const post = await this.postsRepository.findByPk(id);
    await post.update({
      isActive: dto.isActive,
      name: dto.name,
      image: dto.image,
      date: dto.date,
      text: dto.text,
    });
    await post.$set('tags', dto.tags);
  }

  async getAll() {
    return await this.postsRepository.findAll();
  }

  async delete(id) {
    const row = await this.postsRepository.findOne({
      where: { id },
    });
    if (row) {
      await row.destroy(); // deletes the row
    }
  }

  async getPagesById(id: number) {
    return await this.postsRepository.findOne({ where: { id } });
  }
}
