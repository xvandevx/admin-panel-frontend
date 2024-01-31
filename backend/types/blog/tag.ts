export interface TagInterface {
  name: string;
}

export class TagDto implements TagInterface {
  readonly name: string;
}

export type GetTagsType = TagInterface[];
