import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Skills } from '../skills/skills.model';
import { KnowledgesSkills } from './knowledge-skills.model';
import { KnowledgeInterface } from '../../types/knowledge';

@Table({ tableName: 'knowledges' })
export class Knowledges extends Model<Knowledges, KnowledgeInterface> {
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

  @Column({ type: DataType.TEXT })
  description: string;

  @BelongsToMany(() => Skills, () => KnowledgesSkills)
  skills: Skills[];
}
