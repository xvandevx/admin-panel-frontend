import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Contents } from '../contents/contents.model';
import { PageContents } from '../contents/page-contents.model';
import { PageInterface } from '../../types/page';

@Table({ tableName: 'pages' })
export class Pages extends Model<Pages, PageInterface> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  code: string;

  @Column({ type: DataType.STRING })
  h1: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @BelongsToMany(() => Contents, () => PageContents)
  contents: Contents[];
}
