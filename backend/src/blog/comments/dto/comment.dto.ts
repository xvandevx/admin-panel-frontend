import { ApiProperty } from '@nestjs/swagger';
import { CommentInterface } from '../../../../types/blog/comment';

export class CommentDto implements CommentInterface {
  @ApiProperty()
  readonly postId: number;
  @ApiProperty()
  readonly isActive: boolean;
  @ApiProperty()
  readonly authorName: string;
  @ApiProperty()
  readonly text: string;
  @ApiProperty()
  readonly likes: number;
}
