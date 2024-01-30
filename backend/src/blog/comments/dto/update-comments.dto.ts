export class UpdateCommentsDto {
  readonly postId: number;
  readonly isActive: boolean;
  readonly authorName: string;
  readonly text: string;
}
