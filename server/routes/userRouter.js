const { Router } = require("express");
const UserController = require("../controllers/user.controller");
const { hashPass } = require("../middlewares/hashPassword");

const userRouter = Router();

userRouter.post("/sign-up", hashPass, UserController.registrationUser);
userRouter.post("/sign-in", UserController.loginUser);
userRouter.get("/:token", UserController.checkToken);

module.exports = userRouter;
