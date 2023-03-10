import { Model, Document } from 'mongoose';

export interface IUser {
  password: string;
}

export interface IUserDoc extends IUser, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDoc> {
  doesExist(): Promise<boolean>;
}
