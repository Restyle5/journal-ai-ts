import User from "../entities/user.js";
import { AppDataSource } from "../data-source.js";
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 's3cr3t';

export const generateToken = (payload: object, expiresIn = "1h") => {
  return jwt.sign(payload, SECRET, { expiresIn });
};

const userRepository = AppDataSource.getRepository(User);

export class AuthService {
  public static async verifyToken(token: string) {
    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET || "");

      if (user && user instanceof Object && "id" in user) {
        const foundUser = await userRepository.findOne({
          where: { id: user.id },
        });
        user.details = foundUser!;
      }
      return user;
    }
    return null;
  }
}