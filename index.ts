import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { authRoutes } from "./routes/authRoutes";
import bookmarkRoute from "./routes/bookmarkRoutes";
import bodyParser from "body-parser";
import cors from "cors";

const app: Express = express();

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI || "");

mongoose.connection.on("connected", () => {
  console.log("[mongodb]: Connected to MongoDB");
});

app.use(cors());
app.options("*", cors());

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
  console.log(req.body);
});

app.post("/", async (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
  let body = await req.body;
  console.log(body);
});

app.use("/api/auth", authRoutes);
app.use("/api/bookmarks", bookmarkRoute);
// sigin and login routes

app.listen(port, () => {
  console.log(`[server]: Server is running at Port:${port}`);
});
