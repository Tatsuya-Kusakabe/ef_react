import { PostAction } from './../actions/post';

export type Action = PostAction;

export interface RawPost {
  id: number;
  userId: number;
  context: string;
  createdAt: string;
  updatedAt: string;
}

export interface RawUser {
  id: number;
  name: string;
  email: string;
  image: { url: string };
  createdAt: string;
  updatedAt: string;
}

export interface PostWithUser extends RawPost {
  name: string;
  image: string;
}
