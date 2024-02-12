export enum EducationFields {
  id = 'id',
  sort = 'sort',
  universityName = 'universityName',
  link = 'link',
  speciality = 'speciality',
  description = 'description',
  startDate = 'startDate',
  endDate = 'endDate',
  location = 'location',
}

export interface EducationInterface {
  [EducationFields.id]: number;
  [EducationFields.sort]: number;
  [EducationFields.universityName]: string;
  [EducationFields.link]?: string;
  [EducationFields.speciality]?: string;
  [EducationFields.description]?: string;
  [EducationFields.startDate]?: string;
  [EducationFields.endDate]?: string;
  [EducationFields.location]?: string;
}