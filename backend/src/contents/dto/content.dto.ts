import { ContentInterface } from '../../../types/content';

export class ContentDto implements ContentInterface {
  readonly name: string;
  readonly code: string;
  readonly pages: string;
  readonly type: string;
  readonly value: string;
}
