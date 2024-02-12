export enum WorkFields {
  sort = 'sort',
  companyName = 'companyName',
  link = 'link',
  position = 'position',
  description = 'description',
  startDate = 'startDate',
  endDate = 'endDate',
  location = 'location',
}

export interface WorkInterface {
  [WorkFields.sort]: number;
  [WorkFields.companyName]: string;
  [WorkFields.link]?: string;
  [WorkFields.position]?: string;
  [WorkFields.description]?: string;
  [WorkFields.startDate]?: string;
  [WorkFields.endDate]?: string;
  [WorkFields.location]?: string;
}
