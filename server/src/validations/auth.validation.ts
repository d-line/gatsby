import Joi from 'joi';
import { password } from './custom.validation';
import { IUser } from '../models/user/user.interfaces';

const registerBody: Record<keyof IUser, any> = {
  password: Joi.string().required().custom(password),
};

export const register = {
  body: Joi.object().keys(registerBody),
};

export const login = {
  body: Joi.object().keys({
    password: Joi.string().required(),
  }),
};

export const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};
