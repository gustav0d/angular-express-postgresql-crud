import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User, type UserAttributes } from '../userModel.ts';
import { config } from '../../../config.ts';
import { AppError } from '../../error/appError.ts';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type LoginInput = z.infer<typeof loginSchema>;

export async function loginUserService(loginData: LoginInput) {
  const validate = loginSchema.safeParse(loginData);

  if (!validate.success) {
    throw new AppError(validate.error);
  }

  const validatedData = validate.data;

  const userExists = await User.scope('withPassword').findOne({
    where: { email: validatedData.email },
  });

  if (!userExists) {
    throw new AppError('Invalid email or password',);
  }

  const user = userExists.dataValues as Required<UserAttributes>;

  const isPasswordValid = bcrypt.compare(validatedData.password, user.password);
  if (!isPasswordValid) {
    throw new AppError('Invalid email or password');
  }

  const token = jwt.sign({ userId: user.id }, config.JWT_SECRET);

  const { password, ...userWithoutPassword } = user;
  return {
    user: userWithoutPassword,
    token,
  };
}
