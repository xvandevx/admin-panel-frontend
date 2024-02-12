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

export type GetCommentsType = CommentInterface[];
