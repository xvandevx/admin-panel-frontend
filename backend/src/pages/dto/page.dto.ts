import { ApiProperty } from '@nestjs/swagger';
import { PageInterface } from '../../../types/page';

export class PageDto implements PageInterface {
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly code: string;
  @ApiProperty()
  readonly h1?: string;
  @ApiProperty()
  readonly description?: string;
}
