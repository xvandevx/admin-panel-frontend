export class CreateEducationsDto {
    readonly id: number;
    readonly sort: number;
    readonly universityName: string;
    readonly link?: string;
    readonly speciality?: string;
    readonly description?: string;
    readonly startDate?: string;
    readonly endDate?: string;
    readonly location?: string;
}