import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User"; // Assuming you have a User model

export const authenticateUser = (req: Request, res: Response) => {
  const token = req.query.token;

  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }
  // @ts-ignore
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // @ts-ignore
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    return res.json({ token: newToken });
  });
};
