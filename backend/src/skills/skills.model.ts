import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Works } from '../works/works.model';
import { WorkSkills } from '../works/work-skills.model';
import { SkillInterface } from '../../types/skill';

@Table({ tableName: 'skills' })
export class Skills extends Model<Skills, SkillInterface> {
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
  category: string;

  @Column({ type: DataType.STRING })
  icons: string;

  @BelongsToMany(() => Works, () => WorkSkills)
  works: Works;
}
