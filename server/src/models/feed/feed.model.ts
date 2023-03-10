import mongoose from 'mongoose';
import { IFeedDoc, IFeedModel } from './feed.interfaces';
import {paginate, toJSON} from "../plugins";

const feedSchema = new mongoose.Schema<IFeedDoc, IFeedModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    lastFetched: {
      type: Date,
      required: true,
    },
    status: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
feedSchema.plugin(toJSON);
feedSchema.plugin(paginate);

/**
 * Check if url is taken
 * @param {string} url - The feed's url
 * @param {ObjectId} [excludeFeedId] - The id of the feed to be excluded
 * @returns {Promise<boolean>}
 */
feedSchema.static('isUrlTaken', async function (url: string, excludeFeedId: mongoose.ObjectId): Promise<boolean> {
  const feed = await this.findOne({ url, _id: { $ne: excludeFeedId } });
  return !!feed;
});

const Feed = mongoose.model<IFeedDoc, IFeedModel>('Feed', feedSchema);

export default Feed;
