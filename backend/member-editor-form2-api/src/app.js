// src/app.js
import express from "express";
import cors from "cors";
import memberRoutes from "./routes/memberRoutes.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/api", memberRoutes);

export default app;
