import {Model, Table, Column, DataType, HasMany, ForeignKey, BelongsToMany} from "sequelize-typescript";
import {Works} from "./works.model";
import {Skills} from "../skills/skills.model";
@Table({tableName: 'work_skills', createdAt: false, updatedAt: false})
export class WorkSkills extends Model<WorkSkills> {
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @ForeignKey(() => Works)
    @Column({type: DataType.INTEGER})
    workId: number;

    @ForeignKey(() => Skills)
    @Column({type: DataType.INTEGER})
    skillId: number;
}