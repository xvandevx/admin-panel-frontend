import { ApiProperty } from '@nestjs/swagger';

export interface TagInterface {
  name: string;
}

export class TagDto implements TagInterface {
  @ApiProperty()
  readonly name: string;
}

export type GetTagsType = TagInterface[];
