import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { userService } from '../services';

export const exists = catchAsync(async (_req: Request, res: Response) => {
  const result = await userService.exists();
  res.send(result);
});

export default exists;
