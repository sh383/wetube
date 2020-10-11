import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
// 서버를 재시작해도 쿠키를 이용해 로그인 상태 유지하도록 하는 모듈
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";

import "./passport";

const app = express();

const CokieStore = MongoStore(session);

app.use(helmet());
app.set("view engine", "pug");
// directory 에서 file 을 보내주는 middleware
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection }),
  })
);

// 아래 두 과정은 middle
// passport 가 스스로 쿠키를 들여다 보고 쿠키 정보에 해당하는 사용자를 찾아줌. 그 사용자를 request 의 object 인 req.user 에 저장함.
app.use(passport.initialize());
// session 을 저장. 이후 express-session 설치
app.use(passport.session());

//미들웨어, 파일로 따로 분리
//맨 위에 놓음으로써 아래 코드들이 미들웨어, local 에 접근할 수 있도록
app.use(localsMiddleware);

//가입, 검색, 홈 등등
app.use(routes.home, globalRouter);
// 누군가 user 에 접속하면 userRouter 를 사용하겠다는 의미
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

//Es6 모듈
export default app;
