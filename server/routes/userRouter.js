const { Router } = require("express");
const UserController = require("../controllers/user.controller");

const userRouter = Router();

userRouter.post("/sign-up", UserController.registrationUser);
userRouter.post("/sign-in", UserController.loginUser);

module.exports = userRouter;
