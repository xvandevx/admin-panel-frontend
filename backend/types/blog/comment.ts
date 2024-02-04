import { ApiProperty } from '@nestjs/swagger';

export enum CommentFields {
  postId = 'postId',
  isActive = 'isActive',
  authorName = 'authorName',
  text = 'text',
  likes = 'likes',
}

export interface CommentInterface {
  [CommentFields.postId]: number;
  [CommentFields.isActive]: boolean;
  [CommentFields.authorName]: string;
  [CommentFields.text]: string;
  [CommentFields.likes]: number;
}

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

export type GetCommentsType = CommentInterface[];
