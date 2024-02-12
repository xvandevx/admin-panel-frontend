import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Roles } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles';
import { UserInterface } from '../../types/user';

@Table({ tableName: 'users' })
export class Users extends Model<Users, UserInterface> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING })
  password: string;

  @BelongsToMany(() => Roles, () => UserRoles)
  roles: Roles[];
}
