import {Model, Table, Column, DataType, HasMany, BelongsToMany} from "sequelize-typescript";
import {Skills} from "../skills/skills.model";
import {WorkSkills} from "./work-skills.model";

interface WorksCreationAttrs {
    id: number;
    sort: number;
    companyName: string;
    link?: string;
    position?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
}

@Table({tableName: 'works'})
export class Works extends Model<Works, WorksCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    sort: number;

    @Column({type: DataType.STRING, allowNull: false})
    companyName: string;

    @Column({type: DataType.STRING})
    link: string;

    @Column({type: DataType.STRING})
    position: string;

    @Column({type: DataType.STRING})
    description: string;

    @Column({type: DataType.STRING})
    startDate: string;

    @Column({type: DataType.STRING})
    endDate: string;

    @Column({type: DataType.STRING})
    location: string;

    @BelongsToMany(() => Skills, () => WorkSkills)
    skills: Skills[];
}