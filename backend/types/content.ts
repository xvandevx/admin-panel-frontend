export enum ContentFields {
  name = 'name',
  code = 'code',
  type = 'type',
  value = 'value',
}

export interface ContentInterface {
  [ContentFields.name]: string;
  [ContentFields.code]: string;
  [ContentFields.type]: string;
  [ContentFields.value]: string;
}
