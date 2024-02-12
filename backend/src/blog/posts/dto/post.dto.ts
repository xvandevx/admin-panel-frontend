import { ApiProperty } from '@nestjs/swagger';
import { PostInterface } from '../../../../types/blog/post';

export class PostDto implements PostInterface {
  @ApiProperty()
  readonly isActive: boolean;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly image?: string;
  @ApiProperty()
  readonly date: string;
  @ApiProperty()
  readonly tagIds?: number[];
  @ApiProperty()
  readonly text: string;
  @ApiProperty()
  readonly likes: number;
  @ApiProperty()
  readonly views: number;
}
