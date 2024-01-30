import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Tags } from '../tags/tags.model';
import { PostTags } from '../tags/post-tags';
import { Comments } from '../comments/comments.model';

interface PostsCreationAttrs {
  isActive: boolean;
  name: string;
  image: string;
  date: string;
  tags: number[];
  text: string;
}

@Table({ tableName: 'blog_posts' })
export class Posts extends Model<Posts, PostsCreationAttrs> {
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

  @HasMany(() => Comments)
  comments: Comments[];

  @BelongsToMany(() => Tags, () => PostTags)
  tags: Tags;
}
