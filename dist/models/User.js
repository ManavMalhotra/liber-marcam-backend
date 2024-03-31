"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose = require("mongoose");
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    bookmarks: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "bookmark",
        },
    ],
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
