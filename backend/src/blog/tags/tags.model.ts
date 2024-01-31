import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Posts } from '../posts/posts.model';
import { PostTags } from './post-tags';
import { TagInterface } from '../../../types/blog/tag';

@Table({ tableName: 'blog_tags' })
export class Tags extends Model<Tags, TagInterface> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @BelongsToMany(() => Posts, () => PostTags)
  posts: Posts[];
}
