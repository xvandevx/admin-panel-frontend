import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Posts } from '../posts/posts.model';
import { CommentInterface } from '../../../types/blog/comment';

@Table({ tableName: 'blog_comments' })
export class Comments extends Model<Comments, CommentInterface> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isActive: boolean;

  @ForeignKey(() => Posts)
  @Column({ type: DataType.INTEGER, allowNull: false })
  postId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  authorName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  text: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  likes: number;
}
