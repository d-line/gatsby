import express, { Router } from 'express';
import { feedValidation } from '../../validations';
import auth from '../../middleware/auth';
import validate from '../../middleware/validate';
import { feedController } from '../../controllers';
import discoverFeed from '../../middleware/feed.discover';

const router: Router = express.Router();

router
  .route('/')
  .post(
    auth(),
    validate(feedValidation.createMaybeFeed),
    discoverFeed,
    validate(feedValidation.createFeed),
    feedController.createFeed
  )
  .get(auth(), validate(feedValidation.getFeeds), feedController.getFeeds);

router
  .route('/:feedId')
  .get(auth(), validate(feedValidation.getFeed), feedController.getFeed)
  .delete(auth(), validate(feedValidation.deleteFeed), feedController.deleteFeed);

export default router;

/**
 * @swagger
 * tags:
 *   name: Feeds
 *   description: Feed CRUD API
 */

/**
 * @swagger
 * /feeds:
 *   get:
 *     summary: Get all feeds
 *     tags: [Feeds]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Feed name
 *       - in: query
 *         name: url
 *         schema:
 *           type: string
 *         description: Feed url
 *       - in: query
 *         name: status
 *         schema:
 *           type: number
 *         description: Fetch status
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: projectBy
 *         schema:
 *           type: string
 *         description: project by query in the form of field:hide/include (ex. name:hide)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of feeds
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *      "200":
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                results:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Feed'
 *                page:
 *                  type: integer
 *                  example: 1
 *                limit:
 *                  type: integer
 *                  example: 10
 *                totalPages:
 *                  type: integer
 *                  example: 1
 *                totalResults:
 *                  type: integer
 *                  example: 1
 *      "401":
 *        $ref: '#/components/responses/Unauthorized'
 */
