import { Injectable } from '@nestjs/common';
import { Users } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { PagesService } from '../pages/pages.service';
import { Roles } from '../roles/roles.model';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private usersRepository: typeof Users,
    private readonly rolesService: RolesService,
  ) {
    this.addInitRoleAndUser();
  }

  async addInitRoleAndUser() {
    let adminRole = await this.rolesService.getAdminRole();

    if (!adminRole) {
      adminRole = await this.rolesService.addAdminRole();
    }
    if (adminRole?.dataValues?.id) {
      const admin = await this.getAdmin();

      if (!admin) {
        await this.add({
          name: 'Admin',
          email: 'admin@admin.com',
          roles: `${adminRole?.dataValues?.id}`,
        });
      }
    }
  }

  async add(dto: CreateUsersDto) {
    const user = await this.usersRepository.create(dto);
    await user.$set(
      'roles',
      dto.roles.split(',').map((id) => Number(id)),
    );
  }

  async update(id: number, dto: UpdateUsersDto) {
    const content = await this.usersRepository.findByPk(id);
    await content.update({
      name: dto.name,
      email: dto.email,
    });
    await content.$set(
      'roles',
      dto.roles.split(',').map((id) => Number(id)),
    );
  }

  async getAdmin() {
    return await this.usersRepository.findOne({ where: { name: 'Admin' } });
  }
  async getAll() {
    return await this.usersRepository.findAll({ include: { all: true } });
  }

  async delete(id) {
    const row = await this.usersRepository.findOne({
      where: { id },
    });
    if (row) {
      await row.destroy(); // deletes the row
    }
  }

  async getPagesById(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }
}
