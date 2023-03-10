import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUserDoc, IUserModel } from './user.interfaces';
import { toJSON } from '../plugins';

const userSchema = new mongoose.Schema<IUserDoc, IUserModel>(
  {
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);

/**
 * Check if user exists (only one user allowed)
 * @returns {Promise<boolean>}
 */
userSchema.static('doesExist', async function (): Promise<boolean> {
  const user = await this.findOne({});
  return !!user;
});

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.method('isPasswordMatch', async function (password: string): Promise<boolean> {
  const user = this;
  return bcrypt.compare(password, user.password);
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model<IUserDoc, IUserModel>('User', userSchema);

export default User;
