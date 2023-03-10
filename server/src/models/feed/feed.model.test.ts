import { faker } from '@faker-js/faker';
import { IFeed } from './feed.interfaces';
import Feed from './feed.model';

describe('Feed model', () => {
  describe('Feed validation', () => {
    let newFeed: IFeed;

    beforeEach(() => {
      newFeed = {
        name: faker.random.words(5),
        url: faker.internet.url(),
        lastFetched: faker.date.recent(),
      };
    });

    test('should correctly validate a valid feed', async () => {
      await expect(new Feed(newFeed).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if url is invalid', async () => {
      newFeed.url = '';
      await expect(new Feed(newFeed).validate()).rejects.toThrow();
    });
  });
});
