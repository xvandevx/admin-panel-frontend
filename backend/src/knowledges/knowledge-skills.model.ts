import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Knowledges } from './knowledges.model';
import { Skills } from '../skills/skills.model';

@Table({ tableName: 'knowledge_skills', createdAt: false, updatedAt: false })
export class KnowledgesSkills extends Model<KnowledgesSkills> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Knowledges)
  @Column({ type: DataType.INTEGER })
  knowledgeId: number;

  @ForeignKey(() => Skills)
  @Column({ type: DataType.INTEGER })
  skillId: number;
}
