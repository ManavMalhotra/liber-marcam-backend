import express from "express";
const {
  addBookmark,
  getBookmarks,
  updateBookmark,
  deleteBookmark,
} = require("../controllers/bookmarkController");

import { verifyToken } from "../middleware/authMiddleware";

const bookmarkRoute = express.Router();

bookmarkRoute.get("/", verifyToken, getBookmarks);
bookmarkRoute.post("/", verifyToken, addBookmark);
bookmarkRoute.put("/:id", verifyToken, updateBookmark);
bookmarkRoute.delete("/:id", verifyToken, deleteBookmark);

export default bookmarkRoute;
