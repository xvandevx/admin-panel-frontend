export class CreateCommentsDto {
  readonly postId: number;
  readonly isActive: boolean;
  readonly authorName: string;
  readonly text: string;
}
