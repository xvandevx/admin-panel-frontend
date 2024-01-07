import {Model, Table, Column, DataType, HasMany, BelongsToMany} from "sequelize-typescript";
import {Works} from "../works/works.model";
import {WorkSkills} from "../works/work-skills.model";

interface SkillsCreationAttrs {
    name: string;
    code: string;
    value: string;
    category: string;
    icon?: string;
}

@Table({tableName: 'skills'})
export class Skills extends Model<Skills, SkillsCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false})
    category: string;

    @Column({type: DataType.STRING})
    icons: string;

    @BelongsToMany(() => Works, () => WorkSkills)
    works: Works
}