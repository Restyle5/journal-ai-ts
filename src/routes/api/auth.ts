import Express from "express";
import AuthController from "../../controllers/auth-controller.js";
import { validate } from "../../middlewares/request-validator.js";
import { UserRegisterSchema, UserLoginSchema } from "../../validators/user-validator.js";

const expressRouter = Express.Router();
const authController = new AuthController();

expressRouter.post("/", validate(UserLoginSchema), authController.login);
expressRouter.post("/register", validate(UserRegisterSchema), authController.register);

export default expressRouter;
