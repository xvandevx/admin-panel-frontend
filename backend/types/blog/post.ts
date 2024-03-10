export enum PostFields {
  isActive = 'isActive',
  name = 'name',
  image = 'image',
  date = 'date',
  tagIds = 'tagIds',
  text = 'text',
  views = 'views',
  likes = 'likes',
  comments = 'comments',
  tags = 'tags',
}

export interface PostInterface {
  [PostFields.isActive]: boolean;
  [PostFields.name]: string;
  [PostFields.image]?: string;
  [PostFields.date]: string;
  [PostFields.tagIds]?: string;
  [PostFields.text]: string;
  [PostFields.views]: number;
  [PostFields.likes]: number;
  [PostFields.comments]?: any[];
  [PostFields.tags]?: any[];
}

export type GetPostsType = PostInterface[];
