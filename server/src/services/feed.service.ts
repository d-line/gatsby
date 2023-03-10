import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { NextFunction } from 'express';
import Parser from 'rss-parser';
import rssFinder from 'rss-finder';
import ApiError from '../utils/ApiError';
import Feed from '../models/feed/feed.model';
import { IFeed, IFeedDoc, UpdateFeedBody } from '../models/feed/feed.interfaces';
import { IOptions, QueryResult } from '../models/plugins/paginate';

// import { NewCreatedUser, UpdateUserBody, IUserDoc, NewRegisteredUser } from './user.interfaces';

/**
 * Create a feed
 * @param {IFeed} userBody
 * @returns {Promise<IFeedDoc>}
 */
export const createFeed = async (feedBody: IFeed): Promise<IFeedDoc> => {
  if (await Feed.isUrlTaken(feedBody.url)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Feed already exists');
  }
  return Feed.create(feedBody);
};

/**
 * Query for feeds
 * @param {Object} filter - Mongo filter
 * @returns {Promise<IFeedDoc[]>}
 */
export const queryFeeds = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const feeds = await Feed.paginate(filter, options);
  return feeds;
};

/**
 * Get feed by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IFeedDoc | null>}
 */
export const getFeedById = async (id: mongoose.Types.ObjectId): Promise<IFeedDoc | null> => Feed.findById(id);

// /**
//  * Get user by email
//  * @param {string} email
//  * @returns {Promise<IUserDoc | null>}
//  */
// export const getUserByEmail = async (email: string): Promise<IUserDoc | null> => User.findOne({ email });

/**
 * Update feed by id
 * @param {mongoose.Types.ObjectId} feedId
 * @param {UpdateFeedBody} updateBody
 * @returns {Promise<IFeedDoc | null>}
 */
export const updateFeedById = async (
  feedId: mongoose.Types.ObjectId,
  updateBody: UpdateFeedBody
): Promise<IFeedDoc | null> => {
  const feed = await getFeedById(feedId);
  if (!feed) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feed not found');
  }
  if (updateBody.url && (await Feed.isUrlTaken(updateBody.url, feedId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Url already taken');
  }
  Object.assign(feed, updateBody);
  await feed.save();
  return feed;
};

/**
 * Delete feed by id
 * @param {mongoose.Types.ObjectId} feedId
 * @returns {Promise<IFeedDoc | null>}
 */
export const deleteFeedById = async (feedId: mongoose.Types.ObjectId): Promise<IFeedDoc | null> => {
  const feed = await getFeedById(feedId);
  if (!feed) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feed not found');
  }
  await feed.remove();
  return feed;
};

export const getFeedForURL = async (url: string, next: NextFunction) => {
  const response = await fetch(url);
  const parser = new Parser();
  try {
    const feed = await parser.parseString(await response.text());
    feed.feedUrl = feed.feedUrl || url;
    return feed;
  } catch (err) {
    return next();
  }
};

export const discoverFeed = async (url: string) => {
  return getFeedForURL(url, async () => {
    const found = await rssFinder(url);
    if (found.feedUrls.length > 0) {
      return getFeedForURL(found.feedUrls[0].url, () => false);
    }
    return false;
  });
};
