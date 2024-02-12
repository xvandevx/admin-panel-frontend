export interface PostInterface {
  isActive: boolean;
  name: string;
  image?: string;
  date: string;
  tagIds?: number[];
  text: string;
  views: number;
  likes: number;
  comments?: any[];
  tags?: any[];
}

export type GetPostsType = PostInterface[];
