import { IUser } from './user';

export interface IPost {
  id: string;
  description: string;
  publishedAt: Date;
  owner: IUser | null;
  medias: Array<string>;
}
