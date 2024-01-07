export class UpdateUsersDto {
    readonly name: string;
    readonly email: string;
    readonly roles: string;
    readonly resetPassword: boolean;
}