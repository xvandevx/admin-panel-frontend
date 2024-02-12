import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Pages } from '../pages/pages.model';
import { PageContents } from './page-contents.model';
import { ContentInterface } from '../../types/content';

@Table({ tableName: 'contents' })
export class Contents extends Model<Contents, ContentInterface> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  code: string;

  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  @Column({ type: DataType.STRING, allowNull: false })
  value: string;

  @BelongsToMany(() => Pages, () => PageContents)
  pages: Pages;
}
