import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Posts } from '../posts/posts.model';
import { Tags } from './tags.model';
@Table({ tableName: 'blog_post_tags', createdAt: false, updatedAt: false })
export class PostTags extends Model<PostTags> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Tags)
  @Column({ type: DataType.INTEGER })
  tagId: number;

  @ForeignKey(() => Posts)
  @Column({ type: DataType.INTEGER })
  postId: number;
}
