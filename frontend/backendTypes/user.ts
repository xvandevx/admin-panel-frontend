export enum UserFields {
  name = 'name',
  email = 'email',
  password = 'password',
  roles = 'roles',
}

export interface UserInterface {
  [UserFields.name]: string;
  [UserFields.email]: string;
  [UserFields.password]?: string;
  [UserFields.roles]: string;
}
