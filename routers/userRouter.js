import express from "express";
import routes from "../routes";
import {
  userDetail,
  changePassword,
  getEditProfile,
} from "../controllers/userController";
import { onlyPrivate } from "../middlewares";

const userRouter = express.Router();

//userDetail 함수 선언
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.get(routes.userDetail(), onlyPrivate, userDetail);
userRouter.get(routes.changePassword, changePassword);

export default userRouter;
