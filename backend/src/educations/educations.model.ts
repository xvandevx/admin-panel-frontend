import { Model, Table, Column, DataType } from 'sequelize-typescript';
import { EducationInterface } from '../../types/education';

@Table({ tableName: 'educations' })
export class Educations extends Model<Educations, EducationInterface> {
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
  universityName: string;

  @Column({ type: DataType.STRING })
  link: string;

  @Column({ type: DataType.STRING })
  speciality: string;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.STRING })
  startDate: string;

  @Column({ type: DataType.STRING })
  endDate: string;

  @Column({ type: DataType.STRING })
  location: string;
}
