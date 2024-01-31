import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Tags } from '../tags/tags.model';
import { PostTags } from '../tags/post-tags';
import { Comments } from '../comments/comments.model';
import { PostInterface } from '../../../types/blog/post';

@Table({ tableName: 'blog_posts' })
export class Posts extends Model<Posts, PostInterface> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isActive: boolean;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING })
  image: string;

  @Column({ type: DataType.STRING, allowNull: false })
  date: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  text: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  likes: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  views: number;

  @HasMany(() => Comments)
  comments: Comments[];

  @BelongsToMany(() => Tags, () => PostTags)
  tags: Tags[];
}
