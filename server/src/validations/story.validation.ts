import Joi from 'joi';

export const getStories = {
  query: Joi.object().keys({
    title: Joi.string(),
    permalink: Joi.string(),
    isRead: Joi.boolean(),
    isStarred: Joi.boolean(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export default getStories;
