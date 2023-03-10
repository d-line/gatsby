import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import { feedService } from '../services';
import { IOptions } from '../models/plugins/paginate';

export const createFeed = catchAsync(async (req: Request, res: Response) => {
  const feed = await feedService.createFeed(req.body);
  res.status(httpStatus.CREATED).send(feed);
});

export const getFeeds = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'url', 'status']);
  if (filter.name) {
    filter.name = new RegExp(filter.name, 'i');
  }
  if (filter.url) {
    filter.url = new RegExp(filter.url, 'i');
  }
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await feedService.queryFeeds(filter, options);
  res.send(result);
});

export const getFeed = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['feedId'] === 'string') {
    const feed = await feedService.getFeedById(new mongoose.Types.ObjectId(req.params['feedId']));
    if (!feed) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(feed);
  }
});

export const deleteFeed = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['feedId'] === 'string') {
    await feedService.deleteFeedById(new mongoose.Types.ObjectId(req.params['feedId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
