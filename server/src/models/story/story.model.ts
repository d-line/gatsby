import mongoose from 'mongoose';
import { IStoryDoc, IStoryModel } from './story.interfaces';
import { paginate, toJSON } from '../plugins';

const storySchema = new mongoose.Schema<IStoryDoc, IStoryModel>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    permalink: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      trim: true,
    },
    feed: {
      type: String,
      ref: 'Feed',
    },
    published: {
      type: Date,
      required: true,
    },
    isRead: {
      type: Boolean,
    },
    keepUnread: {
      type: Boolean,
      default: false,
    },
    isStarred: {
      type: Boolean,
      default: false,
    },
    entryId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

storySchema.index({ entryId: 1, feedId: 1 }, { unique: true });

// add plugin that converts mongoose to json
storySchema.plugin(toJSON);
storySchema.plugin(paginate);

const Feed = mongoose.model<IStoryDoc, IStoryModel>('Story', storySchema);

export default Feed;
