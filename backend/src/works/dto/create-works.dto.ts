export class CreateWorksDto {
    readonly id: number;
    readonly sort: number;
    readonly companyName: string;
    readonly link?: string;
    readonly position?: string;
    readonly description?: string;
    readonly startDate?: string;
    readonly endDate?: string;
    readonly location?: string;
    readonly skills?: string;
}