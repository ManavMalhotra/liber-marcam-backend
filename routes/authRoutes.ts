import express, { Request, Response } from "express";
import { authenticateUser } from "../controllers/authController";

export const authRoutes = express.Router();

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User";
import dotenv from "dotenv";
import { post } from "request";
dotenv.config();

// login route
authRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "email and password are required",
    });
  }

  if (password.length < 3) {
    return res.status(400).json({
      error: "password must be at least 3 characters long",
    });
  }

  if (!email.includes("@")) {
    return res.status(400).json({
      error: "email must include @",
    });
  }

  const user = await User.findOne({ email });

  const passwordCorrect =
    user == null ? false : bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "Invalid username or password",
    });
  }

  const userToken = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(userToken, process.env.JWT_SECRET);

  console.log("TOKEN: ", token);

  res.status(200).send({
    token,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  });
});

// signup route
authRoutes.post("/signup", async (req: Request, res: Response) => {
  const { email, firstName, lastName, password } = req.body;
  console.log(req.body);

  if (!email || !firstName || !lastName || !password) {
    return res.status(400).json({
      error: "email, firstName, lastName and password are required",
    });
  }

  if (password.length < 3) {
    return res.status(400).json({
      error: "password must be at least 3 characters long",
    });
  }

  if (!email.includes("@")) {
    return res.status(400).json({
      error: "email must include @",
    });
  }

  if (email.length < 3) {
    return res.status(400).json({
      error: "email must be at least 3 characters long",
    });
  }

  if (firstName.length < 3 || lastName.length < 3) {
    return res.status(400).json({
      error: "firstName and lastName must be at least 3 characters long",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      error: "email must be unique or user already exists",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    firstName,
    lastName,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

export default authRoutes;
