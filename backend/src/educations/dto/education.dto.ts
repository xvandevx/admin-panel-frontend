import { ApiProperty } from '@nestjs/swagger';
import { EducationInterface } from '../../../types/education';

export class EducationDto implements EducationInterface {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly sort: number;
  @ApiProperty()
  readonly universityName: string;
  @ApiProperty()
  readonly link?: string;
  @ApiProperty()
  readonly speciality?: string;
  @ApiProperty()
  readonly description?: string;
  @ApiProperty()
  readonly startDate?: string;
  @ApiProperty()
  readonly endDate?: string;
  @ApiProperty()
  readonly location?: string;
}
