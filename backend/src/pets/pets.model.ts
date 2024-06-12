import { Model, Table, Column, DataType } from 'sequelize-typescript';
import { PetsInterface } from '../../types/pets';

@Table({ tableName: 'pets' })
export class Pets extends Model<Pets, PetsInterface> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  sort: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING })
  link: string;

  @Column({ type: DataType.STRING })
  type: string;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.STRING })
  startDate: string;

  @Column({ type: DataType.STRING })
  endDate: string;

  @Column({ type: DataType.STRING })
  github: string;
}
