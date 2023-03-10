import express, { Router } from 'express';
import { userController } from '../../controllers';

const router: Router = express.Router();

router.route('/').get(userController.exists);

export default router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User retrieval
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Check if user already exists
 *     description: Only one user is allowed in Gatsby
 *     tags: [Users]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 */
