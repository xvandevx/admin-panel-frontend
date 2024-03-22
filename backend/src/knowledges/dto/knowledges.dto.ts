import { ApiProperty } from '@nestjs/swagger';
import { KnowledgeInterface } from '../../../types/knowledge';

export class KnowledgesDto implements KnowledgeInterface {
  @ApiProperty()
  readonly sort: number;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly description?: string;
  @ApiProperty()
  readonly skills?: string;
}
