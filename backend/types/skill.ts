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

export type GetSkillsType = SkillInterface[];
