const express = require("express");
const { registerUser, loginUser } = require("../controllers/user.controller");
const router = express.Router();

//auth user
router.post("user/create-user", registerUser);
router.post("user/login", loginUser);
