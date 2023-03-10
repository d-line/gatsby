import httpStatus from 'http-status';
import User from '../models/user/user.model';
import { IUser, IUserDoc } from '../models/user/user.interfaces';
import ApiError from '../utils/ApiError';

/**
 * Query for users
 * @returns {Promise<boolean>}
 */
export const exists = async (): Promise<boolean> => User.doesExist();

/**
 * Get User
 * @returns {Promise<QueryResult>}
 */
export const getUser = async (): Promise<IUserDoc | null> => User.findOne();

/**
 * Register a user
 * @param {IUser} userBody
 * @returns {Promise<IUserDoc>}
 */
export const registerUser = async (userBody: IUser): Promise<IUserDoc> => {
  if (await User.doesExist()) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists');
  }
  return User.create(userBody);
};
