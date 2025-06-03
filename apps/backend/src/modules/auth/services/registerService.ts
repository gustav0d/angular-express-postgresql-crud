import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { User } from '../userModel.ts';

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
  const validate = userSchema.safeParse(userData);

  if (!validate.success) {
    const errorMessages = validate.error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }));
    throw new Error(JSON.stringify(errorMessages));
  }

  const validatedData = validate.data;

  const existingUser = await User.findOne({
    where: { email: validatedData.email },
  });
  if (existingUser) {
    throw new Error('User with this email already exists');
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
