"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { addBookmark, getBookmarks, updateBookmark, deleteBookmark, } = require("../controllers/bookmarkController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const bookmarkRoute = express_1.default.Router();
bookmarkRoute.get("/", authMiddleware_1.verifyToken, getBookmarks);
bookmarkRoute.post("/", authMiddleware_1.verifyToken, addBookmark);
bookmarkRoute.put("/:id", authMiddleware_1.verifyToken, updateBookmark);
bookmarkRoute.delete("/:id", authMiddleware_1.verifyToken, deleteBookmark);
exports.default = bookmarkRoute;
