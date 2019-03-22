import { PostAction } from './../actions/post';

export type Action = PostAction;

export interface RawPost {
  id: number;
  user_id: number;
  context: string;
  created_at: Date;
  updated_at: Date;
}

export interface RawUser {
  id: number;
  name: string;
  email: string;
  image: { url: string };
  created_at: Date;
  updated_at: Date;
}

export interface PostWithUser extends RawPost {
  name: string;
  image: string;
}
