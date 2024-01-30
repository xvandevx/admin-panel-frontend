import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostsDto } from './dto/create-posts.dto';
import { UpdatePostsDto } from './dto/update-posts.dto';
import { Posts } from './posts.model';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Posts) private postsRepository: typeof Posts) {}

  async add(dto: CreatePostsDto) {
    const post = await this.postsRepository.create({
      isActive: dto.isActive,
      name: dto.name,
      image: dto.image,
      date: dto.date,
      text: dto.text,
    });
    if (dto.tags) {
      await post.$set(
        'tags',
        dto.tags.split(',').map((id) => Number(id)),
      );
    }
  }

  async update(id: number, dto: UpdatePostsDto) {
    const post = await this.postsRepository.findByPk(id);
    await post.update({
      isActive: dto.isActive,
      name: dto.name,
      image: dto.image,
      date: dto.date,
      text: dto.text,
    });
    await post.$set(
      'tags',
      dto.tags.split(',').map((id) => Number(id)),
    );
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
