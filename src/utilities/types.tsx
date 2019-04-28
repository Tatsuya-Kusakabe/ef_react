import { AuthAction } from '../../flux/actions/auth';
import { FlashAction } from '../../flux/actions/flash';
import { PostAction } from '../../flux/actions/post';
import { MapAction } from '../../flux/actions/map';

export type Action = AuthAction
  | FlashAction
  | PostAction
  | MapAction;

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

export interface RawRoute {
  id: string;
  name: string;
  distance: string;
  createdAt: string;
  updatedAt: string;
}

export interface RawRouteNode {
  id: string;
  routeId: string;
  nodeId: string;
  chunkSequence: number;
  jointSequence: number;
  nodeSequence: number;
  createdAt: string;
  updatedAt: string;
}

export interface RawNode {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  createdAt: string;
  updatedAt: string;
  RouteNodes: RawRouteNode[];
}

export interface FormattedNode {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  routeId: string;
  chunkSequence: number;
  jointSequence: number | null;
  nodeSequence: number;
}

export interface Jwt {
  accessToken: string | null;
  tokenType: string | null;
  expiresIn: number | null;
  expiresAt: number | null;
}

export type AuthLabel = 'name' | 'email' | 'password' | 'passwordConf';

export type FlashKeys = 'auth';
export type Flash = { [key in FlashKeys]: (string | null) };
