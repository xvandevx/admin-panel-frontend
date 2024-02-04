import { ApiProperty } from '@nestjs/swagger';

export enum SkillFields {
  name = 'name',
  category = 'category',
  icon = 'icon',
}

export interface SkillInterface {
  [SkillFields.name]: string;
  [SkillFields.category]: string;
  [SkillFields.icon]?: string;
}

export class SkillDto implements SkillInterface {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly category: string;
  @ApiProperty()
  readonly icon?: string;
}

export type GetSkillsType = SkillInterface[];
