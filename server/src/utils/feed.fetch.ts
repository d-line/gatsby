import Parser from 'rss-parser';
import moment from 'moment';
import mongoose from 'mongoose';
import config from '../config/config';
import { IFeed, IFeedDoc, STATUS } from '../models/feed/feed.interfaces';
import { IStory } from '../models/story/story.interfaces';
import logger from '../config/logger';
import { storyService, feedService } from '../services';
import { QueryResult } from '../models/plugins/paginate';

const parser = new Parser({
  customFields: {
    item: ['media:group'],
  },
});

const isYoutube = (rawStory: any) => {
  if (rawStory['media:group']) {
    return `<div class="youtube"><a href="${rawStory['media:group']['media:content'][0].$.url}"><img src="${rawStory['media:group']['media:thumbnail'][0].$.url}"></a></div>`;
  }
  return rawStory.content;
};

const addStory = async (rawStory: any, feed: IFeed) => {
  const createStory: IStory = {
    feed,
    title: rawStory.title,
    permalink: rawStory.link,
    body: isYoutube(rawStory) || rawStory['content:encoded'] || '',
    published: rawStory.pubDate,
    isRead: false,
    keepUnread: false,
    isStarred: false,
    entryId: rawStory.guid || rawStory.id,
  };

  try {
    const savedStory = await storyService.createStory(createStory);
    logger.info(`[ NEW STRY ] => ${createStory.title} (${createStory.permalink})`);
    return savedStory;
  } catch (err: any) {
    if (err.code !== 11000) {
      logger.error(err);
      return false;
    }
  }
  return false;
};

const modifyFeed = async (rawFeed: any, feed: IFeedDoc) => {
  // TODO: filter only new entries
  let isNewStory: any = false;
  await Promise.all(
    rawFeed.items.map(async (story: any) => {
      isNewStory = await addStory(story, feed);
      return isNewStory;
    })
  );

  if (isNewStory) {
    const lastFetched = moment().toDate();
    await feedService.updateFeedById(feed.id, { lastFetched }).then(() => {
      logger.info(`[ LST FTCH ] => ${lastFetched} for ${feed.url} ${feed.name}`);
    });
  }
};

const setFeedStatus = async (feed: IFeedDoc, status: STATUS) => {
  await feedService.updateFeedById(feed.id, { status }).then(() => {
    logger.info(`[  STATUS  ] ${status} for ${feed.url} ${feed.name}`);
  });
};

const fetchFeed = async (feed: IFeedDoc) => {
  logger.info(`[ FETCHING ] => ${feed.url} ${feed.name}`);
  try {
    const response = await fetch(feed.url);
    const data = await response.text();
    const parsed = await parser.parseString(data);
    await modifyFeed(parsed, feed);
    await setFeedStatus(feed, STATUS.GREEN);
  } catch (err) {
    await setFeedStatus(feed, STATUS.RED);
    logger.error(err);
  } finally {
    logger.info(`[ COMPLETE ] <= ${feed.url} ${feed.name}`);
  }
};

const fetchFeeds = async (feeds: QueryResult) => {
  await Promise.all(
    feeds.results.map((f) => {
      return fetchFeed(f as IFeedDoc);
    })
  );
};

const closeConnection = () => {
  logger.info('>>> DONE <<<');
  process.exit(0);
};

mongoose.connect(config.mongoose.url).then(() => {
  logger.info('Connected to MongoDB');
  feedService.queryFeeds({}, { limit: 1000 }).then(fetchFeeds).then(closeConnection);
});
