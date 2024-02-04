import { TagDto } from './tag';
import { CommentDto } from './comment';
import { ApiProperty } from '@nestjs/swagger';

export interface PostInterface {
  isActive: boolean;
  name: string;
  image?: string;
  date: string;
  tagIds?: number[];
  text: string;
  views: number;
  likes: number;
  comments?: CommentDto[];
  tags?: TagDto[];
}

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

export type GetPostsType = PostInterface[];
