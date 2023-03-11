import { IStory, IStoryDoc } from '../models/story/story.interfaces';
import { IOptions, QueryResult } from '../models/plugins/paginate';
import Story from '../models/story/story.model';
/**
 * Create a feed
 * @param {IStory} userBody
 * @returns {Promise<IStoryDoc>}
 */
export const createStory = async (storyBody: IStory): Promise<IStoryDoc> => {
  return Story.create(storyBody);
};

/**
 * Query for stories
 * @param {Object} filter - Mongo filter
 * @param options
 * @returns {Promise<IStoryDoc[]>}
 */
export const queryStories = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
q  const stories = await Story.paginate(filter, options);
  return stories;
};
