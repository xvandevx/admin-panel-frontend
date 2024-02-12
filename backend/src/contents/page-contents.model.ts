import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Contents } from './contents.model';
import { Pages } from '../pages/pages.model';
@Table({ tableName: 'page_contents', createdAt: false, updatedAt: false })
export class PageContents extends Model<PageContents> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Pages)
  @Column({ type: DataType.INTEGER })
  pageId: number;

  @ForeignKey(() => Contents)
  @Column({ type: DataType.INTEGER })
  contentId: number;
}
