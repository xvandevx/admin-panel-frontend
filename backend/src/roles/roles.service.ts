import { Injectable } from '@nestjs/common';
import {Roles} from "./roles.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateRoleDto} from "./dto/create-role.dto";
import {UpdateRoleDto} from "./dto/update-role.dto";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Roles) private rolesRepository: typeof Roles) {}

  async add(dto: CreateRoleDto) {
    await this.rolesRepository.create(dto);
  }

  async update(id: number, dto: UpdateRoleDto) {
    await this.rolesRepository.update(dto, {where: { id }});
  }

  async getAll() {
    return await this.rolesRepository.findAll();
  }

  async getAdminRole() {
    return await this.rolesRepository.findOne({where: {name: 'Admin'}})
  }

  async addAdminRole() {
    return await this.rolesRepository.create({
      name: 'Admin'
    });
  }

  async delete(id) {
    const row = await this.rolesRepository.findOne({
      where: { id },
    });
    if (row) {
      await row.destroy(); // deletes the row
    }
  }

  async getPagesById(id: number) {
    return await this.rolesRepository.findOne({where: {id}})
  }
}
