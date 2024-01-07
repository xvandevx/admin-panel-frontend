import {Model, Table, Column, DataType, HasMany, BelongsToMany} from "sequelize-typescript";
import {Users} from "../users/users.model";
import {UserRoles} from "./user-roles";

interface RolesCreationAttrs {
    name: string;
}

@Table({tableName: 'roles'})
export class Roles extends Model<Roles, RolesCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    name: string;

    @BelongsToMany(() => Users, () => UserRoles)
    users: Users[]
}