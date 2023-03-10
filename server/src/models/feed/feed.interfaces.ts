import mongoose, { Model, Document } from 'mongoose';
import {QueryResult} from "../plugins/paginate";


export interface IMaybeFeed {
  url: string;
}

export interface IFeed extends IMaybeFeed {
  name: string;
  lastFetched: Date;
  status?: any; // It is STATUS here, but there is a BUG in mongoose
}

export interface IFeedDoc extends IFeed, Document {}

export interface IFeedModel extends Model<IFeedDoc> {
  isUrlTaken(url: string, excludeFeedId?: mongoose.Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateFeedBody = Partial<IFeed>;

export enum STATUS {
  GREEN,
  YELLOW,
  RED,
}
