import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

const app = express()

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(helmet());
app.use(morgan('dev'));

//가입, 검색, 홈 등등
app.use(routes.home, globalRouter);
// 누군가 user 에 접속하면 userRouter 를 사용하겠다는 의미
app.use(routes.users,userRouter);
app.use(routes.videos, videoRouter);



//Es6 모듈
export default app;
