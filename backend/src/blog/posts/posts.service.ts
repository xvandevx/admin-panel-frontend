import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Posts } from './posts.model';
import { PostDto } from './dto/post.dto';
import { validate } from 'class-validator';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Posts) private postsRepository: typeof Posts) {}

  async add(dto: PostDto) {
    const errors = await validate(dto);
    if (errors.length > 0) {
      const errorMessage = errors
        .map((error) => Object.values(error.constraints))
        .join(', ');
      throw new BadRequestException(errorMessage);
    }

    const post = await this.postsRepository.create({
      isActive: dto.isActive,
      name: dto.name,
      image: dto.image,
      date: dto.date,
      text: dto.text,
      likes: dto.likes,
      views: dto.views,
    });
    await post.$set(
      'tags',
      dto.tagIds
        ?.split(',')
        .filter((item) => item)
        .map((id) => Number(id)),
    );
  }

  async update(id: number, dto: PostDto) {
    const errors = await validate(dto);
    if (errors.length > 0) {
      const errorMessage = errors
        .map((error) => Object.values(error.constraints))
        .join(', ');
      throw new BadRequestException(errorMessage);
    }
    const post = await this.postsRepository.findByPk(id);
    await post.update({
      isActive: dto.isActive,
      name: dto.name,
      image: dto.image,
      date: dto.date,
      text: dto.text,
      likes: dto.likes,
      views: dto.views,
    });

    await post.$set(
      'tags',
      dto.tagIds
        ?.split(',')
        .filter((item) => item)
        .map((id) => Number(id)),
    );
  }

  async getAll() {
    return await this.postsRepository.findAll({
      include: { all: true },
    });
  }

  async delete(id) {
    const row = await this.postsRepository.findOne({
      where: { id },
      order: [['id', 'ASC']],
    });
    if (row) {
      await row.destroy(); // deletes the row
    }
  }
}
