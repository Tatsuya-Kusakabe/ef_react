import { PostAction } from './../actions/post';
import { MapAction } from './../actions/map';

export type Action = PostAction
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

export type AuthLabel = 'name' | 'email' | 'password' | 'passwordConf';
