export enum TagFields {
  name = 'name',
}

export interface TagInterface {
  [TagFields.name]: string;
}

export type GetTagsType = TagInterface[];
