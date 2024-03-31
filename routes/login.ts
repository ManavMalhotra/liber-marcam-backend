// const loginRouter = require("express").Router();
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const Note = require("../models/note");
// const User = require("../models/user");

import Router from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User";
import dotenv from "dotenv";
dotenv.config();

const loginRouter = Router();

loginRouter.post("/", async (req, res) => {
});

module.exports = loginRouter;
