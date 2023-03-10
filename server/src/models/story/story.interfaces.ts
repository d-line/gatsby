import { Model, Document } from 'mongoose';
import { IFeed } from '../feed/feed.interfaces';
import { QueryResult } from '../plugins/paginate';

export interface IStory {
  title: string;
  permalink: string;
  body: string;
  feed: IFeed;
  published: Date;
  isRead: Boolean;
  keepUnread: Boolean;
  isStarred: Boolean;
  entryId: string;
}

export interface IStoryDoc extends IStory, Document {}

export interface IStoryModel extends Model<IStoryDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}
