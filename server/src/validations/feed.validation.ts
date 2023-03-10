import Joi from 'joi';
import { objectId } from './custom.validation';
import { IFeed, IMaybeFeed } from '../models/feed/feed.interfaces';

const createMaybeFeedBody: Record<keyof IMaybeFeed, any> = {
  url: Joi.string().required().uri(),
};

const createFeedBody: Record<keyof IFeed, any> = {
  url: Joi.string().required().uri(),
  name: Joi.string().required(),
  lastFetched: Joi.date().required(),
  status: Joi.number(),
};

export const createMaybeFeed = {
  body: Joi.object().keys(createMaybeFeedBody),
};

export const createFeed = {
  body: Joi.object().keys(createFeedBody),
};

export const getFeeds = {
  query: Joi.object().keys({
    name: Joi.string(),
    url: Joi.string(),
    status: Joi.number(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getFeed = {
  params: Joi.object().keys({
    feedId: Joi.string().custom(objectId),
  }),
};

export const deleteFeed = {
  params: Joi.object().keys({
    feedId: Joi.string().custom(objectId),
  }),
};
