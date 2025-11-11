import express from "express";

const expressRouter = express.Router();

expressRouter.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

export default expressRouter;