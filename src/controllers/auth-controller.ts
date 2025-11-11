import BaseController from "./controller.js";
import type { Request, Response } from "express";
import { generateToken } from "../services/auth-service.js";
import { AppDataSource } from "../data-source.js";
import User from "../entities/user.js";

export default class AuthController extends BaseController {
  async login(req: Request, res: Response): Promise<void> {
    const userRepository = AppDataSource.getRepository(User);
    const { email, password } = req.body || {};

    if (email && password) {
      const user = await userRepository.findOneBy({ email });

      if (user) {
        const isPasswordValid = await user.comparePassword(password);
        if (isPasswordValid) {
          const token = generateToken({ id: user.id, email: user.email }, process.env.JWT_DEFAULT_EXPIRATION);
          res.status(200).json({ token });
          return;
        }
      }
      res.status(401).json({ message: "Invalid email or password" });
    } else {
      res.status(400).json({ message: "Email and password are required" });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const { email, password, name, role } = req.body || {};

      const existingUser = await userRepository.findOneBy({ email });

      if (existingUser) {
        res.status(409).json({ message: "Email already in use" });
        return;
      }

      const newUser = new User();
      newUser.email = email;
      newUser.password = password;
      newUser.name = name;
      // newUser.role = role;

      await newUser.hashPassword();
      const registeredUser = await userRepository.save(newUser);
      
      res.status(201).json({ message: "User registered successfully", user: {
        id: registeredUser.id,
        email: registeredUser.email,
        name: registeredUser.name,
        created_at: registeredUser.created_at,
        updated_at: registeredUser.updated_at
      } });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
