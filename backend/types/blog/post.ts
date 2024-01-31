import { TagDto } from './tag';
import { CommentDto } from './comment';

export interface PostInterface {
  isActive: boolean;
  name: string;
  image?: string;
  date: string;
  tags?: number[];
  text: string;
  views: number;
  likes: number;
}

export class PostDto implements PostInterface {
  readonly isActive: boolean;
  readonly name: string;
  readonly image?: string;
  readonly date: string;
  readonly tags?: number[];
  readonly text: string;
  readonly likes: number;
  readonly views: number;
}

type Post = PostInterface & {
  tags: TagDto[];
  comments: CommentDto[];
};

export type GetPostsType = Post[];
