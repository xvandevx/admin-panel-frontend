export class UpdatePageDto {
    readonly id: number;
    readonly title: string;
    readonly code: string;
    readonly h1?: string;
    readonly description?: string;
}