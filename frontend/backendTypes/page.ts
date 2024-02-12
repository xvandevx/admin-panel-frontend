export enum PageFields {
  title = 'title',
  code = 'code',
  h1 = 'h1',
  description = 'description',
}

export interface PageInterface {
  title: string;
  code: string;
  h1?: string;
  description?: string;
}
