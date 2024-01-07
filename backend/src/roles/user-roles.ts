import {Model, Table, Column, DataType, HasMany, ForeignKey, BelongsToMany} from "sequelize-typescript";
import {Users} from "../users/users.model";
import {Roles} from "./roles.model";
@Table({tableName: 'user_roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @ForeignKey(() => Roles)
    @Column({type: DataType.INTEGER})
    roleId: number;

    @ForeignKey(() => Users)
    @Column({type: DataType.INTEGER})
    userId: number;
}