import express, { Router } from 'express';
import auth from "../../middleware/auth";
import validate from "../../middleware/validate";
import {storyValidation} from "../../validations";
import {storyController} from "../../controllers";

const router: Router = express.Router();

router.route('/').get(auth(), validate(storyValidation.getStories), storyController.getStories);

// router
//   .route('/:feedId')
//   .get(auth(), validate(feedValidation.getFeed), feedController.getFeed)
//   .delete(auth(), validate(feedValidation.deleteFeed), feedController.deleteFeed);

export default router;
