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
  readonly postId: number;
  readonly isActive: boolean;
  readonly authorName: string;
  readonly text: string;
  readonly likes: number;
}

export type GetCommentsType = CommentInterface[];
