import express from "express";
import auth from "./auth.js";
import journal from "./journal.js";
import { authMiddleware } from "../../middlewares/verify-token.js";

const expressRouter = express.Router();
const protectedRouter = express.Router();

// wrapped with auth middleware
protectedRouter.use("/journal", journal);

expressRouter.use("/auth", auth);
expressRouter.use("/", authMiddleware, protectedRouter);





export default expressRouter;
