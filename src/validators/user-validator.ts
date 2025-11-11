import z from 'zod';
import { UserRole } from '../entities/user.js';

export const UserRegisterSchema = z.object({
  name: z.string().min(3).max(30),
  email: z.email(),
  password: z.string().min(6).max(100),
  // role: z.enum(UserRole).optional()
});

export const UserLoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});