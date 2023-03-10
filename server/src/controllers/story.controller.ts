import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';
import { IOptions } from '../models/plugins/paginate';
import { storyService } from '../services';

export const createStory = catchAsync(async () => {});

export const getStories = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['title', 'permalink', 'isRead', 'isStarred']);
  if (filter.title) {
    filter.title = new RegExp(filter.title, 'i');
  }
  if (filter.permalink) {
    filter.permalink = new RegExp(filter.permalink, 'i');
  }
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  if (!options.sortBy) {
    options.sortBy = 'published:desc';
  }
  const result = await storyService.queryStories(filter, options);
  res.send(result);
});
