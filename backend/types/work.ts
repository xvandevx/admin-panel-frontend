import { ApiProperty } from '@nestjs/swagger';

export enum WorkFields {
  sort = 'sort',
  companyName = 'companyName',
  link = 'link',
  position = 'position',
  description = 'description',
  startDate = 'startDate',
  endDate = 'endDate',
  location = 'location',
}

export interface WorkInterface {
  [WorkFields.sort]: number;
  [WorkFields.companyName]: string;
  [WorkFields.link]?: string;
  [WorkFields.position]?: string;
  [WorkFields.description]?: string;
  [WorkFields.startDate]?: string;
  [WorkFields.endDate]?: string;
  [WorkFields.location]?: string;
}

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
