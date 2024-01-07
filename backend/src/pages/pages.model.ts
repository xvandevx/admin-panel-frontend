import {Model, Table, Column, DataType, HasMany, ForeignKey, BelongsToMany} from "sequelize-typescript";
import {Contents} from "../contents/contents.model";
import {PageContents} from "../contents/page-contents.model";

interface PagesCreationAttrs {
    id: number;
    title: string;
    h1: string;
    description: string;
}

@Table({tableName: 'pages'})
export class Pages extends Model<Pages, PagesCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    code: string;

    @Column({type: DataType.STRING})
    h1: string;

    @Column({type: DataType.STRING})
    description: string;

    @BelongsToMany(() => Contents, () => PageContents)
    contents: Contents[];
}