import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { User } from '../userModel.ts';
import { AppError } from '../../error/appError.ts';
import { HttpStatusCode } from '../../error/protocols.ts';

const userSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

type UserInput = z.infer<typeof userSchema>;

export async function registerUserService(userData: UserInput) {
  const validatedData = userSchema.parse(userData);

  const existingUser = await User.findOne({
    where: { email: validatedData.email },
  });
  if (existingUser) {
    throw new AppError(
      'User with this email already exists',
      HttpStatusCode.BAD_REQUEST,
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(validatedData.password, salt);

  const newUser = await User.create({
    name: validatedData.name,
    email: validatedData.email,
    password: hashedPassword,
  });

  const { password, ...userWithoutPassword } = newUser.toJSON();
  return userWithoutPassword;
}
