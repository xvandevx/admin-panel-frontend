import {Model, Table, Column, DataType, HasMany, BelongsToMany} from "sequelize-typescript";
import {Pages} from "../pages/pages.model";
import {PageContents} from "./page-contents.model";

interface ContentsCreationAttrs {
    id: number;
    name: string;
    code: string;
    type: string;
    value: string;
}

@Table({tableName: 'contents'})
export class Contents extends Model<Contents, ContentsCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false})
    code: string;

    @Column({type: DataType.STRING, allowNull: false})
    type: string;

    @Column({type: DataType.STRING, allowNull: false})
    value: string;

    @BelongsToMany(() => Pages, () => PageContents)
    pages: Pages
}