export enum KnowledgeFields {
  sort = 'sort',
  name = 'name',
  description = 'description',
}

export interface KnowledgeInterface {
  [KnowledgeFields.sort]: number;
  [KnowledgeFields.name]: string;
  [KnowledgeFields.description]?: string;
}
