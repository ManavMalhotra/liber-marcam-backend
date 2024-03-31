import userRouter from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User";
import Bookmark from "../models/Bookmark";

import dotenv from "dotenv";
dotenv.config();

const signInRouter = userRouter.Router();

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

// // signInRouter.get("/", async (req, res) => {
// //   try {
// //     const token = getTokenFrom(req);

// //     const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "");

// //     if (!token || !decodedToken.id) {
// //       return res.status(401).json({ error: "token missing or invalid" });
// //     }

// //     const user = await User.find({}).populate("notes", {
// //       content: 1,
// //       date: -1,
// //     });

// //     console.log(user.notes);

// //     res.status(200).json(user.notes);
// //   } catch (error) {
// //     res.status(500).json({ error: "something went wrong" });
// //   }
// // });

// // userRouter.get('/', async (req,response)=>{
// // 	const users = await User
// //     .find({})
// //     .populate('notes', { content: 1, date: 1 })

// //   response.status(200).json(users)

// // })

signInRouter.post("/", async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  if (!email || !firstName || !lastName || !password) {
    return res.status(400).json({
      error: "email, firstName, lastName and password are required",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      error: "email must be unique or already exists",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    email,
    firstName,
    lastName,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);

});

export default signInRouter;

