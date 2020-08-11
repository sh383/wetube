import express from "express";
import routes from "../routes";
import {
  userDetail,
  changePassword,
  getEditProfile,
  postEditProfile,
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

//userDetail 함수 선언
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.userDetail(), onlyPrivate, userDetail);
userRouter.get(routes.changePassword, changePassword);

export default userRouter;
