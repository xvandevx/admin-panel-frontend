export enum PetsFields {
    id = 'id',
    sort = 'sort',
    name = 'name',
    link = 'link',
    type = 'type',
    description = 'description',
    startDate = 'startDate',
    endDate = 'endDate',
    github = 'github',
}

export interface PetsInterface {
    [PetsFields.id]: number;
    [PetsFields.sort]: number;
    [PetsFields.name]: string;
    [PetsFields.link]?: string;
    [PetsFields.type]?: string;
    [PetsFields.description]?: string;
    [PetsFields.startDate]?: string;
    [PetsFields.endDate]?: string;
    [PetsFields.github]?: string;
}