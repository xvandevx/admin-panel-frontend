export interface CommentInterface {
  postId: number;
  isActive: boolean;
  authorName: string;
  text: string;
  likes: number;
}

export class CommentDto implements CommentInterface {
  readonly postId: number;
  readonly isActive: boolean;
  readonly authorName: string;
  readonly text: string;
  readonly likes: number;
}

export type GetCommentsType = CommentInterface[];
