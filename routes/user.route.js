const express = require("express");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const { registerUser, loginUser } = require("../controllers/user.controller");
const router = express.Router();

//auth user
router.post("/user/create-user", registerUser);
router.post("/user/login", loginUser);
router.get(
  "/user/post-product",
  authentication,
  authorization("admin"),
  (req, res) => {
    return res
      .status(200)
      .json("Welcome Admin, this is test user product route");
  }
);
router.get("/user/order", authentication, authorization("user"), (req, res) => {
  return res.status(200).json("Welcome User, this is test user order route");
});

module.exports = router;
