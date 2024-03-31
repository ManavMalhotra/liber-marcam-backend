import { Request, Response } from "express";
import Bookmark from "../models/Bookmark";
import User from "../models/User";

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  if (authorization) {
    const token = authorization.split(" ")[1];
    return token;
  }
  return null;
};

export const addBookmark = (req, res) => {
  const { url, title, category, tags } = req.body;

  if (!url || !title) {
    return res.status(400).json({
      error: "url and title are required",
    });
  }
  const token = getTokenFrom(req);

  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  if (!url || !title) {
    return res.status(400).json({
      error: "url and title are required",
    });
  }

  const bookmark = new Bookmark({
    url,
    title,
    category,
    tags,
    user: user._id,
  });

  bookmark.save();

  res.status(201).json(bookmark);
};
export const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({}).populate("user", {
      username: 1,
      name: 1,
    });

    if (!bookmarks) {
      return res.status(404).json({ message: "No bookmarks found" });
    }

    res.status(200).json(bookmarks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const updateBookmark = async (req, res) => {
  const { url, title, category, tags } = req.body;

  if (!url || !title) {
    return res.status(400).json({
      error: "url and title are required",
    });
  }

  const bookmark = {
    url,
    title,
    category,
    tags,
  };

  Bookmark.findByIdAndUpdate(req.params.id, bookmark, { new: true })
    .then((updatedBookmark) => {
      res.json(updatedBookmark);
    })
    .catch((err) => {
      res.status(404).end();
    });

  res.status(201).json(bookmark);
};
export const deleteBookmark = async (req, res) => {
  await Bookmark.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => {
      res.status(404).json({ error: "bookmark not found" });
    });
};
