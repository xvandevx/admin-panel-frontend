import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Posts } from '../posts/posts.model';
import { PostTags } from './post-tags';

interface TagsCreationAttrs {
  name: string;
}

@Table({ tableName: 'blog_tags' })
export class Tags extends Model<Tags, TagsCreationAttrs> {
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
