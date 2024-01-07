import {Model, Table, Column, DataType, BelongsToMany} from "sequelize-typescript";
import {Roles} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles";

interface UsersCreationAttrs {
    name: string;
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class Users extends Model<Users, UsersCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING})
    password: string;

    @BelongsToMany(() => Roles, () => UserRoles)
    roles: Roles[]
}