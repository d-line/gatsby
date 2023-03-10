import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
import { feedService } from '../services';

const discoverFeed = async (req: Request, res: Response, next: NextFunction) => {
  const { url } = req.body;
  const foundFeed = await feedService.discoverFeed(url);
  if (!foundFeed) {
    res.status(404).send({ error: `Can't discover feed for given URL` });
  } else {
    req.body.name = foundFeed.title;
    req.body.url = foundFeed.feedUrl;
    req.body.lastFetched = moment().subtract(1, 'year').toDate();
    next();
  }
};

export default discoverFeed;
