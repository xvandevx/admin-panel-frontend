import { ApiProperty } from '@nestjs/swagger';
import { PetsInterface } from '../../../types/pets';

export class PetsDto implements PetsInterface {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly sort: number;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly link?: string;
  @ApiProperty()
  readonly type?: string;
  @ApiProperty()
  readonly description?: string;
  @ApiProperty()
  readonly startDate?: string;
  @ApiProperty()
  readonly endDate?: string;
  @ApiProperty()
  readonly github?: string;
}
