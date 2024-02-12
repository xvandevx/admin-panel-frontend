import { ApiProperty } from '@nestjs/swagger';
import { WorkInterface } from '../../../types/work';

export class WorkDto implements WorkInterface {
  @ApiProperty()
  readonly sort: number;
  @ApiProperty()
  readonly companyName: string;
  @ApiProperty()
  readonly link?: string;
  @ApiProperty()
  readonly position?: string;
  @ApiProperty()
  readonly description?: string;
  @ApiProperty()
  readonly startDate?: string;
  @ApiProperty()
  readonly endDate?: string;
  @ApiProperty()
  readonly location?: string;
  @ApiProperty()
  readonly skills?: string;
}
