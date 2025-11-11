import Express from "express";
import apiRoutes from "./routes/api/index.js";

const app = Express();

app.use(Express.json());
app.use("/api", apiRoutes);

export default app;