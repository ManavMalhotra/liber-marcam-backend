"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
exports.authRoutes = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// login route
exports.authRoutes.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const user = yield User_1.default.findOne({ email });
    const passwordCorrect = user == null ? false : bcrypt_1.default.compare(password, user.passwordHash);
    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: "Invalid username or password",
        });
    }
    const userToken = {
        email: user.email,
        id: user._id,
    };
    const token = jsonwebtoken_1.default.sign(userToken, process.env.JWT_SECRET);
    console.log("TOKEN: ", token);
    res.status(200).send({
        token,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
    });
}));
// signup route
exports.authRoutes.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const existingUser = yield User_1.default.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            error: "email must be unique or user already exists",
        });
    }
    const passwordHash = yield bcrypt_1.default.hash(password, 10);
    const user = new User_1.default({
        email,
        firstName,
        lastName,
        passwordHash,
    });
    const savedUser = yield user.save();
    res.status(201).json(savedUser);
}));
exports.default = exports.authRoutes;
