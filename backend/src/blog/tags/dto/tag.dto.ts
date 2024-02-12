import { ApiProperty } from '@nestjs/swagger';
import { TagInterface } from '../../../../types/blog/tag';

export class TagDto implements TagInterface {
  @ApiProperty()
  readonly name: string;
}
