import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Users } from '../users/users.model';
import { UserRoles } from './user-roles';
import { RoleInterface } from '../../types/role';

@Table({ tableName: 'roles' })
export class Roles extends Model<Roles, RoleInterface> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @BelongsToMany(() => Users, () => UserRoles)
  users: Users[];
}
