import { ApiProperty } from '@nestjs/swagger';
import { SkillInterface } from '../../../types/skill';

export class SkillDto implements SkillInterface {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly category: string;
  @ApiProperty()
  readonly icon?: string;
}
