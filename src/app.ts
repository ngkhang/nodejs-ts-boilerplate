import express from "express";
import type { Request, Response } from "express";

const app = express();

// Initialize middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize router
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Initialized Router",
  });
});

export default app;
