import { TagDto } from './tag';
import { CommentDto } from './comment';

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
  readonly isActive: boolean;
  readonly name: string;
  readonly image?: string;
  readonly date: string;
  readonly tagIds?: number[];
  readonly text: string;
  readonly likes: number;
  readonly views: number;
}

export type GetPostsType = PostInterface[];
