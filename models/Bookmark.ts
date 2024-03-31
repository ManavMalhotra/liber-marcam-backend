import mongoose from "mongoose";

const BookmarkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    default: [],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  timeStamps: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [String],
    default: [],
    required: false,
  },
});

const Bookmark = mongoose.model("Bookmark", BookmarkSchema);

export default Bookmark;
