import httpStatus from 'http-status';
import * as userService from './user.service';
import { IUserDoc } from '../models/user/user.interfaces';
import Token from '../models/token/token.model';
import ApiError from '../utils/ApiError';
import tokenTypes from '../models/token/token.types';

/**
 * Login with password
 * @param {string} password
 * @returns {Promise<IUserDoc>}
 */
// eslint-disable-next-line
export const loginUserWithPassword = async (password: string): Promise<IUserDoc> => {
  const user = await userService.getUser();
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise<void>}
 */
export const logout = async (refreshToken: string): Promise<void> => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};
